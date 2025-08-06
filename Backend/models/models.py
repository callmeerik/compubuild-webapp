from pydantic import BaseModel, Field
from typing import List

class UserInput(BaseModel):
    profession: str = Field(min_length=5)
    device: str = Field(min_length=5)
    activity: str = Field(min_length=5)

class AmazonProducts(BaseModel):
    title: str
    price: str | None = None
    link: str
    image: str

class FinalResponse(BaseModel):
    components: dict
    reason: str
    similar_products: List[AmazonProducts]