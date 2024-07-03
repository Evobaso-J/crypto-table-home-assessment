import type { CryptocurrencyQuote } from '~/resources/cryptocurrencies-quotes/types/internal'
import { useCryptoValueStorage } from '~/store/cryptocurrencyValue'

/**
 * Manages and tracks the latest value of a specified cryptocurrency.
 * The function also provides a reactive computed property to indicate whether the stored value has been updated compared to the
 * latest fetched value.
 *
 * @param {Ref<CryptocurrencyQuote | null>} cryptocurrency - A Vue ref object containing the current cryptocurrency data, or null if not set.
 * @returns {object} An object containing:
 * - isCryptoValueUpdated: A Vue computed property that returns true if the stored cryptocurrency value differs from the latest fetched value.
 */
export const useCryptocurrencyLatestValue = (cryptocurrency: Ref<CryptocurrencyQuote | null>) => {
  if (!cryptocurrency.value) return {
    isCryptoValueUpdated: computed(() => false),
  }
  const { get: getLatestBitcoinValue, set: setLatestBitcoinValue } = useCryptoValueStorage(cryptocurrency.value.slug)
  const latestBitcoinValue = ref(getLatestBitcoinValue())

  const isCryptoValueUpdated = computed(() => {
    if (!cryptocurrency.value?.quote.USD || !latestBitcoinValue.value) {
      return false
    }
    return roundToDecimals(latestBitcoinValue.value ?? 0, 2) !== roundToDecimals(cryptocurrency.value?.quote.USD.price ?? 0, 2)
  })

  onMounted(() => {
    if (cryptocurrency.value?.quote.USD)
      setLatestBitcoinValue(cryptocurrency.value?.quote.USD.price)
  })
  return {
    isCryptoValueUpdated,
  }
}
