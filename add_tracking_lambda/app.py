import json
from pymongo import MongoClient
import os

def generate_db_uri():
    return f"mongodb+srv://{os.environ.get('MONGO_USER')}:{os.environ.get('MONGO_PASS')}@{os.environ.get('MONGO_CLUSTER')}/?retryWrites=true&w=majority"

def main(event, context):
    # name, email, course
    axios_body = event
    
    db_uri = generate_db_uri()
    client = MongoClient(db_uri)
    db = client['seat_check']
    collection = db['monitoring']

    new_monitoring = {
        "name": axios_body.get('name'),
        "email": axios_body.get('email'),
        "url": axios_body.get('url')
    }
    
    insert_result = collection.insert_one(new_monitoring)

    if (insert_result):
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
            },
        }
    else:
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
            },        
        }




