import json
import os
import requests
from dotenv import load_dotenv
from models.models import AmazonProducts

# cargar api
load_dotenv()

try:
    search_api_key = os.getenv('SEARCHAPI_API_KEY')
except Exception as e:
    raise e

def get_amazon_products( query ):
    """
        Metodo para llamar a la API de SearAPI
        Parametros
            - query: frase clave de gemini API
        retorna: un objeto JSON con productos de AMazon
    """
    url = "https://www.searchapi.io/api/v1/search"
    params = {
        "api_key": search_api_key,
        'engine': 'amazon_search',
        'q': query
    }
    
    response = requests.get( url, params= params )
    data = response.json()
    print(data)
    products = []
    if 'organic_results' in data:
        for item in data['organic_results']:
            products.append( 
                AmazonProducts(
                    title= item['title'],
                    price= item['price'],
                    link= item['link'],
                    image= item['thumbnail']
                )
            )
    return products[:6]  # limitacion de 6 productos por recomendacion