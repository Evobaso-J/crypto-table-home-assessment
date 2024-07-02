import { parseCryptocurrencyQuotes } from '~/resources/cryptocurrencies-quotes/parse'
import type { CryptocurrencyQuote } from '~/resources/cryptocurrencies-quotes/types/internal'

export const useBitcoinValue = async () => {
  const { data: cryptocurrencyQuotesResponse, ...rest } = await useFetch('/api/cryptocurrency-quotes', {
    method: 'GET',
    query: {
      slug: 'bitcoin',
    },
  })

  if (!cryptocurrencyQuotesResponse.value) return {
    ...rest,
    data: ref<null>(null),
  }

  const parsedCryptocurrencyQuotes = parseCryptocurrencyQuotes(cryptocurrencyQuotesResponse.value)

  const bitcoin = parsedCryptocurrencyQuotes.find(quote => quote.slug === 'bitcoin') ?? null
  return {
    ...rest,
    data: ref<CryptocurrencyQuote | null>(bitcoin),
  }
}
