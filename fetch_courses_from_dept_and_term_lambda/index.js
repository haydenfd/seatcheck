const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

const constructSocUrl = (subjAreaName, term, subjAreaCode) => {

    const baseUrl = "https://sa.ucla.edu/ro/public/soc/Results";

    // const subjectAreaName = "International and Area Studies (I A STD)";
    // const subj = "I A STD";
    
    const encodedSubjectAreaName = encodeURIComponent(subjAreaName);
    const encodedSubj = encodeURIComponent(subjAreaCode);
    
    const queryParams = `?SubjectAreaName=${encodedSubjectAreaName}&t=${term}&sBy=subject&subj=${encodedSubj}&catlg=&cls_no=&undefined=Go&btnIsInIndex=btn_inIndex`;
    const fullUrl = "https://sa.ucla.edu/ro/public/soc/Results?SubjectAreaName=Mathematics+(MATH)&t=24F&sBy=subject&subj=MATH+++&catlg=&cls_no=&undefined=Go&btnIsInIndex=btn_inIndex"
    return fullUrl;

}
exports.handler = async (event) => {
  const subjAreaName = event["subjAreaName"];
  const subjAreaCode = event["subjAreaCode"];
  const term = event["term"];

  const websiteUrl = constructSocUrl(subjAreaName, term, subjAreaCode);

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
    console.log(`Navigating to: ${websiteUrl}`);
    await page.goto(websiteUrl, { waitUntil: "networkidle0" });
    // Wait for the shadow host element
    console.log("Waiting for Shadow DOM...");
    await page.waitForSelector('ucla-sa-soc-app');

    // Click on the `#expandAll` button inside the shadow root
    console.log("Clicking the #expandAll button...");
    const clickResult = await page.evaluate(() => {
      const shadowHost = document.querySelector('ucla-sa-soc-app');
      if (shadowHost && shadowHost.shadowRoot) {
        const expandAllButton = shadowHost.shadowRoot.querySelector('#expandAll');
        if (expandAllButton) {
          expandAllButton.click();
          return "Expand All button clicked";
        }
        return "#expandAll button not found";
      }
      return "Shadow root not found";
    });

    console.log("Click result:", clickResult);

    console.log("Waiting for content to load...");
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5000)));


    // Fetch the inner HTML of the shadow root
    console.log("Fetching shadow root inner HTML...");
    const shadowRootHTML = await page.evaluate(() => {
      const shadowHost = document.querySelector('ucla-sa-soc-app');
      if (shadowHost && shadowHost.shadowRoot) {
        
        const queryForAllCoursesContainers = "#divClassNames > .results > #resultsTitle > .row-fluid.class-title";
        const queryForAllLecContainers = '.primarySection > div:last-child > .primary-row.class-info';
        const queryForAllDiscsInLectureContainers = ".secondarySection > :nth-child(2) > .row-fluid";
        
        const allCoursesContainers = shadowHost.shadowRoot.querySelectorAll(queryForAllCoursesContainers);
        
        // const firstCourse = allCoursesContainers[0];
            
        // return firstCourse.querySelectorAll(queryForAllLecContainers)[0].id.split('_')[0];
        let finalRes = [];
        
        allCoursesContainers.forEach((courseContainer, courseIdx) => {
            const courseObject = {};
            courseObject['course_num'] = courseIdx + 1;
            courseObject['course_id'] = courseContainer.id;

            const allLecturesInCurrContainer = courseContainer.querySelectorAll(queryForAllLecContainers);
            const lectureToDiscussionsMap = {};

            courseObject['base_id'] = allLecturesInCurrContainer[0].id.split('_')[0];
            courseObject['num_lectures'] = allLecturesInCurrContainer.length;

          //   allLecturesInCurrContainer.forEach((lectureContainer, lectureIdx) => {
          //     const allDiscussionsInLecture = lectureContainer.querySelectorAll(queryForAllDiscsInLectureContainers);
    
          //     lectureToDiscussionsMap[lectureIdx + 1] = allDiscussionsInLecture.length;
          // });

          //   courseObject['discs'] = lectureToDiscussionsMap;

            finalRes.push(courseObject);
        
        });

        return finalRes;
        
  
    
      }
      return "Shadow root not found";
    });

    console.log("Shadow root HTML fetched successfully");

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(shadowRootHTML),
    };
  } catch (error) {
    console.error("Error occurred during execution:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred during processing",
        error: error.message,
      }),
    };
  } finally {
    if (browser) {
      console.log("Closing browser...");
      await browser.close();
    }
  }
};

