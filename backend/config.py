import os
from dotenv import load_dotenv

load_dotenv()

class Config(object):
    DEBUG=True
    MONGO_URI=os.getenv("MONGODB_URI")
    JWT_SECRET_KEY=os.getenv("JWT_SECRET_KEY")