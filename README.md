# React HK Components

Reusable React components. A sister library of [ember-hk-components](https://github.com/heroku/ember-hk-components).


## Assumptions

Usage of these components assumes you are using the [Purple3 CSS framework](https://purple3.herokuapp.com/) and [Malibu](https://hk-malibu.herokuapp.com).


## Usage

### Installation

`yarn add @heroku/react-hk-components`

### Components

See [react-hk-components.herokuapp.com](https://react-hk-components.herokuapp.com)
for a complete list of components that are available.


## Development

### Installation

* `git clone https://github.com/heroku/react-hk-components`
* `cd react-hk-components`
* `yarn`

### Running

* `yarn storybook`
* Visit your app at [http://localhost:9001](http://localhost:9001).

### Local Usage in Another Application

The demo app is useful for developing this addon, but it can often be
helpful to consume your version of this addon in another application
either to more easily develop your changes or to validate that your
changes work as you expect.  You can use your local version of
`react-hk-components` in another application that consumes it via
yarn's [link](https://yarnpkg.com/lang/en/docs/cli/link/) command.

```console
# in your react-hk-components directory
$ yarn link

# in your consuming app directory
$ yarn link @heroku/react-hk-components
```

Now, when you make changes in your copy of `react-hk-components` those
changes will be reflected in the consuming application.


### Demo app

This repo can be deployed to Heroku as a demo app using
[Storybook](https://storybook.js.org/).

```sh
heroku create
# ensure that heroku installs the dev dependency storybook
heroku config:set NPM_CONFIG_PRODUCTION=false
git push heroku master
```

### Releasing

Unfortunately, releasing is a bit of a mess right now because the different
pieces don't play together nicely. Specifically, [`yarn publish` doesn't support
NPM's 2FA yet (yarn/#4904)](https://github.com/yarnpkg/yarn/issues/4904).

#### Setup (one time)

1. Make sure you have a late-model npm installed that supports 2FA:
   `npm install -g npm`
2. Install `np` globally using npm: `npm install -g np`

#### Release

Because `yarn publish` doesn't support 2FA, we will have to invoke `np` with the
`--no-yarn` option. This is a bit unfortunate because `np` is actually doing its
sanity checks using `npm`, which might result in different behavior compared to
`yarn`. Because of this, we should manually run the test suite ourselves ahead
of `np` until such time as yarn gets unbroken.

1. `rm -rf node_modules`
2. `yarn`
3. `yarn test`. No errors? Lovely, proceed.
4. When you're ready to publish, `np --no-yarn`.

