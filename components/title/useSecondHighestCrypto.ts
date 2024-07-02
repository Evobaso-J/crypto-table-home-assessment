import { parseCryptocurrencyListings } from '~/resources/cryptocurrencies-listings/parse'
import type { CryptocurrencyListing } from '~/resources/cryptocurrencies-listings/types/internal'

export const useSecondHighestCrypto = async () => {
  const { data: cryptocurrenciesResponse, ...rest } = await useFetch('/api/cryptocurrency-listings', {
    method: 'GET',
    query: {
      sort: 'market_cap',
      sort_dir: 'desc',
    },
  })

  if (!cryptocurrenciesResponse.value) return {
    ...rest,
    data: ref<CryptocurrencyListing | null>(null),
  }

  const parsedCryptocurrencies = parseCryptocurrencyListings(cryptocurrenciesResponse.value)

  const secondHighestCryptocurrency = parsedCryptocurrencies[1] ?? null

  return {
    ...rest,
    data: ref<CryptocurrencyListing | null>(secondHighestCryptocurrency),
  }
}
