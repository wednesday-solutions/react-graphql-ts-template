<img align="left" src="https://github.com/wednesday-solutions/react-graphql-ts-template/blob/master/react-graphql-template.png" width="420" />

<div>
  <a href="https://www.wednesday.is?utm_source=gthb&utm_medium=repo&utm_campaign=serverless" align="left" style="margin-left: 0;">
    <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f5879492fafecdb3e5b0e75_wednesday_logo.svg">
  </a>
  <p>
    <h3 align="left">React GraphQL TypeScript Template</h3>
  </p>

  <p>
An enterprise react template application showcasing - Testing strategies, Global state management, middleware support, a network layer, component library integration, localization, PWA support, route configuration, lazy loading, and Continuous integration & deployment.
  </p>

---

  <p>
    <h4>
      Expert teams of digital product strategists, developers, and designers.
    </h4>
  </p>

  <div>
    <a href="https://www.wednesday.is/contact-us?utm_source=gthb&utm_medium=repo&utm_campaign=serverless" target="_blank">
      <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f6ae88b9005f9ed382fb2a5_button_get_in_touch.svg" width="121" height="34">
    </a>
    <a href="https://github.com/wednesday-solutions/" target="_blank">
      <img src="https://uploads-ssl.webflow.com/5ee36ce1473112550f1e1739/5f6ae88bb1958c3253756c39_button_follow_on_github.svg" width="168" height="34">
    </a>
  </div>

---

</div>

