from fastapi import FastAPI

app = FastAPI(
    title='PC Recommedner with Gemini AI API', 
    version= '1.0.0'
)

@app.get('/', tags=['Root'])
def root():
    return { 'message': 'PC Recommender with Gemini' }