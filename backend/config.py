import os
from dotenv import load_dotenv

load_dotenv()

class Config(object):
    DEBUG=True
    MONGO_URI=os.getenv("MONGODB_URI")