import * as fs from 'fs'
import * as yaml from 'js-yaml'

export default {
  head: {
    title: 'Ryan Achten',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Portfolio site of Ryan Achten, software engineer and designer.',
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/open-graph/og-cropped.jpg',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '/open-graph/og-cropped.jpg',
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        type: 'image/png',
        href: '/favicon/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
        href: '/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        href: '/favicon/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/favicon/site.webmanifest',
      },
      {
        rel: 'msapplication-config',
        href: '/favicon/browserconfig.xml',
      },
      {
        rel: 'theme-color',
        content: '#E2E2E2',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
    ],
  },

  // Global styles
  css: ['~/styles/global.scss'],
  styleResources: {
    scss: ['~/styles/main.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxt/content'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    modern: true,
    transpile: ['three'],
    extend(config) {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader'],
      })
    },
  },

  generate: {
    routes() {
      // Crawler doesn't seem to pick up all the projects
      // so we need to request them to be generated explicitly
      const yamlFile = yaml.load(
        fs.readFileSync(`./content/projects/index.yml`, 'utf8')
      )
      const projects = yamlFile.projects
      return projects.map((p) => `/projects/${p.name.toLowerCase()}`)
    },
  },

  target: 'static',

  server: {
    port: 8000,
  },

  googleFonts: {
    display: 'swap',
    families: {
      Lato: true,
      Philosopher: [400, 700],
      'Material Icons': true,
    },
  },
}