// exports.handler = async (event, context) => {

//   const subjAreaName = event["subjAreaName"]
//   const subjAreaCode = event["subjAreaCode"]
//   const term = event["term"]


//   const websiteUrl = constructSocUrl(subjAreaName, term, subjAreaCode);

//   if (!websiteUrl) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify("URL not provided!"),
//     };
//   }

//   let browser;
//   try {
//     // Launch Puppeteer with Chromium
//     browser = await puppeteer.launch({
//       args: chromium.args,
//       defaultViewport: chromium.defaultViewport,
//       executablePath: await chromium.executablePath(),
//       headless: chromium.headless,
//       ignoreHTTPSErrors: true,
//     });

//     const page = await browser.newPage();
//     await page.goto(websiteUrl, { waitUntil: "networkidle0" });

//     // Wait for the shadow host element
//     await page.waitForSelector('ucla-sa-soc-app');

//     // Extract the list of courses from the first pagination page
//     const firstPageCourses = await page.evaluate(() => {
//       const shadowHost = document.querySelector('ucla-sa-soc-app');
//       if (shadowHost && shadowHost.shadowRoot) {
//         const classes = shadowHost.shadowRoot.querySelectorAll(
//           '#webComponentWrapper > #layoutContentArea > .search_results > #divSearchResults > #divClassNames > .results > #resultsTitle > .class-title'
//         );
//         return Array.from(classes).map((element) => element.id);
//       }
//       return 'Shadow root not found';
//     });

//     // Click the second `li` element for pagination
//     const clickResult = await page.evaluate(() => {
//       const shadowHost = document.querySelector('ucla-sa-soc-app');
//       if (shadowHost && shadowHost.shadowRoot) {
//         const secondDivChild = shadowHost.shadowRoot.querySelector('#divPagBottom > div:nth-child(2)');
//         if (secondDivChild) {
//           const ulElement = secondDivChild.querySelector('ul.jPag-pages');
//           if (ulElement) {
//             const secondLi = ulElement.querySelector('li:nth-child(2)');
//             if (secondLi) {
//               secondLi.click();
//               return 'Second li clicked';
//             }
//             return 'Second li not found';
//           }
//           return 'ul.jPag-pages not found';
//         }
//         return 'Second div child not found';
//       }
//       return 'Shadow root not found';
//     });

//     // Wait for 5 seconds for the second pagination to load
//     await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 1000)));

//     // Extract the list of courses from the second pagination page
//     const secondPageCourses = await page.evaluate(() => {
//       const shadowHost = document.querySelector('ucla-sa-soc-app');
//       if (shadowHost && shadowHost.shadowRoot) {
//         const classes = shadowHost.shadowRoot.querySelectorAll(
//           '#webComponentWrapper > #layoutContentArea > .search_results > #divSearchResults > #divClassNames > .results > #resultsTitle > .class-title'
//         );
//         return Array.from(classes).map((element) => element.id);
//       }
//       return 'Shadow root not found';
//     });

//     return {
//         statusCode: 200,
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify([firstPageCourses, secondPageCourses]),
//     }
//   } catch (error) {
//     console.error("Error:", error);

//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: "An error occurred during processing",
//         error: error.message,
//       }),
//     };
//   } finally {
//     if (browser) {
//       await browser.close();
//     }
//   }
// };

