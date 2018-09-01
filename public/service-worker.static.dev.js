/**
 * This is a copy/paste of the service worker of create-react-app in dev mode
 * It ensures that any window subscribed will reload
 *
 * The routing part is add via importScripts (since it isn't transpiled)
 *
 * In production mode, there won't be the window reload part
 */

/* eslint-disable no-restricted-globals,no-restricted-syntax */

// This service worker file is effectively a 'no-op' that will reset any
// previous service worker registered for the same host:port combination.
// In the production build, this file is replaced with an actual service worker
// file that will precache your site's local assets.
// See https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432

self.importScripts(`./sw-routing.js?${new Date().getTime()}`);

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", () => {
  self.clients.matchAll({ type: "window" }).then(windowClients => {
    for (const windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      console.warn(
        "Service worker was updated on an other tab, make sure you reload this page",
        windowClient.url
      );
      // ⚠️ The line bellow is commented since it will make an infinite loop
      // windowClient.navigate(windowClient.url);
    }
  });
});
