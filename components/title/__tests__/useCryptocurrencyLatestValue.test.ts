import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { useCryptocurrencyLatestValue } from '../useCryptocurrencyLatestValue'
import type { CryptocurrencyQuote } from '~/resources/cryptocurrencies-quotes/types/internal'

vi.mock('~/store/cryptocurrencyValue', () => ({
  useCryptoValueStorage: vi.fn(() => ({
    get: vi.fn().mockReturnValue(100),
    set: vi.fn(),
  })),
}))

const buildMockCryptocurrencyWithPrice = (price: number): CryptocurrencyQuote => ({
  slug: 'bitcoin',
  quote: {
    USD: {
      price,
      fully_diluted_market_cap: 0,
      last_updated: '2021-09-30T00:00:00Z',
      market_cap: 0,
      market_cap_dominance: 0,
      percent_change_1h: 0,
      percent_change_24h: 0,
      percent_change_7d: 0,
      volume_24h: 0,
      volume_change_24h: 0,
    },
  },
  circulating_supply: 0,
  cmc_rank: 0,
  date_added: '2021-09-30T00:00:00Z',
  id: 0,
  is_active: 0,
  is_fiat: 0,
  last_updated: '2021-09-30T00:00:00Z',
  max_supply: 0,
  name: 'Bitcoin',
  num_market_pairs: 0,
  symbol: 'BTC',
  tags: [],
  total_supply: 0,
})

describe('useCryptocurrencyLatestValue', () => {
  it('should return false for isCryptoValueUpdated when cryptocurrency is null', () => {
    const cryptocurrency = ref(null)
    const { isCryptoValueUpdated } = useCryptocurrencyLatestValue(cryptocurrency)
    expect(isCryptoValueUpdated.value).toBe(false)
  })

  it('should correctly compute isCryptoValueUpdated to true when values differ', () => {
    const cryptocurrency = ref<CryptocurrencyQuote>(
      buildMockCryptocurrencyWithPrice(200), // Different from mocked storage value
    )
    const { isCryptoValueUpdated } = useCryptocurrencyLatestValue(cryptocurrency)
    expect(isCryptoValueUpdated.value).toBe(true)
  })

  it('should correctly compute isCryptoValueUpdated to false when values are the same', () => {
    const cryptocurrency = ref(
      buildMockCryptocurrencyWithPrice(100), // Same as mocked storage value
    )
    const { isCryptoValueUpdated } = useCryptocurrencyLatestValue(cryptocurrency)
    expect(isCryptoValueUpdated.value).toBe(false)
  })
})
