import axios from 'axios';

/**
 * The axios instance for our giphy API calls.
 */
const instance = axios.create({
    baseURL: 'https://api.giphy.com/v1/',
    timeout: 5000,
    params: {
        api_key: process.env.REACT_APP_GIPHY_API_KEY
    }
});

/**
 * 
 * @param {number} limit The maximum number of objects to return.
 * @param {number} offset Specifies the starting position of the results.
 * @param {string} endpoint The endpoint for the GIPHY API.
 * @param {string} q Search query term or phrase.
 * @returns a response with a list of GIFs from the specified endpoint.
 */
export function getGifs(limit = 4, offset, endpoint = 'trending', q) {
    if (endpoint === 'trending') {
        return instance.get(`gifs/trending`, { params: { offset, limit, ...instance.params } });
    }
    else if (endpoint === ('search')) {
        return instance.get(`gifs/search`, { params: { q, offset, limit, ...instance.params } })
    }
}

/**
 * 
 * @param {string} q Search query term or phrase.
 * @param {string} cancelToken The cancel token for the request, in case the request needs
 * to be canceled early.
 * @returns a response with a list of terms that completes the given tag on the GIPHY network.
 */
export function getAutocomplete(q, cancelToken) {
    return instance.get(`gifs/search/tags`, { params: { q, ...instance.params }, cancelToken });
}