export const BASE_URL = "https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/";

/**

    - course is GET /url, for now. Query param is url = {encoded_uri};
    - add email/tracking is POST /tracking, for now. Send body data. 

*/
export const ENDPOINTS = {
    course: "url/",
    confirm: "tracking/",
};