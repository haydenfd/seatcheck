from bs4 import BeautifulSoup
import requests


'''
    Event JSON - url of course to monitor. 
    Parses page of course URL and returns waitlist, enrollment status
'''

def monitor_course_handler(event, context):

    url = event['url']

    response = requests.get(url)

    if response.status_code == 200:
    
        html_content = response.text
        soup = BeautifulSoup(html_content, 'html.parser')
        table_elem = soup.find('table')
    
        if table_elem:
            td_elements = table_elem.find('tbody').find('tr').find_all('td')
    
            if td_elements:
                enrollment_info = td_elements[0].renderContents().decode()
                waitlist_info = td_elements[1].renderContents().decode()

                return {
                    'Enrollment info': enrollment_info,
                    'Waitlist info': waitlist_info
                }
