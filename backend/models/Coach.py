from sqlalchemy import Column,Integer,String,Text,Numeric
from  database.connection import Base

class Coach(Base):
    __tablename__="coach"
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String,nullable=False)
    lastname=Column(String,nullable=False)
    email=Column(String,nullable=False)
    password=Column(String,nullable=False)
    age=Column(Integer)
    wheight=Column(Numeric(10,2))
    coaching_field=Column(Text)
    height = Column(Numeric(10, 2))
    description=Column(Text)
