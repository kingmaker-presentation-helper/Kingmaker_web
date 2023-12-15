from fastapi import FastAPI
from dynamoDB import scan_table, get_item

app = FastAPI()

# 모든 데이터를 조회하는 API 엔드포인트
@app.get("/items")
def read_items():
    items = scan_table()
    return {"items": items}

# 특정 키에 해당하는 항목을 조회하는 API 엔드포인트
@app.get("/items/{item_id}")
def read_item(item_id: str):
    item = get_item({"id": item_id})
    if item:
        return {"item": item}
    return {"error": "Item not found"}
