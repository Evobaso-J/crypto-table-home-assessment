import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify, type VuetifyOptions } from 'vuetify'

const vuetifyOptions: VuetifyOptions = {
  ssr: true,
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify(vuetifyOptions)

  app.vueApp.use(vuetify)
})
