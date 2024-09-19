

def generate_confirmation_email_body(rcv_name):
    msg_body = f"""
        <html>
            <body>
                <p>Hey <strong>{rcv_name}</strong>, we just set up course tracking for your course. Thanks for using Seatcheck!</p>
            </body>
        </html>
        """
    return msg_body