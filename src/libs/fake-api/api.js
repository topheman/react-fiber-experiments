import fixtures from "./fixtures.json";

let db;

const DEFAULT_MODE = "fastNetwork";

// from general to specific
const defaultModes = {
  slowNetwork: {
    "/*": 4000
  },
  [DEFAULT_MODE]: {
    "/*": 150
  },
  slowEndPoint: {
    "/*": 2000,
    "/course/*": 4000
    // "/course/*/nextLesson": 6000
  }
};

/**
 * Transforms a config to a usable structure (see unit test for example)
 */
export const _configModes = (modes = defaultModes) => {
  return Object.entries(modes).reduce((acc, [mode, value]) => {
    const innerConfig = Object.entries(value).reduce(
      (innerAcc, [pattern, delay]) => {
        innerAcc.push({
          pattern: new RegExp(pattern.replace("*", "(\\.*)")),
          delay
        });
        return innerAcc;
      },
      []
    );
    acc[mode] = innerConfig.reverse();
    return acc;
  }, {});
};

export const listModes = () => Object.keys(defaultModes);

export const buildDb = (dump = fixtures) => {
  db = dump;
};

const LOCAL_STORAGE_MODE_KEY = "fake-api-network-mode";

export const saveNetworkMode = mode => {
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

const matchUrlToResponse = (url, data = db) => {
  // /courses - remove lessons
  if (url.startsWith("/courses")) {
    return data.reduce((acc, current) => {
      const { lessons, ...rest } = current;
      acc.push(rest);
      return acc;
    }, []);
  }
  // /course/${topic} - match topic
  if (url.startsWith("/course/") && !url.endsWith("/nextLesson")) {
    const courseMatch = url.match(/\/course\/(.*)/);
    if (courseMatch && courseMatch[1]) {
      const res = data.filter(course => course.id === courseMatch[1]);
      if (res && res[0]) {
        return res[0];
      }
    }
  }
  // /course/${topic}/nextLesson - pick a lesson
  return null;
};

const matchUrlToDelay = (url, mode, modes = defaultModes) => {
  const config = _configModes(modes)[mode];
  for (let i = 0; i < config.length; i++) {
    if (url.match(config[i].pattern)) {
      return config[i].delay;
    }
  }
  return 0;
};

export const makeFakeApi = (mode = getNetworkMode()) => url => {
  const response = matchUrlToResponse(url);
  const delay = matchUrlToDelay(url, mode);
  console.log(`[FAKE ${delay}ms] ${url}`);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`[FAKE ${delay}ms] ${url}`, response);
      return resolve(response);
    }, delay);
  });
};
