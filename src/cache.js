/* eslint-disable */
import { createCache } from "simple-cache-provider";

export let cache;
export function initCache() {
  // `createCache` accepts an invalidator function in first argument: https://github.com/facebook/react/blob/master/packages/simple-cache-provider/src/SimpleCacheProvider.js#L152
  cache = createCache(initCache);
}
