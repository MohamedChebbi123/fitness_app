from models.Coach import Coach
from fastapi import APIRouter, Depends
from database.connection import connect_databse
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

router = APIRouter()

class CoachRegistration(BaseModel):
    name: str
    lastname: str
    email: EmailStr
    password: str
    age: float
    wheight: float
    coaching_field: str
    height: float
    description: str


@router.post("/registercoach")
def register(payload: CoachRegistration, db: Session = Depends(connect_databse)):
    coachcreated = Coach(
        name=payload.name,
        lastname=payload.lastname,
        email=payload.email,
        password=payload.password,
        age=payload.age,
        wheight=payload.wheight,
        coaching_field=payload.coaching_field,
        height=payload.height,
        description=payload.description
    )
    db.add(coachcreated)
    db.commit()
    return {"message": "coach created successfully"}