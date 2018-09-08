import Route from "route-parser";

import fixtures from "./fixtures.json";

let datasCache, routesConfigCache, networkConfigCache; // cache

const DEFAULT_MODE = "fastNetwork";

const NETWORK_DEFINITION = {
  slowNetwork: [
    { pattern: "/scripts/course-container", delay: 2000 },
    { pattern: "*", delay: 4000 }
  ],
  [DEFAULT_MODE]: [
    { pattern: "/scripts/course-container", delay: 150 },
    { pattern: "*", delay: 150 }
  ],
  slowEndPoint: [
    { pattern: "/scripts/course-container", delay: 300 },
    { pattern: "/course/:topic/nextLesson", delay: 6000 },
    { pattern: "*", delay: 2000 }
  ]
};

const ROUTES_DEFINITION = [
  {
    pattern: "/courses",
    // return all courses - remove lessons inside
    handler: datas => ({
      ok: datas.reduce((acc, current) => {
        const { lessons, ...rest } = current;
        acc.push(rest);
        return acc;
      }, [])
    })
  },
  {
    pattern: "/course/:topic",
    handler: (datas, req) => {
      const ok = datas.find(course => course.id === req.topic);
      return { ok, err: !ok ? `Topic "${req.topic}" not found` : false };
    }
  },
  {
    pattern: "/course/:topic/nextLesson",
    handler: (datas, req) => {
      let ok;
      // return the last lesson in that course (emulate a user-specific endpoint)
      const match = datas.find(course => course.id === req.topic);
      if (match) {
        ok =
          (match && match.lessons && match.lessons[match.lessons.length - 1]) ||
          null;
      }
      return { ok, err: !ok ? `Topic "${req.topic}" not found` : false };
    }
  }
];

/**
 * route-parser doesn't seem to handle a "matchAll"
 */
const makeRoute = pattern => {
  if (pattern === "*") {
    return {
      match: () => true
    };
  }
  return new Route(pattern);
};

export const listNetworkModes = () => Object.keys(networkConfigCache);

export const initFakeApi = (
  datas = fixtures,
  routes = ROUTES_DEFINITION,
  network = NETWORK_DEFINITION
) => {
  datasCache = datas;
  routesConfigCache = routes.map(routeInfo => ({
    ...routeInfo,
    route: makeRoute(routeInfo.pattern)
  }));
  networkConfigCache = Object.entries(network).reduce((acc, [mode, value]) => {
    acc[mode] = value.map(networkInfo => ({
      ...networkInfo,
      route: makeRoute(networkInfo.pattern)
    }));
    return acc;
  }, {});
};

const LOCAL_STORAGE_MODE_KEY = "fake-api-network-mode";

export const setNetworkMode = mode => {
  if (localStorage && localStorage.setItem) {
    return localStorage.setItem(LOCAL_STORAGE_MODE_KEY, mode);
  }
  console.warn(
    "No localStorage available, fallback in memory mode - reload based / state based actions may use default delay."
  );
};

export const getNetworkMode = () => {
  if (localStorage && localStorage.getItem) {
    const mode = localStorage.getItem(LOCAL_STORAGE_MODE_KEY);
    return mode || DEFAULT_MODE;
  }
  return DEFAULT_MODE;
};

export const getNetworkDelay = (url, mode = getNetworkMode()) => {
  let delay;
  if (!networkConfigCache[mode] && isNaN(Number(mode))) {
    throw new Error(
      `Illegal network mode "${mode}", please use one of ${listNetworkModes().join()} or pass an integer`
    );
  }
  if (!isNaN(Number(mode))) {
    delay = Number(mode);
  } else {
    delay =
      networkConfigCache[mode] &&
      networkConfigCache[mode].find(networkInfo => networkInfo.route.match(url))
        .delay;
  }
  return delay;
};

export const fakeApi = (url, mode = getNetworkMode()) => {
  if (!datasCache || !routesConfigCache || !networkConfigCache) {
    throw new Error("Please `initFakeConfig()` bafore using `fakeApi`");
  }
  // match delay to url
  const delay = getNetworkDelay(url, mode);
  // match handler to url
  let matchedRoute = routesConfigCache
    .map(routeInfo => ({
      ...routeInfo,
      req: routeInfo.route.match(url) // add matching infos
    }))
    .find(routeInfo => routeInfo.req !== false);
  console.log(`⬆️[FAKE ${delay}ms] ${url}`, { matchedRoute });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = matchedRoute
        ? matchedRoute.handler(datasCache, matchedRoute.req)
        : null;
      if (response.err) {
        console.warn(`⬇️[FAKE ${delay}ms] ${url}`, response.err);
      } else {
        console.log(`️️️️️⬇️[FAKE ${delay}ms] ${url}`, response.ok);
      }
      if (!response.err) {
        return resolve(response.ok);
      }
      return reject({ error: response.err });
    }, delay);
  });
};
