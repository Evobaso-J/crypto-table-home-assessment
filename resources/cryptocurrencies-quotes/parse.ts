import type { ParseFunction } from '../types'
import type { CryptocurrencyQuote } from './types/internal'
import type { CryptocurrencyQuoteResponse } from './types/response'

export const parseCryptocurrencyQuotes: ParseFunction<CryptocurrencyQuote, CryptocurrencyQuoteResponse> = (response: CryptocurrencyQuoteResponse) => Object.values(response.data).map<CryptocurrencyQuote>((quote) => {
  const { platform: _p, self_reported_circulating_supply: _srcs, self_reported_market_cap: _srmc, ...rest } = quote
  return ({
    ...rest,
    quote: {
      USD: quote.quote.USD,
    },
  })
})
