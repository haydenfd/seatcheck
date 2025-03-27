const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

exports.handler = async (event, context) => {
  const websiteUrl = decodeURIComponent(event?.url || "");

  if (!websiteUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify("URL not provided!"),
    };
  }

  let browser;
  try {
    // Launch Puppeteer with Chromium
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto(websiteUrl, { waitUntil: "networkidle0" });

    // Wait for the shadow host element
    await page.waitForSelector('ucla-sa-soc-app');

    // Click the second `li` element
    const clickResult = await page.evaluate(() => {
      const shadowHost = document.querySelector('ucla-sa-soc-app');
      if (shadowHost && shadowHost.shadowRoot) {
        const secondDivChild = shadowHost.shadowRoot.querySelector('#divPagBottom > div:nth-child(2)');
        if (secondDivChild) {
          const ulElement = secondDivChild.querySelector('ul.jPag-pages');
          if (ulElement) {
            const secondLi = ulElement.querySelector('li:nth-child(2)');
            if (secondLi) {
                const classes = shadowHost.shadowRoot.querySelectorAll('#webComponentWrapper > #layoutContentArea > .search_results > #divSearchResults > #divClassNames > .results > #resultsTitle > .class-title')
                const classIdsArray = Array.from(classes).map(element => element.id);
                secondLi.click(); 
                return classIdsArray;

            }
            return 'Second li not found';
          }
          return 'ul.jPag-pages not found';
        }
        return 'Second div child not found';
      }
      return 'Shadow root not found';
    });

    // Wait for 5 seconds using JavaScript's setTimeout in evaluate
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 5000)));

    // Extract the updated shadow root content
    const updatedShadowRootHTML = await page.evaluate(() => {
      const shadowHost = document.querySelector('ucla-sa-soc-app');
      if (shadowHost && shadowHost.shadowRoot) {
        const classes = shadowHost.shadowRoot.querySelectorAll('#webComponentWrapper > #layoutContentArea > .search_results > #divSearchResults > #divClassNames > .results > #resultsTitle > .class-title')
        const classIdsArray = Array.from(classes).map(element => element.id);
        return classIdsArray;
      }
      return 'Shadow root not found';
    });

    // Return the updated innerHTML
    return {
      statusCode: 200,
      body: updatedShadowRootHTML,
      body1: clickResult
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred during processing",
        error: error.message,
      }),
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

