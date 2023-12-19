from fastapi import FastAPI
from dynamoDB import scan_table, get_item
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메소드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

# 나머지 FastAPI 코드...


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

