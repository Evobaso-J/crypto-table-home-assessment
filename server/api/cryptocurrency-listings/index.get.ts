import type { CryptocurrencyListingResponse } from '~/resources/cryptocurrencies-listings/types/response'

export default defineEventHandler(async (event): Promise<CryptocurrencyListingResponse> => {
  const query = getQuery(event)
  const { cryptoApiKey } = useRuntimeConfig()
  return await $fetch<CryptocurrencyListingResponse>('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
    method: 'GET',
    headers: {
      'X-CMC_PRO_API_KEY': cryptoApiKey,
    },
    query,
  })
})
