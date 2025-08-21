from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from services.gemini_service import get_ai_recommendation
from services.search_service import get_amazon_products
from models.models import UserInput, FinalResponse
from pydantic import ValidationError
from typing import List, Dict, Any

recommender_router = APIRouter(prefix='/api/v1')

@recommender_router.post('/recommend', tags=['Pc Recommender'], response_model=FinalResponse)
def create_recommendation(userRequest: UserInput):
    """
    Genera la recomendación de PC y los productos de Amazon en una sola llamada.
    """
    try:
        # Obtener la recomendación de Gemini de forma segura
        gemini_data = get_ai_recommendation(
            userRequest.profession,
            userRequest.device,
            userRequest.activity
        )
        
        # verificaicon de que gemini_data es un diccionario
        if not isinstance(gemini_data, dict):
            raise ValueError("La respuesta de Gemini no es un diccionario válido.")
        
        # obtenniendo la 'frase_clave' de forma segura
        frase_clave = gemini_data.get('frase_clave')
        if not frase_clave:
            raise ValueError("La respuesta de Gemini no contiene una frase clave válida.")
        
        # Obtener los productos de Amazon
        # se retorna una lista de productos en fromato diccionario
        similar_products = get_amazon_products(frase_clave)
        
        # Verificar que similar_products es una lista
        if not isinstance(similar_products, list):
            print(f"Advertencia: get_amazon_products devolvió {type(similar_products)} en lugar de lista")
            similar_products = []
        
        # Crear el objeto de respuesta final con valores por defecto
        final_response = FinalResponse(
            components=gemini_data.get('componentes', {}),
            reason=gemini_data.get('motivo', ""),
            estimated_price=gemini_data.get('precio_estimado', ""),
            similar_products=similar_products
        )
        
        # comprobacion de respuesta en consola - solo para moddo desarrollador
        print("Respuesta final generada:", final_response.model_dump())
       
        return JSONResponse(
            content=final_response.model_dump(),
            status_code=201
        )
   
    except ValidationError as e:
        print(f"Error de validación: {e}")
        raise HTTPException(
            status_code=400,
            detail=f"Error en el formato de la respuesta: {str(e)}"
        )
    except ValueError as e:
        print(f"Error de valor: {e}")
        raise HTTPException(
            status_code=400,
            detail=f"Error en los datos: {str(e)}"
        )
    except Exception as e:
        print(f"Error inesperado: {e}")
        raise HTTPException(
            status_code=500,
            detail=f'Ocurrió un error al generar la recomendación: {str(e)}'
        )