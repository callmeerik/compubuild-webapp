from fastapi import FastAPI
from routers.recommender_router import recommender_router

app = FastAPI(
    title='PC Recommedner with Gemini AI API', 
    version= '1.0.0'
)

app.include_router( router= recommender_router )

@app.get('/', tags=['Root'])
def root():
    return { 'message': 'PC Recommender with Gemini' }