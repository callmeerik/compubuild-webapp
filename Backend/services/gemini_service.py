import os
import json
import re
from dotenv import load_dotenv
from google import genai
from google.genai import types

# carga de la variable de entorno de la api de gemini
load_dotenv()

# OBTENER API LEY

try:
    gemini_api_key = os.getenv('GEMINI_API_KEY')
except Exception as e:
    raise e

def get_ai_recommendation( profession:str, device: str, activity: str ):
    """
        Método encargado de llamar a la API de Gemini
        para realizar la recomendaciom de los componenetes de PC

        Parámetros:
            - profession: str | profesion del usuario
            - device: str | laptop o desktop
            - activity: str | actividad para la que será utilizado el PC

        Return: un diccionario Python con 
            - componentes
            - motivo
            - frase clave
    """
    # creacion del prompt para enviar a gemini API
    prompt = f"""
        Actua como un experto en hardware para recomendar unaPC segun necesidades del
        usuario. 

        - Profesion: {profession}
        - dispositivo: {device}
        - uso del pc: {activity}-

        Como respuesta deberas dar un objeto json con las siguientes claves:
        "componentes",
        "motivo",
        "precio_estimado"
        "frase_clave"
        Dentro de componenetes otro objeto json con: cpu, ssd, hdd, gpu, ram.
        Si es tipo de dispositivo es desktop debes añadir psu, case y ventilacion.
        En los componentes debes colocar un solo nombre por componente, 
        recuerda solo uno.
        El motivo una breve descripcion del porque esos compoenentes son ideales para
        la tarea descrita. Y en frase_clave una frase corta con los compoentes
        para poder buscar productos similares en Amazon.
    """
    
    
    # config de gemini
    client = genai.Client( api_key=gemini_api_key )
    model_name = 'gemini-2.5-flash'

    response = client.models.generate_content(
        model= model_name,
        contents= prompt,
    )

    if not response or not response.text:
        raise Exception('Gemini no da una respuesta')

    # limpiar el texto para obtener solo el json
    resp_txt = response.text

    if resp_txt.startswith('```json'):
        resp_txt = resp_txt[7 : -3]

    return json.loads(resp_txt)  # se retorna resp_txt como un objeto de Python (diccionario)
