import type { CryptocurrencyQuotePerCurrency } from '~/resources/cryptocurrencies-common'

export type CryptocurrencyListing = {
  id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number
  num_market_pairs: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  infinite_supply: boolean
  last_updated: string
  date_added: string
  tags: string[]
  platform: null
  self_reported_circulating_supply: null
  self_reported_market_cap: null
  quote: Record<'USD', CryptocurrencyQuotePerCurrency | undefined>
}
