from pymongo import MongoClient
import json
import requests
from email_validator import validate_email_domain, generate_confirmation_email_body
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def generate_db_uri():
    return f"mongodb+srv://{os.environ.get('MONGO_USER')}:{os.environ.get('MONGO_PASS')}@{os.environ.get('MONGO_CLUSTER')}/?retryWrites=true&w=majority"

def main(event, context):
    # name, email, course
    axios_body = event["form"]
    db_uri = generate_db_uri()
    client = MongoClient(db_uri)
    db = client['seat_check']
    collection = db['monitoring']
    id = event['date']


    if validate_email_domain(event["email"]):
        HOST = os.environ.get('EMAIL_HOST')
        PORT = os.environ.get('EMAIL_PORT')
        SENDER_EMAIL = os.environ.get('EMAIL_SENDER')
        SENDER_PASS = os.environ.get('EMAIL_PASS')

        tracking_url = "http://seatcheck.s3-website-us-west-1.amazonaws.com/track/" + str(id)


        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = event["email"]

        msg['Subject'] = f"[SEATCHECK] Confirmation: Tracking set up!"
        msg_body = generate_confirmation_email_body(rcv_name=event["name"], url=tracking_url)


        msg.attach(MIMEText(msg_body, 'html'))

        try:
            with smtplib.SMTP(HOST, PORT) as server: 
                server.starttls()  
                server.ehlo()
                server.login(SENDER_EMAIL, SENDER_PASS)
                server.sendmail(SENDER_EMAIL, event["email"], msg.as_string())
                server.quit()
            return {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                },
                "body": "Success"
            }
                
        except smtplib.SMTPConnectError:
            error_msg = "Couldn\t connect to mail client"
        except smtplib.SMTPAuthenticationError:
            error_msg = "Couldn\t authenticate into mail client"
        except smtplib.SMTPException:
            error_msg = "SMTP Exception: Something went wrong"
        except Exception:
            error_msg = "Generic exception raised"
            return {
                "statusCode": 500,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                },
                "body": "Fail"
            }

        # return {
        #     "statusCode": 200,
        #     'body': { 
        #             'name': event["name"], 
        #             'email': event["email"],
        #             'id': id,
        #             'course_url': event["form"]["course_url"],
        #             # 'url': axios_body.course_url,
        #             'event': event
        #              }
        # }
    else:
        return {
            "statusCode": 404,
            "body": {'email': "Invalid"}
        }
    # new_monitoring = {
    #     "name": event["name"],
    #     "email": event["email"],
    #     "course_url": axios_body.get('course_url'),
    #     "tracking_preferences": prefs,
    # }    



    # try:
    #     response = requests.post(api_url, json=payload)
    #     response_data = response.json()
        
    #     if response.status_code == 200:
    #         return {
    #             'statusCode': 200,
    #             'body': json.dumps({'message': 'Email function invoked successfully', 'response': response_data})
    #         }
    #     else:
    #         return {
    #             'statusCode': response.status_code,
    #             'body': json.dumps({'message': 'Failed to invoke email function', 'response': response_data})
    #         }
    
    # except requests.RequestException as e:
    #     return {
    #         'statusCode': 500,
    #         'body': json.dumps({'message': 'Error making HTTP request', 'error': str(e)})
    #     }


#     insert_result = collection.insert_one(new_monitoring)

#     return {
#       "statusCode": 200,
#       "headers": {
#           "Access-Control-Allow-Origin": "*"
#         },           
#       "isBase64Encoded": False, 
#       "body": str(insert_result.inserted_id),
#   }


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




