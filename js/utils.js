/**
 * Get a query parameter value from the URL.
 * @param {string} param - The name of the query parameter.
 * @returns {string|null} - The value of the query parameter, or null if not found.
 */
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}