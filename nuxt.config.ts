import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import glsl from 'vite-plugin-glsl'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Ryan Achten',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Portfolio site of Ryan Achten, software engineer and designer.',
        },
        { name: 'format-detection', content: 'telephone=no' },
        {
          property: 'og:image',
          content: '/open-graph/og-cropped.jpg',
        },
        {
          name: 'twitter:image',
          content: '/open-graph/og-cropped.jpg',
        },
        {
          name: 'theme-color',
          content: '#E2E2E2',
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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      ],
    },
  },

  css: ['~/styles/global.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/styles/main.scss" as *;',
        },
      },
    },
    plugins: [glsl()],
  },

  modules: ['@nuxt/content', '@nuxtjs/google-fonts'],

  content: {
    // Nuxt Content v2 configuration
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false,
    },
  },

  hooks: {
    async 'nitro:config'(nitroConfig) {
      // Generate project routes for prerendering
      const yamlFile: any = load(
        readFileSync('./content/projects/index.yml', 'utf8')
      )
      const projects = yamlFile.projects
      const routes = projects.map(
        (p: any) => `/projects/${p.name.toLowerCase()}`
      )
      nitroConfig.prerender!.routes!.push(...routes)
    },
  },

  devServer: {
    port: 8000,
  },

  typescript: {
    strict: true,
    shim: false,
  },

  build: {
    transpile: ['three'],
  },

  // Google Fonts configuration
  googleFonts: {
    families: {
      Lato: [400, 700],
      Philosopher: [400, 700],
      'Material Icons': true,
    },
    display: 'swap',
  },

  extends: [],
})
