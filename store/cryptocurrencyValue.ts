import { useStorage } from '@vueuse/core'

type Storage<T> = {
  get: () => T | null
  set: (value: T) => void
}

const cryptoValueStorageKeyPrefix = '__cryptocurrency'

/**
 * Provides a getter and setter for the latest cryptocurrency value using Nitro's useStorage.
 *
 * This function creates a reactive storage instance for persisting the latest cryptocurrency value
 * across browser sessions. It leverages Vue's composition API to manage and react to changes in the cryptocurrency value.
 * The value is uniquely identified and stored under a key that combines a predefined prefix with the provided storageKey.
 *
 * @param {string} storageKey - The unique key part to store the cryptocurrency value under.
 * @returns {object} An object containing two methods:
 * - get: A function that retrieves the latest stored cryptocurrency value. Returns the current value or null if not set.
 * - set: A function that updates the stored cryptocurrency value and the internal reactive state.
 */
export const useCryptoValueStorage = (storageKey: string): Storage<number> => {
  const latestCryptoValue = ref<number | null>(null)
  const storage = useStorage<number | null>(`${cryptoValueStorageKeyPrefix}-${storageKey}`, latestCryptoValue)

  return {
    get: () => storage.value,
    set: (value: number) => { latestCryptoValue.value = value },
  }
}
