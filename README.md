# Monsoon React components

#### A collection of React.js components, intended to be consumed via npm, that may be shared across multiple apps.

##### Once started, the guide on the home page will instruct you on how to add components and include them in your React App.

-------

To Install:

  `git clone https://github.com/monsooncommerce/monsoon-react-components.git`
  
  `npm i`

To Run with webpack-dev-server:

  `npm start`

To Build:

  `npm run build`

NOTE: The default setting is to watch the files and build once a change has been saved.
this is very useful for local development within another app.

To Develop locally within another app:
  1. In the monoon-react-components:

    `npm link`

  2. In the app you require components in:

    `npm link @monsoon_inc/monsoon-components`

  3. Remember to the dev server in the other app
  4. Remember to run `npm start` and `npm build` when connecting to another app
