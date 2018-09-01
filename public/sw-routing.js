/* eslint-disable no-restricted-globals,no-restricted-syntax */

console.log("loaded sw-routing");

/**
 * Returns relative path based on a request object
 * Returns null if not the same origin as the referrer
 * @param {Request}
 */
const getRelativePath = ({ referrer, url }) => {
  if (url.includes("referrer")) {
    return url.replace(
      referrer.endsWith("/") ? referrer : referrer + "/",
      "/" + url
    );
  }
  return null;
};

const timeout = (fn, delay, logInfos) => {
  return new Promise(resolve => {
    console.log(">", logInfos);
    setTimeout(() => {
      console.log("<", logInfos);
      resolve(fn);
    }, delay);
  });
};

const baseUrl = self.location.href
  .split("/")
  .slice(0, -1)
  .join("/");
console.log("Service worker base url", baseUrl);

/**
 * Urls to include/exclude from the timeout proxy (matching startsWith)
 */
const timeoutUrlInclude = [
  "https://cdn2.thedogapi.com/",
  "https://api.thedogapi.com"
];
// const timeoutUrlIgnore = [
//   `${baseUrl}/static/`,
//   `${baseUrl}/service-worker`,
//   `${baseUrl}/timeout`
// ];

/**
 * TODO make an "api" that catches:
 * - PUT /timeout/2
 */

self.timeoutState = 1;

self.addEventListener("fetch", event => {
  console.log("fetch", event.request.url, event);
  if (timeoutUrlInclude.some(url => event.request.url.startsWith(url))) {
    // event.respondWith(timeout(() => fetch(event.request), 1000, "timeout"));
    const newRequest = new Request(event.request.url, {
      ...event.request,
      // referrer: event.request.referrer,
      // cache: event.request.cache,
      // referrerPolicy: event.request.referrerPolicy,
      mode: "no-cors"
    });
    console.log(event.request);
    // event.respondWith(fetch(event.request));
    event.respondWith(fetch(newRequest));
  }
  // if (event.request.url.endsWith("/timeout/")) {
  //   console.log("fetch - /timeout/", event.request.url, event);
  //   const { url } = event.request;
  //   const newUrl = url.replace("/timeout/", "");
  //   const newRequest = new Request(newUrl, {
  //     ...event.request,
  //     referrer: event.request.referrer,
  //     cache: event.request.cache,
  //     referrerPolicy: event.request.referrerPolicy,
  //     mode: "no-cors"
  //   });
  //   console.log("replace /timeout/", {
  //     url,
  //     newUrl,
  //     newRequest,
  //     oldRequest: event.request
  //   });
  //   event.respondWith(fetch(newRequest));
  // }
});
