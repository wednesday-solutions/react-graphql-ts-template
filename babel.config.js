module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 0.25%, not dead']
        },
        modules: false,
        corejs: '3.6.5',
        useBuiltIns: 'entry'
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-optional-chaining',
    'styled-components',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
        [
          'import',
          {
            libraryName: '@ant-design/icons',
            libraryDirectory: 'es/icons',
            camel2DashComponentName: false
          },
          '@ant-design/icons'
        ]
      ]
    },
    dev: {
      plugins: [['import', { libraryName: 'antd', style: true }]]
    },
    development: {
      plugins: [
        ['import', { libraryName: 'antd', style: true }],
        [
          'import',
          {
            libraryName: '@ant-design/icons',
            libraryDirectory: 'es/icons',
            camel2DashComponentName: false
          },
          '@ant-design/icons'
        ]
      ]
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
        ['import', { libraryName: 'antd', style: true }]
      ]
    }
  }
};
