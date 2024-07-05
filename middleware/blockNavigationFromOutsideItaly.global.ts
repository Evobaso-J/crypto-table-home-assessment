export default defineNuxtRouteMiddleware(() => {
  const { data } = useFetch('http://ip-api.com/json/24.48.0.1', {
    method: 'GET',
    query: {
      fields: 'countryCode',
    },
  })
  if (data.value !== 'SE') {
    return abortNavigation('Devi essere in Italia per accedere a questa pagina')
  }
})