![React GraphQL TS Template CD](https://github.com/wednesday-solutions/react-graphql-ts-template/workflows/React%20GraphQL%20TypeScript%20Template%20CD/badge.svg)

<div>
<img src='./badges/badge-statements.svg' height="20"/>
<img src='./badges/badge-branches.svg' height="20"/>
</div>
<div>
<img src='./badges/badge-lines.svg'  height="20"/>
<img src='./badges/badge-functions.svg' height="20"/>
</div>

## Getting Started

- Install dependencies using `yarn install`

- Start the dev server using `yarn start`

- Go through the other scripts in `package.json`

## TypeScript Configuration

- Typescript Configuration using [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

  Take a look at the following files

  - [app/tsconfig.json](app/tsconfig.json)

## Global state management using @redux/toolkit

- Global state management using [Redux Toolkit](https://github.com/reduxjs/redux-toolkit)

  Take a look at the following files

  - [app/containers/HomeContainer/reducer.ts](app/containers/HomeContainer/reducer.ts)
  - [app/containers/HomeContainer/index.tsx](app/containers/HomeContainer/index.tsx)

- Computing and getting state from the redux store using [Reselect](https://github.com/reduxjs/reselect)

  Take a look at the following files

  - [app/containers/HomeContainer/selectors.ts](app/containers/HomeContainer/selectors.ts)

## Implementing a Redux middleware using redux-sagas

- Side effects using [Redux Saga](https://github.com/redux-saga/redux-saga)

  Take a look at the following files

  - [app/containers/HomeContainer/saga.ts](app/containers/HomeContainer/saga.ts)
  - [app/containers/HomeContainer/index.tsx](app/containers/HomeContainer/index.tsx)

## Network requests using apisauce

- API calls using [Api Sauce](https://github.com/infinitered/apisauce/)

  Take a look at the following files

  - [app/utils/apiUtils.ts](app/utils/apiUtils.ts)

## GraphQL requests using Apollo Boost

- GraphQL queries using [Apollo Boost](https://www.npmjs.com/package/apollo-boost)

  Take a look at the following files

  - [app/utils/graphqlUtils.ts](app/utils/graphqlUtils.ts)
  - [app/containers/HomeContainer/saga.ts](app/containers/HomeContainer/saga.ts)

## Styling using styled-components

- Styling components using [Styled Components](https://styled-components.com)

  Take a look at the following files

  - [app/components/T/index.tsx](app/components/T/index.tsx)
  - [app/containers/HomeContainer/index.tsx](app/containers/HomeContainer/index.tsx)

## Using antd as the component library

- Reusing components from [Ant design](https://ant.design)

  Take a look at the following files

  - [app/containers/HomeContainer/index.tsx](app/containers/HomeContainer/index.tsx)

## Localization using react-intl

- Translations using [React Intl](https://github.com/formatjs/react-intl)

  Take a look at the following files

  - [app/translations/en.json](app/translations/en.json)
  - [app/containers/LanguageProvider/](app/containers/LanguageProvider/)
  - [app/i18n](app/i18n.ts)

## Routing using react-router

- Routing is done using [React Router](https://github.com/ReactTraining/react-router)

  Take a look at the following files

  - [app/routeConfig.ts](app/routeConfig.ts)
  - [app/containers/App/index.tsx](app/containers/App/index.tsx)

## Creating and showcasing components individually and in isolation using Storybooks

- Storybooks allows you to work on one component at a time. You can develop entire UIs without needing to start up a complex dev stack, force certain data into your database, or navigate around your application.

  Take a look at the following files

  - [.storybook/webpack.config.js](.storybook/webpack.config.js)
  - [.storybook/config.js](.storybook/config.js)
  - [.storybook/addons.js](.storybook/addons.js)
  - [app/components/Clickable/stories/Clickable.stories.js](app/components/Clickable/stories/Clickable.stories.js)

## Bundling your application using Webpack

- We're using and configuring webpack to bundle our React application.

  Take a look at the following files

  - [internals/webpack/webpack.config.base.js](internals/webpack/webpack.config.base.js)
  - [internals/webpack/webpack.config.dev.js](internals/webpack/webpack.config.dev.js)
  - [internals/webpack/webpack.config.prod.js](internals/webpack/webpack.config.prod.js)

## Analyzing the bundle size using webpack-bundle-analyzer

- The size of the bundle is analyzed using the webpack-bundle-analyzer to make sure that the bundle is lean and optimized.

  Take a look at the following files

  - [internals/webpack/webpack.config.dev.js](internals/webpack/webpack.config.dev.js)

## Implementing CI/CD pipelines using Github Actions

- CI/CD using Github Actions.
  The CI pipeline has the following phases

  - Checkout
  - Install dependencies
  - Lint
  - Test
  - Build

  The CD pipeline has the following phases

  - Checkout
  - Install dependencies
  - Build
  - Deploy

  Take a look at the following files

  - [.github/workflows/ci.yml](.github/workflows/ci.yml)
  - [.github/workflows/cd.yml](.github/workflows/cd.yml)

## Testing using @testing-library/react

- Testing is done using the @testing-library/react.

  Take a look at the following files

  - [jest.config.json](jest.config.json)
  - [jest.setup.js](jest.setup.js)
  - [app/containers/HomeContainer/tests](app/containers/HomeContainer/tests)
  - [app/services/tests/repoApi.test.ts](app/services/tests/repoApi.test.ts)
  - [app/components/T/tests/index.test.tsx](app/components/T/tests/index.test.tsx)


## Misc

### Aliasing

- @app -> app/
- @containers -> app/containers/
- @components -> app/components/
- @services -> app/services/
- @utils -> app/utils/
- @themes -> app/themes
- @images -> app/images

Take a look at the following files

- [internals/webpack/webpack.config.base.js](internals/webpack/webpack.config.base.js)
- [app/tsconfig.json](app/tsconfig.json)
- [jest.config.json](jest.config.json)

### Chunkify and Lazy loading

Take a look at the following files

- [app/containers/HomeContainer/Loadable.ts](app/containers/HomeContainer/Loadable.ts)
- [app/utils/loadable.ts](app/utils/loadable.ts)

### App entry point

- [app/app.ts](app/app.ts)

### PWA

- [Offline Plugin](https://github.com/NekR/offline-plugin)
- [Webpack PWA Manifest](https://github.com/arthurbergmz/webpack-pwa-manifest)

Take a look at the following files

- [app/app.tsx](app/app.ts)
- [internals/webpack/webpack.config.prod.js](internals/webpack/webpack.config.prod.js)

## Syntax for adding commit messages

Your commit messages have to be in this format:

```
type(category): description [flags]
```

Where `type` is one of the following:

- `build`
- `docs`
- `feat`
- `fix`
- `others`
- `perf`
- `refactor`
- `style`
- `test`
- `chore`
- `ci`
- `temp`
  Where `flags` is an optional comma-separated list of one or more of the following (must be surrounded in square brackets):
- `breaking`: alters `type` to be a breaking change
  And `category` can be anything of your choice. If you use a type not found in the list (but it still follows the same format of the message), it'll be grouped under `other`.

## Auto release

- Each push into `qa` branch will produce a beta release
- Each push into `master` branch will produce a prod release

  Take a look at the following files

- [.github/workflows/beta-release.yml](.github/workflows/beta-release.yml)
- [.github/workflows/prod-release.yml](.github/workflows/prod-release.yml)
