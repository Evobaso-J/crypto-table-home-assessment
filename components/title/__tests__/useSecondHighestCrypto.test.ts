import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useSecondHighestCrypto } from '../useSecondHighestCrypto'

const useFetchMock = vi.hoisted(() => vi.fn())
mockNuxtImport('useFetch', () => useFetchMock)

vi.mock('~/resources/cryptocurrencies-listings/parse', () => ({
  parseCryptocurrencyListings: vi.fn().mockImplementation(value => value),
}))

beforeEach(() => {
  vi.clearAllMocks()
})

describe('useSecondHighestCrypto', () => {
  it('should call useFetch sorting by marsket cap descending', async () => {
    useFetchMock.mockResolvedValueOnce({ data: ref([{ slug: 'bitcoin' }, { slug: 'ethereum' }]) })
    await useSecondHighestCrypto()
    expect(useFetchMock.mock.lastCall).toContainEqual({
      method: 'GET',
      query: {
        sort: 'market_cap',
        sort_dir: 'desc',
      },
    })
  })
  it('should return the second highest cryptocurrency by market cap on successful fetch', async () => {
    useFetchMock.mockResolvedValueOnce({ data: ref([{ slug: 'bitcoin' }, { slug: 'ethereum' }]) })
    const { data } = await useSecondHighestCrypto()
    expect(data.value).toEqual({ slug: 'ethereum' })
  })

  it('should return null when the fetched data contains less than two items', async () => {
    useFetchMock.mockResolvedValueOnce({ data: ref([{ slug: 'bitcoin' }]) })
    const { data } = await useSecondHighestCrypto()
    expect(data.value).toBeNull()
  })
})
