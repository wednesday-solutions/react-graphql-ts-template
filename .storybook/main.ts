import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@bumped-inc/storybook-addon-lingui-v3',
    '@storybook/addon-docs',
    '@storybook/addon-controls'
  ],
  docs: {
    autodocs: true
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  core: {
    builder: '@storybook/builder-webpack5'
  },
  stories: ['../app/components/**/stories/**/*.mdx', '../app/components/**/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)']
};
export default config;
