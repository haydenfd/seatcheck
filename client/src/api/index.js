export const BASE_URL = "https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/";


export const ENDPOINTS = {
    course: "url",
    confirm: "tracking",
    foo: "foo",
};

export function getApiEndpoint(endpointKey, params = {}) {
    console.log(`X: ${params.url}`)
    if (!ENDPOINTS[endpointKey]) {
        throw new Error(`Endpoint "${endpointKey}" does not exist.`);
    }

    let finalEndpoint = BASE_URL + ENDPOINTS[endpointKey];

    if (endpointKey === 'course' && params.url) {
        finalEndpoint += `?url=${params.url}`;
    }

    return finalEndpoint;
}

