import { parseCryptocurrencyQuotes } from '~/resources/cryptocurrencies-quotes/parse'
import type { CryptocurrencyQuote } from '~/resources/cryptocurrencies-quotes/types/internal'

/**
 * Wrapper around useFetch to fetch Bitcoin value from the API.
 *
 * - Asynchronously requests the current Bitcoin value
 * - If the Bitcoin quote is not found, it returns null
 * - Otherwise, the response is parsed and returned with the useFetch state utilities
 *
 * @example
 * // Assuming the API returns a valid response for Bitcoin quotes
 * const { data, ...rest } = await useBitcoinValue();
 * if (data.value) {
 *   console.log('Bitcoin value:', data.value);
 * } else {
 *   console.log('Bitcoin value not found');
 * }
 */
export const useBitcoinValue = async () => {
  const { data: cryptocurrencyQuotesResponse, ...rest } = await useFetch('/api/cryptocurrency-quotes', {
    method: 'GET',
    query: {
      slug: 'bitcoin',
    },
    lazy: true,
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
