import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useStorage } from '@vueuse/core'
import { useCryptoValueStorage } from '~/store/cryptocurrencyValue'

const useStorageMock = vi.hoisted(() => vi.fn())
vi.mock('@vueuse/core', () => ({
  useStorage: useStorageMock,
}))

describe('useCryptoValueStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize storage with null value', () => {
    const storageKey = 'bitcoin'
    useCryptoValueStorage(storageKey)
    expect(useStorage).toHaveBeenCalledWith(`__cryptocurrency-${storageKey}`, ref(null))
  })

  it('should return the current value when get is called', () => {
    useStorageMock.mockReturnValueOnce(ref(null))
    const storageKey = 'ethereum'
    const { get } = useCryptoValueStorage(storageKey)
    expect(get()).toBeNull() // Assuming initial value is null
  })

  it('should update the value when set is called', () => {
    useStorageMock.mockReturnValueOnce(ref(50000))
    const storageKey = 'bitcoin'
    const { set, get } = useCryptoValueStorage(storageKey)
    set(50000)
    expect(get()).toBe(50000)
  })
})
