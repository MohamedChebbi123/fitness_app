from models.User import user
from fastapi import APIRouter, Depends
from database.connection import connect_databse
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

router = APIRouter()

class UserRegistration(BaseModel):
    name: str
    lastname: str
    email: EmailStr
    password: str

@router.post("/register_member")
def register(payload: UserRegistration, db: Session = Depends(connect_databse)):
    user_created = user(
        name=payload.name,
        lastname=payload.lastname,
        email=payload.email,
        password=payload.password,
    )
    db.add(user_created)
    db.commit()
    return {"message": "user created successfully"}
