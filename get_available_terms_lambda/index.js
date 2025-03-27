const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

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
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto(websiteUrl, { waitUntil: "networkidle0" });

    await page.waitForSelector("ucla-sa-soc-app");

    const result = await page.evaluate(async () => {
      const shadowHost = document.querySelector("ucla-sa-soc-app");
      const shadowRoot = shadowHost.shadowRoot;

      // Query the dependent `<select>` element
      const searchByCriteriaElementQuery =
        "#webComponentWrapper > #layoutContentArea > #basic-search > #soc-search > form > #div_simple_search > #search_panel > #div_search_criteria > #div_searchBy > select";
      const searchByCriteriaElement = shadowRoot.querySelector(
        searchByCriteriaElementQuery
      );

      // Set a new value for the select element
      const newValue = searchByCriteriaElement.options[2].value; // Set to the desired option
      searchByCriteriaElement.value = newValue;

      // Trigger the 'change' event to update the DOM and invoke any event listeners
      searchByCriteriaElement.dispatchEvent(new Event("change", { bubbles: true }));

      // Wait for the DOM to reload (if applicable)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Adjust timeout as needed

      // Fetch the updated DOM of the second dependent `<select>` element
      const dependentElementQuery =
        "#webComponentWrapper > #layoutContentArea > #basic-search > #soc-search > form > #div_simple_search > #search_panel > #div_term_details > select";
        const searchByCriteriaElementQuery1 =
        "#webComponentWrapper > #layoutContentArea > #basic-search > #soc-search > form > #div_simple_search > #search_panel > #div_search_criteria > #div_searchBy > select";        
      const dependentElement = shadowRoot.querySelector(searchByCriteriaElementQuery1);

      return dependentElement.innerHTML
      // Extract options from the dependent dropdown
      const options = Array.from(dependentElement.options).map((option) => ({
        value: option.value,
        text: option.textContent.trim(),
      }));

      return options;
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result),
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
