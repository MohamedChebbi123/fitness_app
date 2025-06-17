from fastapi import Depends, APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from models.User import user
from database.connection import connect_databse
from utils.jwt_handler import create_access_token  

router = APIRouter()

class user_login_credentials(BaseModel): 
    email: EmailStr
    password: str

@router.post("/login")
def login(payload: user_login_credentials, db: Session = Depends(connect_databse)):
    existing_user = db.query(user).filter(user.email == payload.email).first()
    
    if not existing_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="email not found")
    
    if existing_user.password != payload.password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="password not correct")
    
    
    token = create_access_token({"sub": str(existing_user.id)})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "message": "user logged in successfully"
    }
