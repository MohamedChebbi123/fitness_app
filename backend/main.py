from fastapi import FastAPI
from database.connection import Base,engine
from fastapi.middleware.cors import CORSMiddleware
from routes import register
from routes import profile
from routes import login
from routes import weight
from routes import updateprofile
from routes import coach_registration
app=FastAPI()
app.add_middleware(
     CORSMiddleware,
     allow_origins=["*"],
     allow_credentials=True,
     allow_methods=["*"],
     allow_headers=["*"],
 )
app.include_router(register.router)
app.include_router(login.router)
app.include_router(weight.router)
app.include_router(profile.router)
app.include_router(updateprofile.router)
app.include_router(coach_registration.router)
Base.metadata.create_all(bind=engine)