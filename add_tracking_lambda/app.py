import json
from pymongo import MongoClient
import os

def generate_db_uri():
    return f"mongodb+srv://{os.environ.get('MONGO_USER')}:{os.environ.get('MONGO_PASS')}@{os.environ.get('MONGO_CLUSTER')}/?retryWrites=true&w=majority"

def main(event, context):
    # name, email, course
    axios_body = event["form"]
    db_uri = generate_db_uri()
    client = MongoClient(db_uri)
    db = client['seat_check']
    collection = db['monitoring']


    prefs = []
    for pref in axios_body.get("tracking_preferences"):
        prefs.append(pref)


    new_monitoring = {
        "name": axios_body.get('name'),
        "email": axios_body.get('email'),
        "course_url": axios_body.get('course_url'),
        "tracking_preferences": prefs,
    }    

    insert_result = collection.insert_one(new_monitoring)

    return {
      "statusCode": 200,
      "headers": {
          "Access-Control-Allow-Origin": "*"
        },           
      "isBase64Encoded": False, 
      "body": str(insert_result.inserted_id),
  }


    # new_monitoring = {
    #     "name": axios_body.get('name'),
    #     "email": axios_body.get('email'),
    #     "url": axios_body.get('url')
    # }
    
    # insert_result = collection.insert_one(new_monitoring)

    # if (insert_result):
    #     return {
    #         "statusCode": 200,
    #         "headers": {
    #             "Access-Control-Allow-Origin": "*",
    #         },
    #     }
    # else:
    #     return {
    #         "statusCode": 500,
    #         "headers": {
    #             "Access-Control-Allow-Origin": "*",
    #         },        
    #     }




