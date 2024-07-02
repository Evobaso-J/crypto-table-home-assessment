import type { CryptocurrencyQuotePerCurrency } from '~/resources/cryptocurrencies-common'

export type CryptocurrencyQuote = {
  id: number
  name: string
  symbol: string
  slug: string
  is_active: number
  is_fiat: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  date_added: string
  num_market_pairs: number
  cmc_rank: number
  last_updated: string
  tags: string[]
  quote: Record<'USD', CryptocurrencyQuotePerCurrency | undefined>
}
