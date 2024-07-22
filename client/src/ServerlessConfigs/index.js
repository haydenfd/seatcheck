// Assuming prod stage of APIGateway config
const API_GATEWAY_BASE_URL =
  "https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/";

const API_GATEWAY_ENDPOINTS = {
  FETCH_INSTRUCTORS_GIVEN_MAJOR_TERM: (abbr, major, term = "24F") => {
    return String(``);
  },
};

export { API_GATEWAY_BASE_URL, API_GATEWAY_ENDPOINTS };
