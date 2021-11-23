# jest-environment-jsdom-sixteen

[Jest](https://jestjs.io) v25 by default uses [JSDOM](https://github.com/jsdom/jsdom) 15 to support Node 8. This package should also be compatible with Jest 24 and earlier.

This package comes with JSDOM v16, which also enables support for [V8 code coverage](https://jestjs.io/docs/configuration#coverageprovider-string).

If you need a newer JSDOM than the one that ships with Jest, install this package using `npm install --save-dev jest-environment-jsdom-sixteen` or `yarn add jest-environment-jsdom-sixteen --dev`, and edit your Jest config like so:

```json
{
  "testEnvironment": "jest-environment-jsdom-sixteen"
}
```
