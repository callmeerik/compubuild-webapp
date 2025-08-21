import requests
import os

def get_amazon_products(query: str):
    """
    Busca productos en Amazon y devuelve una lista de productos simplificada.
    """
    search_api_url = "https://www.searchapi.io/api/v1/search"
    api_key = os.getenv("SEARCHAPI_API_KEY")

    # verificacion existencia de api
    if not api_key:
        print("La variable de entorno SEARCH_API_KEY no está configurada.")
        return []

    params = {
        "engine": "amazon_search",
        "q": query,
        "api_key": api_key
    }

    try:
        response = requests.get(search_api_url, params=params)
        response.raise_for_status()
        data = response.json() # formato estructura diccionario de python

        # obtine el diccionario organic_results, si no hay retorna lista vacia
        organic_results = data.get('organic_results', [])

        simplified_products = []
        # Añadir una verificación de tipo para cada item en el bucle
        for product in organic_results:
            if isinstance(product, dict):
                # Usar .get() de forma segura solo si es un diccionario
                title = product.get('title', 'Título no disponible')
                image = product.get('thumbnail', 'URL de imagen no disponible')
                price = product.get('price', 'Precio no disponible')
                link = product.get('link', '#')

                simplified_products.append({
                    "title": title,
                    "image": image,
                    "price": price,
                    "link": link
                })
            else:
                # en caso de que el formato de un producto no sea diccionario
                print(f"Formato de producto inesperado, saltando: {product}")
        
        return simplified_products

    except requests.exceptions.RequestException as e:
        print(f"Error en la petición a SearchAPI: {e}")
        return []
    except Exception as e:
        print(f"Ocurrió un error al procesar la respuesta de Amazon: {e}")
        return []