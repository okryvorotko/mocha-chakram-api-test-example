const api = require('chakram');
const o_O = require('monocle-js').o_O;
const baseUri = "https://dev.tracker-iq.com/api/acm/v1/";


const apiConnector = {
    get: (user, endpointName) => get(user, endpointName),
    post: (adminUser, postData, endpointName) => post(adminUser, postData, endpointName)
};

module.exports = apiConnector;

/**
 * Calls GET API request. Prints request parameters and response
 * @param adminUser{Object} object of user to authenticate
 * @param endpointName{String} endpoint name
 * @returns response{Object} API response object
 */
get = o_O(function* (adminUser, endpointName) {
    let headers = {};
    if (adminUser) {
        if (adminUser.uuid) {
            headers.uuid = adminUser.uuid;
        }
        if (adminUser.token) {
            headers.token = adminUser.token;
        }
    }

    const options = {headers: headers};

    const response = yield api.get(baseUri + endpointName, options);

    printResponse(response);

    return response;
});

/**
 * Calls POST API request. Prints request parameters and response
 * @param {Object} adminUser - object of user to authenticate
 * @param {Object} postData - object of data
 * @param {String} endpointName - endpoint name
 * @returns {Object} response - API response object
 */
post = o_O(function* (adminUser, postData, endpointName) {
    let headers = {};
    if (postData) {
        headers.postData = {};
        headers.postData.json = postData;
    }
    let options = {headers: headers};

    const response = yield api.post(baseUri + endpointName, options);
    printResponse(response);

    return response;
});

/**
 * Prints response details
 * @param response{Object} JSON serializable object, returned from API call
 */
function printResponse(response) {
    console.log("\n" + response.response.request.method + ": " +
        response.response.request.uri.href);
    console.log("Headers: " + JSON.stringify(response.response.request.headers));
    if (response.response.request.body) {
        console.log("Body: " + response.response.request.body);
    }
    console.log("Response body: " + JSON.stringify(response.body));
}

