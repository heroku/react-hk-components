# React HK Components

Reusable React components. A sister library of [ember-hk-components](https://github.com/heroku/ember-hk-components).


## Assumptions

Usage of these components assumes you are using the [Purple3 CSS framework](https://purple3.herokuapp.com/) and [Malibu](https://hk-malibu.herokuapp.com).


## Usage

### Installation

`yarn add @heroku/react-hk-components`

If you want to use `HKFlagIcon`, you will need to tell Webpack to copy the flag images into a directory that is served up by your app:

```js
  // somewhere in your webpack config...
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'node_modules/@heroku/react-hk-components/dist/flags',
        to: 'flags', // this is relative to your the outputPath you configured in webpack
      }
    ]),
  ],
```

`<HKFlagIcon>` defaults to loading the flag images from `/static/dist/flags`, but if you have a different base path to the flag images, you'll need to pass it as a prop like `<HKFlagIcon basePath='/foo/bar/flags' region='europe' />`.


### Components

See [react-hk-components.herokuapp.com](https://react-hk-components.herokuapp.com)
for a complete list of components that are available.

#### HKModal

The HKModal component displays modal dialogs of two kinds: normal, which appear in the middle of the browser viewport, and flyout, which slides in from the right. It takes the following props:

* **`isFlyout`**: `boolean?`. Defaults to false.
* **`show`**: `boolean`. Set it to `true` in order to trigger display of the modal, or `false` to trigger hiding.
* **`type`**: `string?`. Set to `destructive` if you want the title of the modal to be rendered in red.
* **`onDismiss`**: `(value?: string) => any`. A handler that is invoked with the close value when the modal is dismissed. Closing the modal by clicking outside the modal or by clicking on the X at the top-right of the modal will result in the handler being invoked with a value of `cancel`.
* **`header`**: JSX element. What is rendered in the header of the modal.
* **`buttons`**: `IButtonDefinition[]?`: an optional array of button definitions. These will be rendered left-to-right as buttons in the footer of the modal.

The contents of the modal are the children passed in the body of the react element, e.g. `<HKModal> stuff to render in body of modal </HKModal>`

Buttons are defined as follows:

* **`text`**: `string`. The text on the button
* **`type`**: `Button.Type`. Primary, secondary, danger, etc.
* **`disabled`**: `boolean`. Set to `true` if you want the button disabled.
* **`value`**: `string`. The value associated with the button. This is what will be remitted to the `onDismiss` handler when the user closes the modal by clicking on this button.

So here's a working example:

```tsx
public class MyModalWrapper extends React.Component {
  handleDismiss = (value?: string): any => {
    switch(value) {
      case 'ok':
        // handle the OK case
        break
      case cancel:
      default:
        // handle the cancel case, which is also the default
    }
  }
  public render() {
    return (<HKModal
      isFlyout={false}
      show={true}
      onDismiss={this.handleDismiss}
      header={<div>My Modal</div>}
      buttons={[
        {text: 'cancel', value: 'cancel', type: 'tertiary'},
        {text: 'OK', value: 'ok', type: 'primary'},
      ]}
    >
      <div>Look at my shiny modal content!</div>
      <p>Such shiny. Much wow.</p>
    </HKModal>)    
  }
}



```

#### HKDropdown

The HKDropdown component consists of a HKButton that toggles the display of it's dropdown contents. It takes the following props:

* **`align`**: `Align?`. Aligns dropdown menu anchoring left or right side of dropdown button. Options are `left` or `right`. Defaults to `left`.
* **`className`**: `string?`. Styling for the dropdown button.
* **`closeOnClick`**: `boolean?`. Specifies whether the dropdown menu should toggle to close after clicking inside the dropdown menu. Defaults to `true`
* **`contentClassName`**: `string?`. Styling for the dropdown menu.
* **`disabled`**: `boolean?`: disables the button from toggling the dropdown menu. Defaults to `false`
* **`name`**: `string?`: name of the dropdown, used for testing for `data-testid`. Defaults to `hkdropdown`.
* **`title`**: `string?`: The title of the dropdown button.

The contents of the dropdown menu are the children passed in the body of the react element, e.g. `<HKDropdown> stuff to render inside dropdown menu </HKDropdown>`

Best practices for content in dropdown menu:

* Each dropdown menu item should have the class `hk-dropdown-item`
* Thematic breaks between elements (i.e. separators) should be used with `<li className='hk-dropdown-divider' />`
* Dangerous menu items should have the class `hk-dropdown-item--danger`

Refer to the stories for examples.

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

# You will need to re-run yarn in your consuming app directory and restart your app
$ yarn
```

You can check the success of linking in your consuming app
`ls -l node_modules/@heroku/react-hk-components`
which should return a symlink to your development copy of rhkc

Now, when you make changes in your copy of `react-hk-components` those
changes will be reflected in the consuming application.

Caveats when linking - you will need to rebuild each time you want to see
changes in your consuming app directory.
`yarn build`

To simplify, you can install [watch](https://www.npmjs.com/package/watch#cli) or a similar tool and run `watch 'yarn run build' src` in `react-hk-components`.
This will rebuild the bundled version that your consuming app directory
pulls in whenever you make changes in rhkc.

Remember to unlink rhkc once finished.

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

#### Setup (one time)

1. Install `np` globally using npm: `npm install -g np`

#### Release

1. `rm -rf node_modules`
2. `yarn`
3. `yarn test`. No errors? Lovely, proceed.
4. When you're ready to publish, `np`.
