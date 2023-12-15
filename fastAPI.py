from fastapi import FastAPI
from your_dynamodb_module import get_dynamodb_data

app = FastAPI()

@app.get("/data")
def read_data():
    data = get_dynamodb_data()
    return {"data": data}
