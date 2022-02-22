const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const config = {
  title: 'Developers',
  favicon: 'img/logo.svg',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  url: 'https://cdi-development.github.io',
  baseUrl: '/lodi-api-documentation/',
  organizationName: 'cdi-development', // Usually your GitHub org/user name.
  projectName: 'lodi-api-documentation', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Developers',
      logo: {
        alt: 'LODI',
        src: 'img/logo.svg',
      },
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()}`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};

module.exports = config;
