# react-fiber-experiments

[![Demo](https://img.shields.io/badge/demo-online-blue.svg)](https://react-fiber-experiments.surge.sh/)

The goal of this project is to show you the very latest features of React that are still in development (such as _Suspense_).

You can [try online the demo](https://react-fiber-experiments.surge.sh/) to understand the benefits of those new features and take a look at the source code to better understand those new concepts.

📺 _[Watch the video about Suspense / This project](http://dev.topheman.com/discover-react-suspense/)_

## Prerequisites

- Nodejs v8
- npm v5

Using the features still in development such as _Suspense_ or _Time Slicing_ need a custom build of React. It is shipped with this project in the [react-modules](./react-modules) folder. If you wan't to make that build yourself, follow the instructions in the same folder.

## Install

```shell
git clone https://github.com/topheman/react-fiber-experiments.git
cd react-fiber-experiments
npm install
```

## Run

```shell
npm start
```

## Build

```shell
npm run build
```

Will build a production version of the website in the `build` folder.

Run `npm run serve` to test your build on a local server.

## Test

The following command will run **all your tests** (both unit and end to end) in a single run mode.

```shell
npm test
```

### Unit tests

- `npm run test:unit` : single run of the unit tests
- `npm run test:unit:watch` : run the unit tests in watch mode

### End to end tests

Works the same way as the end to end tests of the [topheman/npm-registry-browser](https://github.com/topheman/npm-registry-browser#end-to-end) project.

I'm using [cypress.io](https://www.cypress.io/) for the e2e tests. You will find them in [cypress/integration](cypress/integration).

- `npm run test:cypress` : **single run the e2e tests**. It will:
  - build the project and serve it on [http://localhost:5000](http://localhost:5000) (that way, your tests reflect exactly what the end user would see in production)
  - run the tests in [cypress/integration](cypress/integration) folder
  - tear down once tests are passed (or failed)
- `npm run test:cypress:dev` : use this one when you're **coding your tests**. It will:
  - spin up a dev server on [http://localhost:3000](http://localhost:3000) (so, you don't have to `npm start`)
  - open the cypress client that will let you choose which tests you want to run
- `npm run test:cypress:debug-build` : use this if your e2e tests only fail on a production bundle, to **debug the tests with the production version** of your app. It will:
  - build the project and serve it on [http://localhost:5000](http://localhost:5000)
  - open the cypress client that will let you choose which tests you want to run

On this project the end to end tests are not run on the precommit hook, they are run on the CI to gain time (take a few seconds before pushing to run them).

## Linter / Prettier

Your code will be automatically linted / formatted when you commit. More infos on [topheman/my-react-app-starter](https://github.com/topheman/my-react-app-starter#linter)

## FAQ

### Which boilerplate was used

Based on [topheman/my-react-app-starter@1.1.0](https://github.com/topheman/my-react-app-starter) for the create-react-app boilerplate (eslint/prettier/others advanced setup). Added react-app-rewired to override webpack's `config.resolve.modules` (and be able to use custom react builds).

Based on [topheman/npm-registry-browser](https://github.com/topheman/npm-registry-browser) for the layouts/css/ui.

**This remains an un-ejected create-react-app project, which means that you can:**

- update `react-scripts`
- customize or remove any of the features added

The [original CRA guidelines are still available here](README.cra.md)
**This remains an un-ejected create-react-app project, which means that you can:**

- update `react-scripts`
- customize or remove any of the features added

The [original CRA guidelines are still available here](README.cra.md)

## Resources

- 📺 [Suspense! - Dan Abramov](https://youtu.be/6g3g0Q_XVb4) at ReactFest (march 2018)
- 📺 [Beyond React 16 - Dan Abramov](https://youtu.be/nLF0n9SACd4) at JSConf Iceland 2018 (april 2018)
- 📺 [React Suspense - Andrew Clark](https://youtu.be/z-6JC0_cOns) at Zeit Day 2018 (may 2018)
- 📺 [Route Recalculating - Ryan Florence](https://youtu.be/X-kA8B2QzjY) at React Rally 2018 (august 2018)
- 📺 [Algebraic effects, Fibers, Coroutines Oh my! - Brandon Dail](https://youtu.be/7GcrT0SBSnI) at React Rally 2018 (august 2018)
- [Didact Fiber: Incremental reconciliation](https://engineering.hexacta.com/didact-fiber-incremental-reconciliation-b2fe028dcaec) - React Fiber explained by Rodrigo Pombo
- [React 16 new core architecture](https://reactjs.org/blog/2017/09/26/react-v16.0.html#new-core-architecture) from the reactjs doc
- [Demo: Coordinating async React with non-React views](https://gist.github.com/acdlite/f31becd03e2f5feb9b4b22267a58bc1f) - draft by Andrew Clark
- [Suspense section in facebook/react](https://github.com/facebook/react/tree/master/fixtures/unstable-async/suspense#readme)
- [@reach/router](https://github.com/reach/router) by Ryan Florence
- [sw-yx/fresh-async-react](https://github.com/sw-yx/fresh-async-react) - a repo of links about Async React maintained by [@swyx](https://twitter.com/swyx) that you can PR
