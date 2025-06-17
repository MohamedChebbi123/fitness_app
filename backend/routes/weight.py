from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database.connection import connect_databse
from models.User import user
from utils.jwt_handler import verify_access_token

router = APIRouter()

class WeightInput(BaseModel):
    wheight: float

@router.post("/weight")
def submit_weight(
    data: WeightInput,
    db: Session = Depends(connect_databse),
    authorization: str | None = Header(None)
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]
    payload = verify_access_token(token)

    if not payload or "sub" not in payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user_id = payload["sub"]

    existing_user = db.query(user).filter(user.id == user_id).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update weight field - check your DB field name: wheight or weight?
    existing_user.wheight = data.wheight  # or existing_user.weight = data.wheight

    db.commit()

    return {"message": "Weight updated successfully", "new_weight": existing_user.wheight}

