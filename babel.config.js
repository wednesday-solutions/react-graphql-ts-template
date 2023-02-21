module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 0.25%, not dead']
        },
        corejs: 3,
        useBuiltIns: 'usage'
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: ['@babel/transform-runtime', '@babel/plugin-syntax-optional-chaining', 'styled-components'],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements'
      ]
    },
    dev: {},
    development: {},
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs', 'dynamic-import-node']
    }
  }
};
