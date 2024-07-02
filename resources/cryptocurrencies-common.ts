export type CryptocurrencyResponseStatus = {
  timestamp: string
  error_code: number
  error_message: string
  elapsed: number
  credit_count: number
}

export type CryptocurrencyQuotePerCurrency = {
  price: number
  volume_24h: number
  volume_change_24h: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  market_cap: number
  market_cap_dominance: number
  fully_diluted_market_cap: number
  last_updated: string
}
