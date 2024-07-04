const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

const prepareWebsiteUrl = (major, abbr, term) => {

    const baseUrl = "https://sa.ucla.edu/ro/public/soc/Results";
    const abbr_with_parentheses = `(${abbr})`;

    const searchParams = {
        SubjectAreaName: (`${major} ${abbr_with_parentheses}`).replace(/\s/g, '+'),
        t: term,
        sBy: 'subject',
        subj: abbr.replace(/\s/g, '+'),
        catlg: '',
        cls_no: '',
        undefined: 'Go',
        btnIsInIndex: 'btn_inIndex'
    };

    const constructQueryString = (params) => {
        return Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
    };

    const queryString = constructQueryString(searchParams);

    return `${baseUrl}?${queryString}`;
}

exports.handler = async (event, context, callback) => {

    // query string params - major, abbr, term (might need to separate into year, quarter)
    
    const major = event["queryStringParameters"]["major"].replace(/\s/g, '+') || null;
    const abbr = `${event["queryStringParameters"]["abbr"].replace(/\s/g, '+')}` || null;
    const abbr_with_parentheses = `(${abbr})`
    const term = event["queryStringParameters"]["term"] || null;
    const websiteUrl = `https://sa.ucla.edu/ro/public/soc/Results?SubjectAreaName=${major}+${abbr_with_parentheses}&t=${term}&sBy=subject&subj=${abbr}&catlg=&cls_no=&undefined=Go&btnIsInIndex=btn_inIndex`;

    if (!websiteUrl) {
        return {
            statusCode: 400,
            body: JSON.stringify("Not found!"),
        }
    }

    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless,
        executablePath: await chromium.executablePath(),
        ignoreHTTPSErrors: true,
    });

    try {
        const page = await browser.newPage();
        await page.goto(websiteUrl, { waitUntil: "networkidle0" });

        // Wait for the shadow host element to be present
        await page.waitForSelector('ucla-sa-soc-app');
        const optionValues = await page.evaluate(() => {
            let shadowHost = document.querySelector('ucla-sa-soc-app');
            let shadowRoot = shadowHost.shadowRoot;
            let selectElement = shadowRoot.querySelector('#Instructor_options');
            
            let options = selectElement.querySelectorAll('option');
            let optionValues = [];
            options.forEach(option => optionValues.push(option.value));
            return optionValues;
        });

        return {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(optionValues),
            isBase64Encoded: false,
          }

    } catch (e) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
              },           
            isBase64Encoded: false, 
            body: {
                err: JSON.stringify(e),
                url: websiteUrl,
            },
        };
    } finally {
        await browser.close();
    }
};
