import type { CryptocurrencyResponse } from '~/types/resources/cryptocurrencies/response'

export default defineEventHandler(async (): Promise<CryptocurrencyResponse> => {
  const { cryptoApiKey } = useRuntimeConfig()
  return await $fetch<CryptocurrencyResponse>('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
    method: 'GET',
    headers: {
      'X-CMC_PRO_API_KEY': cryptoApiKey,
    },
  })
})
