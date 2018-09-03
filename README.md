# react-fiber-experiments

Based on [topheman/my-react-app-starter@1.1.0](https://github.com/topheman/my-react-app-starter).

**This remains an un-ejected create-react-app project, which means that you can:**

- update `react-scripts`
- customize or remove any of the features added

The [original CRA guidelines are still available here](README.cra.md)

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

## Serve

Once you've built you're app, you can test the build on a local server with:

```shell
npm run serve
```

## Test

The following command will run all your tests in a single run mode.

```shell
npm test
```

### Unit

- `npm run test:unit` : single run of the unit tests
- `npm run test:unit:watch` : run the unit tests in watch mode

### End to end

No end to end test configured yet.

## Linter

I use eslint to check the coding style, with the following presets:

- [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb): An advanced set of eslint rules for JavaScript and React made by Airbnb
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier): Turns off all rules that are unnecessary or might conflict with Prettier.
- [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app): Shipping preset from create-react-app

The following command will run the linter on your code base. This task is ran at pre-commit to ensure code quality.

```shell
npm run lint
```

## Prettier

Prettier is a great tool that enforces a consistent style accross your code base (usefull when working in teams).

[Here is how to integrate it with your editor](https://prettier.io/docs/en/editors.html).

Once it's done, when you'll save a file, it will reformat it.

The following command will let you format your code base. This task is ran at pre-commit.

```shell
npm run pretty
```

## Commit guidelines

To have uniform commit messages, I follow the [AngularJS git commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines), please take a look at it. I helps generate changelogs:

```shell
npm run generate-changelog -- v1.1.0 v1.2.0
```

## Continuous Integration (CI)

This part is optional. A [.travis.yml](.travis.yml) file is ready to use.

Each `git push` triggers a test suite on [travis](https://travis-ci.org/topheman/react-fiber-experiments). The following will be ran:

- linting
- unit tests

One of the following npm task will take care of the testing according of the commit:

- For PRs: `npm run test:travis:pr` Travis CI doesn't share env vars on PR builds (this is so that your build would not fail if you were using those vars)
- For other types of commits: `npm run test:travis`

## Deploy

You can use github-pages to host your project. All you need to do is to push your build on a `gh-pages` orphan branch, your project will be accessible at `https://<owner>.github.io/<repo>`.

This task can be automated using the [gh-pages](https://www.npmjs.com/package/gh-pages) package, as specified in the [CRA Readme](README.cra.md#github-pages). This task is already setup. All you have to do is:

```shell
npm run deploy
```

The demo of this website is hosted at [topheman.github.io/react-fiber-experiments](https://topheman.github.io/react-fiber-experiments/).
