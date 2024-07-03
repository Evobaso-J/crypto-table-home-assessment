import { describe, it, expect, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useBitcoinValue } from '../useBitcoinValue'

const useFetchMock = vi.hoisted(() => vi.fn())
mockNuxtImport('useFetch', () => useFetchMock)

vi.mock('~/resources/cryptocurrencies-quotes/parse', () => ({
  parseCryptocurrencyQuotes: vi.fn().mockImplementation(value => value),
}))

describe('useBitcoinValue', () => {
  it('should return null data if the cryptocurrency quotes response does not contain a \'value\' property', async () => {
    useFetchMock.mockResolvedValueOnce({ data: ref(null) })
    const { data } = await useBitcoinValue()
    expect(data.value).toBeNull()
  })

  it('should return null data if the bitcoin quote is not found in the cryptocurrency quotes', async () => {
    useFetchMock.mockResolvedValueOnce({ data: ref([{ slug: 'ethereum' }]) })
    const { data } = await useBitcoinValue()
    expect(data.value).toBeNull()
  })

  it('should return the bitcoin quote if found in the cryptocurrency quotes', async () => {
    useFetchMock.mockResolvedValueOnce({ data: ref([{ slug: 'bitcoin' }]) })
    const { data } = await useBitcoinValue()
    expect(data.value).toEqual({ slug: 'bitcoin' })
  })
})
