# React custom build

To benefit from some specific features hidden behind flags (such as _suspense_), we need to make our own build of React from the sources.

## Make a custom React suspense build

As [explained here](https://github.com/facebook/react/tree/master/fixtures/unstable-async/suspense#readme):

### Generate the packages

Clone the React repository.

Build the packages:

```shell
cd /path/to/react
yarn
yarn build react-cache,scheduler --type=NODE
```

### Copy the packages to your project

```shell
cp -a /path/to/react/build/node_modules/* /path/to/react-fiber-experiments/react-modules/
```

## Note

The modules in `react-modules` are aliased, thanks to `react-app-rewired` with which I overrode `config.resolve`.

Please update the [`infos.json`](./infos.json) file with the exact hash of the git revision you used to make your React custom build.

In the current version, we use `react@16.7.0-alpha.0` and `react-dom@16.7.0-alpha.0` (installed from npm, not built from React sources).

If you need to also build `react` and `react-dom` packages, run:

```
yarn build dom-client,core,react-cache,scheduler --type=NODE
```