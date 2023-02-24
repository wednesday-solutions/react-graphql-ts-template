module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        shippedProposals: true,
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
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      '@emotion',
      {
        importMap: {
          '@mui/system': {
            styled: {
              canonicalImport: ['@emotion/styled', 'default'],
              styledBaseImport: ['@mui/system', 'styled']
            }
          },
          '@mui/material/styles': {
            styled: {
              canonicalImport: ['@emotion/styled', 'default'],
              styledBaseImport: ['@mui/material/styles', 'styled']
            }
          }
        }
      }
    ]
  ],
  env: {
    production: {
      only: ['app'],
      plugins: [
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-runtime',
        [
          'babel-plugin-import',
          {
            libraryName: '@mui/material',
            libraryDirectory: '',
            camel2DashComponentName: false
          },
          'core'
        ],
        [
          'babel-plugin-import',
          {
            libraryName: '@mui/icons-material',
            libraryDirectory: '',
            camel2DashComponentName: false
          },
          'icons'
        ]
      ]
    },
    dev: {
      plugins: [
        '@babel/plugin-transform-runtime',
        [
          'import',
          {
            libraryName: '@material-ui/core',
            libraryDirectory: '',
            camel2DashComponentName: false
          }
        ],
        [
          ('babel-plugin-import',
          {
            libraryName: '@mui/icons-material',
            libraryDirectory: '',
            camel2DashComponentName: false
          },
          'icons')
        ]
      ]
    },
    development: {
      plugins: [
        '@babel/plugin-transform-runtime',
        [
          'babel-plugin-import',
          {
            libraryName: '@mui/material',
            libraryDirectory: '',
            camel2DashComponentName: false
          },
          'core'
        ],
        [
          'babel-plugin-import',
          {
            libraryName: '@mui/icons-material',
            libraryDirectory: '',
            camel2DashComponentName: false
          },
          'icons'
        ]
      ]
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
        '@babel/plugin-transform-runtime',
        [
          'import',
          {
            libraryName: '@material-ui/core',
            libraryDirectory: '',
            camel2DashComponentName: false
          }
        ],
        [
          'babel-plugin-import',
          {
            libraryName: '@mui/icons-material',
            libraryDirectory: '',
            camel2DashComponentName: false
          },
          'icons'
        ],
        [
          '@emotion',
          {
            autoLabel: 'never'
          }
        ]
      ]
    }
  }
};
