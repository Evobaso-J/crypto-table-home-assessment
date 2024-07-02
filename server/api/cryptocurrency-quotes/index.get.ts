import type { CryptocurrencyQuoteResponse } from '~/resources/cryptocurrencies-quotes/types/response'

export default defineEventHandler(async (event): Promise<CryptocurrencyQuoteResponse> => {
  const query = getQuery(event)
  const { cryptoApiKey } = useRuntimeConfig()
  return await $fetch<CryptocurrencyQuoteResponse>('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
    method: 'GET',
    headers: {
      'X-CMC_PRO_API_KEY': cryptoApiKey,
    },
    query,
  })
})
