export const BASE_URL = "https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/";


export const ENDPOINTS = {
    course: "url/",
    confirm: "tracking/",
};

export function getApiEndpoint(endpointKey, params = {}) {

    if (!ENDPOINTS[endpointKey]) {
        throw new Error(`Endpoint "${endpointKey}" does not exist.`);
    }

    let finalEndpoint = BASE_URL + ENDPOINTS[endpointKey];

    if (endpointKey === 'course' && params.url) {
        const encodedUrl = encodeURIComponent(params.url);
        finalEndpoint += `?url=${encodedUrl}`;
    }

    return finalEndpoint;
}
