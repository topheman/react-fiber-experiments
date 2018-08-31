# my-react-app-starter

[![Build Status](https://travis-ci.org/topheman/my-react-app-starter.svg?branch=master)](https://travis-ci.org/topheman/my-react-app-starter)
[![Demo](https://img.shields.io/badge/demo-online-blue.svg)](https://topheman.github.io/my-react-app-starter/)

[create-react-app](https://github.com/facebook/create-react-app) is a great toolkit. It removes a lot of boilerplate to manage. Though, a few features are not shipped by default because each developer has different needs.

If you tend to use the same kind of configuration / devDependencies accross all of your create-react-app based projects, there isn't a perfect solution. This project is an attempt to fix this problem and share it with you.

## What's in it ?

I added the specific configuration / devDependencies I tend to use on my projects, such as:

* [9c0fa1b](https://github.com/topheman/my-react-app-starter/commit/9c0fa1b881decde46c11957b1e5cab3aeccc7d1c) eslint with advanced rules such as config-airbnb + prettier with precommit hook
* [b2a4026](https://github.com/topheman/my-react-app-starter/commit/b2a4026cd68704fccce7c294cee6067e5d098738) local test server
* [74d81b2](https://github.com/topheman/my-react-app-starter/commit/74d81b24456ec2d6d5ff786b64fc0bfbfe66b195) setup build metadatas in `index.html`
* [62fbc3a](https://github.com/topheman/my-react-app-starter/commit/62fbc3aababe8a91a9d380d4e8c8fa37ab3ce6fe) `generate-changelog` npm run task
* [f69bb96](https://github.com/topheman/my-react-app-starter/commit/f69bb969bb13c1e39444dbafca5306e4c6ed252a) setup default `.travis.yml`
* [0f2c3d6](https://github.com/topheman/my-react-app-starter/commit/0f2c3d6d0ddf5efe85925f996f9413dfd69cfa4f) add `deploy` task

Each feature added can be identified by its commit, if you want to repeat only one of the steps on your own project.

This configuration has been inspired by [topheman/npm-registry-browser](https://github.com/topheman/npm-registry-browser), a project where I use all of the above (and more).

**This remains an un-ejected create-react-app project, which means that you can:**

* update `react-scripts`
* customize or remove any of the features added

The [original CRA guidelines are still available here](README.cra.md)

## Prerequisites

* Nodejs v8
* npm v5

## Install

```shell
git clone https://github.com/topheman/my-react-app-starter.git
cd my-react-app-starter
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

* `npm run test:unit` : single run of the unit tests
* `npm run test:unit:watch` : run the unit tests in watch mode

### End to end

No end to end test configured yet.

## Linter

I use eslint to check the coding style, with the following presets:

* [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb): An advanced set of eslint rules for JavaScript and React made by Airbnb
* [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier): Turns off all rules that are unnecessary or might conflict with Prettier.
* [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app): Shipping preset from create-react-app

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

Each `git push` triggers a test suite on [travis](https://travis-ci.org/topheman/my-react-app-starter). The following will be ran:

* linting
* unit tests

One of the following npm task will take care of the testing according of the commit:

* For PRs: `npm run test:travis:pr` Travis CI doesn't share env vars on PR builds (this is so that your build would not fail if you were using those vars)
* For other types of commits: `npm run test:travis`

## Deploy

You can use github-pages to host your project. All you need to do is to push your build on a `gh-pages` orphan branch, your project will be accessible at `https://<owner>.github.io/<repo>`.

This task can be automated using the [gh-pages](https://www.npmjs.com/package/gh-pages) package, as specified in the [CRA Readme](README.cra.md#github-pages). This task is already setup. All you have to do is:

```shell
npm run deploy
```

The demo of this website is hosted at [topheman.github.io/my-react-app-starter](https://topheman.github.io/my-react-app-starter/).
