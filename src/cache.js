/* eslint-disable */
import { createCache } from "react-cache";

export let cache;
export function initCache() {
  // `createCache` accepts an invalidator function in first argument: https://github.com/facebook/react/blob/master/packages/react-cache/src/ReactCache.js#L152
  cache = createCache(initCache);
}
