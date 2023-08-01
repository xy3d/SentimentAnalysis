# db.py
import pymongo

# Assuming your MongoDB is running on the default host and port (localhost:27017)
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["movie"]
reviews_collection = db["review"]
