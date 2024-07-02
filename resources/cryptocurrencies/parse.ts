import type { ParseFunction } from '../types'
import type { Cryptocurrency } from './types/internal'
import type { CryptocurrencyResponse } from './types/response'

export const parseCryptocurrencies: ParseFunction<Cryptocurrency, CryptocurrencyResponse> = (response: CryptocurrencyResponse) => ({
  ...response.data.map(cryptocurrency => ({
    ...cryptocurrency,
    quote: {
      USD: cryptocurrency.quote.USD,
    },
  })),
})
