import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email_validator import validate_email_domain
from confirmation_email_body import generate_confirmation_email_body

HOST = os.environ.get('EMAIL_HOST')
PORT = os.environ.get('EMAIL_PORT')
SENDER_EMAIL = os.environ.get('EMAIL_SENDER')
SENDER_PASS = os.environ.get('EMAIL_PASS')


def main(event, context):
    rcv_email = event['user_email']
    rcv_name = event['user_name']
    email_type = event['email_type']
    # course = event['course']
    
    if not validate_email_domain(rcv_email):
        return {
            "statusCode": 404,
            "headers": {
                "Access-Control-Allow-Origin": "*",
            },
            "body": "Email domain not found"
        }
    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = rcv_email

    if email_type == "Confirmation": 
        msg['Subject'] = f"[SEATCHECK] Confirmation: Tracking set up!"
        msg_body = generate_confirmation_email_body(rcv_name=rcv_name)

    msg.attach(MIMEText(msg_body, 'html'))
    
    try:
        with smtplib.SMTP(HOST, PORT) as server: 
            server.starttls()  
            server.ehlo()
            server.login(SENDER_EMAIL, SENDER_PASS)
            server.sendmail(SENDER_EMAIL, rcv_email, msg.as_string())
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