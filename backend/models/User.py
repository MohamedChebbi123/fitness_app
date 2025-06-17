from sqlalchemy import Column,Integer,String,Text,Date,Numeric
from  database.connection import Base

class user(Base):
    __tablename__="user"
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String,nullable=False)
    lastname=Column(String,nullable=False)
    email=Column(String,nullable=False)
    password=Column(String,nullable=False)
    age=Column(Integer)
    wheight=Column(Numeric(10,2))
    activity_description=Column(Text)
    height = Column(Numeric(10, 2))
    goal=Column(Text)


    
    
