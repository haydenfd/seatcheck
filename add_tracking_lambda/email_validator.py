import dns.resolver

def validate_email_domain(email):
    domain = email.split('@')[-1]
    try:
        mx_records = dns.resolver.resolve(domain, 'MX')
        return True if mx_records else False
    except (dns.resolver.NoAnswer, dns.resolver.NXDOMAIN):
        return False
    


def generate_confirmation_email_body(rcv_name, url):
    msg_body = f"""
        <html>
            <body>
                <p>Hey <strong>{rcv_name}</strong>, we just set up course tracking for your course. You can cancel your tracking here - {url}</p>
            </body>
        </html>
        """
    return msg_body