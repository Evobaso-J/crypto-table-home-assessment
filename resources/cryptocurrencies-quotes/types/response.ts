import type { CryptocurrencyQuotePerCurrency, CryptocurrencyResponseStatus } from '~/resources/cryptocurrencies-common'

type CryptocurrencyQuoteResponseData = {
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
  platform: null
  self_reported_circulating_supply: null
  self_reported_market_cap: null
  quote: Record<string, CryptocurrencyQuotePerCurrency>
}

export type CryptocurrencyQuoteResponse = {
  data: Record<number, CryptocurrencyQuoteResponseData>
  status: CryptocurrencyResponseStatus
}
