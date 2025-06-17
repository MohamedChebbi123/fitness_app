from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from database.connection import connect_databse
from models.User import user
from utils.jwt_handler import verify_access_token
from pydantic import BaseModel, EmailStr

router = APIRouter()

class UpdateProfile(BaseModel):
    name: str
    lastname: str
    email: EmailStr
    password: str
    goal: str
    wheight: float
    activity_description: str
    height: float

@router.post("/update_profile")
def update_profile(
    payload: UpdateProfile,
    db: Session = Depends(connect_databse),
    authorization: str | None = Header(None)
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]
    token_data = verify_access_token(token)

    if not token_data or "sub" not in token_data:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user_id = token_data["sub"]

    current_user = db.query(user).filter(user.id == user_id).first()

    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Update fields from payload
    current_user.name = payload.name
    current_user.lastname = payload.lastname
    current_user.email = payload.email
    current_user.password = payload.password  # ⚠️ Reminder: hash this in production!
    current_user.goal = payload.goal
    current_user.wheight = payload.wheight
    current_user.activity_description = payload.activity_description
    current_user.height = payload.height

    db.commit()
    db.refresh(current_user)

    return {"message": "Profile updated successfully"}
