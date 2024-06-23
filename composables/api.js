import merge from "lodash/merge";
import Cookies from "js-cookie";
// fetchJSON is bundled wrapper around fetch which simplifies working
// with JSON API:
//   * Automatically adds Content-Type: application/json to request headers
//   * Parses response as JSON when Content-Type: application/json header is
//     present in response headers
//   * Converts non-ok responses to errors
import { configureRefreshFetch, fetchJSON } from "refresh-fetch";

const retrieveRToken = () => Cookies.get("RToken");
const retrieveAToken = () => Cookies.get("AToken");
const saveRToken = (token) => Cookies.set("RToken", token);
const saveAToken = (token) => Cookies.set("AToken", token);
const clearRToken = () => Cookies.remove("RToken");
const clearAToken = () => Cookies.remove("AToken");

const fetchJSONWithToken = (url, options = {}) => {
  try {
    const token = retrieveAToken();

    let optionsWithToken = options;
    //console.log(optionsWithToken);
    if (token != null) {
      optionsWithToken = merge({}, options, {
        baseUrl: useRuntimeConfig().public.baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    //console.log("options in JSON", optionsWithToken);
    return $fetch(url, optionsWithToken);
  } catch (err) {
    console.log(err);
    throw err;
  }
  //   console.log(url);
  //   var x = fetchJSON(url, optionsWithToken);
  //   console.log(x);
};

// Decide whether this error returned from API means that we want
// to try refreshing the token. error.response contains the fetch Response
// object, error.body contains the parsed JSON response body
const shouldRefreshToken = (error) => {
  return error.response.status === 401 && error.response.statusText === "Unauthorized";
};

// Do the actual token refreshing and update the saved token
const refreshToken = () => {
  console.log("options in refreshToken");
  return $fetch("/api/auth/RefreshToken", {
    method: "POST",
    body: { RefreshToken: retrieveRToken() },
  })
    .then((response) => {
      saveRToken(response.tokens.refreshToken);
      saveAToken(response.tokens.accessToken);
      return response;
    })
    .catch((error) => {
      console.log(erorr);
      // If we failed by any reason in refreshing, just clear the token,
      // it's not that big of a deal
      clearRToken();
      clearAToken();
      throw error;
    });
};

export const fetch = configureRefreshFetch({
  shouldRefreshToken,
  refreshToken,
  fetch: fetchJSONWithToken,
});
