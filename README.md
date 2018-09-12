# react-fiber-experiments

⚠️ TODO intro

## Prerequisites

- Nodejs v8
- npm v5

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

The following command will run all your tests in a single run mode.

```shell
npm test
```

- `npm run test:unit` : single run of the unit tests
- `npm run test:unit:watch` : run the unit tests in watch mode

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
