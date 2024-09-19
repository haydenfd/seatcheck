const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const cheerio = require('cheerio');


function hasExamDatePassed(date_str) {

    // 10 => exam date has already happened. Date.now() - ExamDate.time() is +ve. INVALID
    // -10 => exam is in future; hasn't happened yet. Date.now() - ExamDate.time is -ve. VALID
    // 0 => no exam date listed. INDETERMINATE
    let result = 0;
    const no_exam_listed_substring = "None listed";

    if (date_str.includes(no_exam_listed_substring)) {

    }
    else {
        const exam_date = new Date(date_str);
        const exam_date_time_ms = exam_date.getTime();
        const current_time_ms = Date.now();

        if (current_time_ms > exam_date_time_ms) {
            result = 10;
        } else {
            result = -10;
        }
    }

    return result;
}




function reduceStatuses(status_text, waitlist_text) {
  const cancelled_substring = "Cancelled"; // -1
  const closed_by_dept_substring = "Closed by Dept"; // 5xx -> always 500 regardless
  const closed_class_full_substring = "Closed: Class Full"; // 1x -> No WL = 11; WL Full = 12
  const open_class_substring = "Open"; // 1xx -> No WL = 101; WL full = 102; WL open (x of y taken) = 105
  const waitlist_class_full_substring = "Waitlist: Class Full"; // 2xx -> WL open = 205
  const no_waitlist_substring = "No Waitlist";
  const waitlist_full_substring = "Waitlist Full";

  if (status_text.includes(cancelled_substring)) {
    return -1;
  }

  else if (status_text.includes(closed_by_dept_substring)) {
    return 500;
  }

  else if (status_text.includes(closed_class_full_substring)) {

    if (waitlist_text.includes(no_waitlist_substring)) {
      return 11;
    }

    else if (waitlist_text.includes(waitlist_full_substring)) {
      return 12;
    }

    else {
      return 15; // class closed, waitlist open. Should not happen, though. 
    }

  }


  else if (status_text.includes(open_class_substring)) {

    if (waitlist_text.includes(no_waitlist_substring)) {
      return 101;
    }

    if (waitlist_text.includes(waitlist_full_substring)) {
      return 102; // WL full, class open. Should rarely happen, if ever.
    }

    else {
      return 105; // WL open
    }
  }

  else if (status_text.includes(waitlist_class_full_substring)) {
    return 204;
  }

}

function extractCourseCode(inputString) {
    const regex = /\) (.*?) \-/;
    const match = inputString.match(regex);
    if (match) {
        return match[1];
    } else {
        return null;
    }
}


exports.handler = async (event, context) => {
  const websiteUrl = decodeURIComponent(event["queryStringParameters"]['url']) || null;
  

  if (!websiteUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify("URL not provided!"),
    }
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto(websiteUrl, { waitUntil: "networkidle0" });
    await page.waitForSelector('ucla-sa-soc-app');

    const shadowRootHTML = await page.evaluate(() => {
      let shadowHost = document.querySelector('ucla-sa-soc-app');
      if (shadowHost && shadowHost.shadowRoot) {
        return shadowHost.shadowRoot.innerHTML;
      } else {
        return 'Shadow root not found';
      }
    });

    const $ = cheerio.load(shadowRootHTML);

    // console.log(shadowRootHTML);
    // Need to amend here to check if link is valid in first place. If so, then do all the parsing. Else, early return.
    const termDisplay = $('#term_display p').text().trim();
    const subjectClass = $('#subject_class p').text().replace(/\s+/g, ' ').trim();
    const sectionTitle = $('#class_id_textbook p').first().text().trim();
    const regex = /:(.*)/;
    const match = sectionTitle.match(regex);   
    const parsedSectionTitle = match[1].trim();
    const status = $('tr.enrl_mtng_info td:first-child').text().trim();

    const waitlistStatus = $('tr.enrl_mtng_info td:nth-child(2)').text().trim();
    const meetingDays = $('tr.enrl_mtng_info td:nth-child(3) button.popover-right').text().trim();
    const meetingTime = $('tr.enrl_mtng_info td').eq(3).text().trim();
    const instructors = [];
    $('tr.enrl_mtng_info td:last-child').each(function() {
        const htmlContent = $(this).html().trim(); 
    
        if (htmlContent.includes('<br>')) {
            htmlContent.split('<br>').forEach(function(part) {
                instructors.push(part.trim());
            });
        } else {
            instructors.push(htmlContent);
        }
    });    
    const finalDate = $('tr.final_exam_info td:first-child').text().trim();

    const course_status = reduceStatuses(status, waitlistStatus);

    if (course_status === -1) {
      const responseData = {
        can_track: false,
        status_code: -1,  
        status_text: "Cancelled",
      };

      return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
          },           
        isBase64Encoded: false, 
        body: JSON.stringify(responseData),
      }
    } else if (course_status === 500) {
      const responseData = {
        can_track: false,
        status_code: 500,  
        status_text: "Closed by Dept",
      };

      return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
          },           
        isBase64Encoded: false, 
        body: JSON.stringify(responseData),
      }      
    }
    
    else {
  
      const responseData = {
        can_track: true,
        term_display: termDisplay,
        subject_class: extractCourseCode(subjectClass),
        section_title: parsedSectionTitle,
        status_text: status,
        waitlist_text: waitlistStatus,
        instructors: instructors,
        days: meetingDays,
        time: meetingTime,
        status_code: reduceStatuses(status, waitlistStatus),
  
      };
  
      return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
          },           
        isBase64Encoded: false, 
        body: JSON.stringify(responseData),
    };  

    }


  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        error: "An error occurred while processing the request.",
        details: error.message
      }),
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
{/* 
    - term_display
    - subject_class    
    - class_id_textbook
    - status, waitlist status
    - professor
    - approx 16-17 days till study list official
*/}