const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

exports.handler = async (event, context, callback) => {
    const instructorName = event["queryStringParameters"]["instructorName"] || null;
    const term = event["queryStringParameters"]["term"] || null;
    const websiteUrl = `https://sa.ucla.edu/ro/public/soc/Results?instName=${instructorName}&t=${term}&sBy=instructor&instDispName=&undefined=Go&btnIsInIndex=btn_inIndex`;
    console.log(`Fetching ${websiteUrl}`);
    let browser;

    function delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time);
        });
    }

    try {
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            headless: chromium.headless,
            executablePath: await chromium.executablePath(),
            ignoreHTTPSErrors: true,
        });

        const page = await browser.newPage();
        await page.goto(websiteUrl, { waitUntil: "networkidle0" });

        // Wait for the shadow host element to be present
        await page.waitForSelector('ucla-sa-soc-app', { timeout: 20000 });

        const buttonIds = await page.evaluate(() => {
            let shadowHost = document.querySelector('ucla-sa-soc-app');
            let shadowRoot = shadowHost.shadowRoot;
            let buttons = shadowRoot.querySelectorAll('.linkLikeButton');
            return Array.from(buttons).map(button => button.id);
        });

        // Click on the course buttons to expand their content
        for (const buttonId of buttonIds) {
            await page.evaluate((id) => {
                let shadowHost = document.querySelector('ucla-sa-soc-app');
                let shadowRoot = shadowHost.shadowRoot;
                let button = shadowRoot.querySelector(`#${id}`);
                if (button) {
                    button.click();
                }
            }, buttonId);
        }

        // Wait for the expanded content to load
        await delay(500);

        // Extract primary rows data
        const primaryRowsData = await page.evaluate(() => {
            let shadowHost = document.querySelector('ucla-sa-soc-app');
            let shadowRoot = shadowHost.shadowRoot;
            let primaryRows = shadowRoot.querySelectorAll('div.row-fluid.data_row.primary-row');
            let data = [];
            primaryRows.forEach(row => {
                let section = row.querySelector('div.sectionColumn div.cls-section.click_info');
                let enroll = row.querySelector('div.statusColumn p');
                let waitlist = row.querySelector('div.waitlistColumn p');
                if (section) {
                    let id = section.id.split('_')[0];
                    let courseName = section.id.split('_')[1].split('-section')[0];
                    let pTag = section.querySelector('p.hide-small');
                    let aTag = pTag ? pTag.querySelector('a') : null;
                    let title = pTag ? pTag.textContent.trim() : "";
                    let link = aTag ? aTag.href : "";
        
                    data.push({
                        "title": title,
                        "id": id,
                        "link": link,
                        "courseName": courseName,
                        "status": enroll.childNodes[1].textContent,
                        "seats": enroll.childNodes[3].textContent,
                        "waitlist": waitlist.textContent,
                    });
                }
            });
            return data;
        });

        callback(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(primaryRowsData)
        });

    } catch (e) {
        callback(null, {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ error: e.message }),
        });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};
