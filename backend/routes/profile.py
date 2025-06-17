from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from database.connection import connect_databse
from models.User import user
from utils.jwt_handler import verify_access_token
from pydantic import BaseModel, EmailStr

router = APIRouter()


    
@router.post("/viewprofile")
def view_profile(
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

    profile = db.query(user).filter(user.id == user_id).first()

    if not profile:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": profile.id,
        "name": profile.name,
        "lastname": profile.lastname,
        "email": profile.email,
        "password": profile.password,  # Note: Be careful with returning passwords
        "goal": profile.goal,
        "wheight": profile.wheight,
        "activity_description": profile.activity_description,
        "height": profile.height,
        "age": profile.age  # Include if needed
    }
