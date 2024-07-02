import type { ParseFunction } from '../types'
import type { CryptocurrencyListing } from './types/internal'
import type { CryptocurrencyListingResponse } from './types/response'

export const parseCryptocurrencyListings: ParseFunction<CryptocurrencyListing, CryptocurrencyListingResponse> = (response: CryptocurrencyListingResponse) =>
  response.data.map(cryptocurrencyListing => ({
    ...cryptocurrencyListing,
    quote: {
      USD: cryptocurrencyListing.quote.USD,
    },
  }))
