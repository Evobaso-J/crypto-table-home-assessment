export default defineEventHandler(async () => {
  const { cryptoApiKey } = useRuntimeConfig()
  return await $fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
    method: 'GET',
    headers: {
      'X-CMC_PRO_API_KEY': cryptoApiKey,
    },
  })
})
