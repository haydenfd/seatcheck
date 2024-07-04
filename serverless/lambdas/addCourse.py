import json
from pymongo import MongoClient
import os

def generate_db_uri():
    return f"mongodb+srv://{os.environ.get('MONGO_USER')}:{os.environ.get('MONGO_PASS')}@{os.environ.get('MONGO_CLUSTER')}/?retryWrites=true&w=majority"

def add_course_handler(event, context):

    db_uri = generate_db_uri()
    client = MongoClient(db_uri)
    db = client['seat_check']
    collection = db['monitoring']

    new_course = {
        "course_url": "https://google.com",
        "user_name": "Joe Bruin",
        "user_email": "jbruin@hotmail.com"
    }

    insert_result = collection.insert_one(new_course)

    if (insert_result.inserted_id):
        return {
            "statusCode": 200
        }
    else:
        return {
            "statusCode": 404
        }
    





