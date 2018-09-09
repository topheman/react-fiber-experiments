# React custom build

To benefit from some specific features hidden behind flags (such as _suspense_), we need to make our own build of React from the sources.

## Make a custom React suspense build

As [explained here](https://github.com/facebook/react/tree/master/fixtures/unstable-async/suspense#readme):

### Generate the packages

Clone the React repository.

First, open this file locally:

- `packages/shared/ReactFeatureFlags.js` (make sure you didn't open a similarly named file!)

Set [the `enableSuspense` flag](https://github.com/facebook/react/blob/d79238f1eeb6634ba7a3df23c3b2709b56cbb8b2/packages/shared/ReactFeatureFlags.js#L19) to `true` and save the file.

Then build the packages:

```shell
cd /path/to/react
yarn
yarn build dom-client,core,simple-cache-provider,schedule --type=NODE
```

### Copy the packages to your project

```shell
cp -a /path/to/react/build/node_modules/* /path/to/react-fiber-experiments/react-modules/
```

## Note

The modules in `react-modules` are aliased, thanks to `react-app-rewired` with which I overrode `config.resolve`.
