import type { CryptocurrencyQuote } from './internal'

type CryptocurrencyQuoteResponse = CryptocurrencyQuote

type CryptocurrencyResponseStatus = {
  timestamp: string
  error_code: number
  error_message: string
  elapsed: number
  credit_count: number
}

type CryptocurrencyResponseData = {
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
  quote: Record<string, CryptocurrencyQuoteResponse>
}

export type CryptocurrencyResponse = {
  data: CryptocurrencyResponseData[]
  status: CryptocurrencyResponseStatus
}
