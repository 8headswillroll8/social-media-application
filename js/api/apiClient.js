/**
 * Makes a request to the Noroff API
 * @param {string} endpoint - The API endpoint
 * @param {object} [options] - Optional settings for the request
 * @param {object} [options.body] - Data to send with the request (for POST/PUT)
 * @param {string} [options.method] - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} [options.headers] - Additional headrs
 *
 * @returns {Promise<any>} The response data from the API
 *
 * @throws {Error} If the API request fails
 */

const BASE_URL = "https://v2.api.noroff.dev";

async function apiClient(endpoint, options = {}) {
  const { body, ...customOptions } = options;

  const headers = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("accessToken");

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const apiKey = localStorage.getItem("apiKey");

  if (apiKey) {
    headers["X-Noroff-API-Key"] = apiKey;
  }

  const config = {
    method: body ? "POST" : "GET",
    ...customOptions,
    headers: {
      ...headers,
      ...customOptions.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(BASE_URL + endpoint, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.message || "An API error occured");
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("API client error:", error);
    throw error;
  }
}

export const get = (endpoint) => apiClient(endpoint);
export const post = (endpoint, body) => apiClient(endpoint, { body });
export const put = (endpoint, body) =>
  apiClient(endpoint, { method: "PUT", body });
export const del = (endpoint) => apiClient(endpoint, { method: "DELETE" });
