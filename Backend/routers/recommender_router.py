from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from services.gemini_service import get_ai_recommendation
from services.search_service import get_amazon_products
from models.models import UserInput, FinalResponse

recommender_router = APIRouter( prefix= '/api/v1' )

# variable para almacenar la recomendacion de forma global
recommendation = None

@recommender_router.post('/recommend', tags=['Pc Recommender'])
def create_recommendation( userRequest: UserInput ):
    """
        Genera la recomendacion de PC y la almacena
    """
    global recommendation
    try:
        gemini_data = get_ai_recommendation( 
            userRequest.profession,
            userRequest.device,
            userRequest.activity
         )

        # almacenamiento de la recomendacion
        recommendation = gemini_data
        print(recommendation)
        return JSONResponse(
            content='Recomendación realizada con exito',
            status_code= 201
        )
    except Exception as e:
        raise HTTPException(
            status_code= 500,
            detail= str(e)
        )

@recommender_router.get('/recommend', tags=['Pc Recommender'])
def get_information():
    """
        Obtiene la ultima recomendacion, conjuntamente con productos similares
    """
    global recommendation

    if not recommendation:
        raise HTTPException(
            status_code= 404,
            detail= 'No existe recomendación, debes crear una'
        )
    
    try:
        response = get_amazon_products( recommendation['frase_clave'] )
        print(response)
        return FinalResponse(
            components= recommendation['componentes'],
            reason= recommendation['motivo'],
            estimated_price= recommendation['precio_estimado'],
            similar_products= response 
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail= str(e)
        )
