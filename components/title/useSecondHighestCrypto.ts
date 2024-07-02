import { parseCryptocurrencies } from '~/resources/cryptocurrencies/parse'
import type { Cryptocurrency } from '~/resources/cryptocurrencies/types/internal'

export const useSecondHighestCrypto = async () => {
  const { data: cryptocurrenciesResponse, ...rest } = await useFetch('/api/cryptocurrencies', {
    method: 'GET',
    query: {
      sort: 'market_cap',
      sort_dir: 'desc',
    },
  })

  if (!cryptocurrenciesResponse.value) return {
    ...rest,
    data: ref<Cryptocurrency | null>(null),
  }

  const parsedCryptocurrencies = parseCryptocurrencies(cryptocurrenciesResponse.value)

  const secondHighestCryptocurrency = parsedCryptocurrencies[1] ?? null

  return {
    ...rest,
    data: ref<Cryptocurrency | null>(secondHighestCryptocurrency),
  }
}
