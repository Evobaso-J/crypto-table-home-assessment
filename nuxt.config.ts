import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    cryptoApiKey: '',
  },
  typescript: {
    typeCheck: true,
  },

  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/eslint',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error required to install vuetify on nuxt https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  eslint: {
    config: {
      stylistic: true,
    },
    checker: true,
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  ssr: true,
})
