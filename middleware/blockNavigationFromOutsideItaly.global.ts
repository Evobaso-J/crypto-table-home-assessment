export default defineNuxtRouteMiddleware(() => {
  const { data: _ } = useFetch('http://ip-api.com/json', {
    method: 'GET',
    query: {
      fields: 'countryCode',
    },
  })
  // if (data.value !== 'IT') {
  //   return abortNavigation('Devi essere in Italia per accedere a questa pagina')
  // }
})
