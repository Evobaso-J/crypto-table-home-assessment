import type { CryptocurrencyResponse } from '~/resources/cryptocurrencies/types/response'

export default defineEventHandler(async (event): Promise<CryptocurrencyResponse> => {
  const query = getQuery(event)
  const { cryptoApiKey } = useRuntimeConfig()
  return await $fetch<CryptocurrencyResponse>('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
    method: 'GET',
    headers: {
      'X-CMC_PRO_API_KEY': cryptoApiKey,
    },
    query,
  })
})
