import type { NuxtApp } from '#app'

type WithFetchedAt<T> = T & {
  fetchedAt: Date
} | undefined

const CACHE_EXPIRATION_TIME = 1000 * 10 * 5 // 5 minutes

/**
 * Creates a cache management utility to use in tandem with useFetch
 * The cache expiration is 5 minutes.
 *
 * @template T The type of the data to be cached.
 * @returns {object} An object containing two methods:
 * - transform: A function that takes a response of type T and returns it with a `fetchedAt` timestamp.
 * - getCachedData: A function that retrieves cached data by key. It checks if the data is expired
 *   based on `CACHE_EXPIRATION_TIME`. If the data is not expired, it returns the cached data; otherwise,
 *   it forces a refetch by returning undefined.
 *
 * @example
 * const { transform, getCachedData } = useFetchCache()
 * const { data, error, isFetching } = useFetch('/random/url', { transform, getCachedData })
 */
export function useFetchCache<T>() {
  const transform = (response: T): WithFetchedAt<T> => ({
    ...response,
    fetchedAt: new Date(),
  })

  const getCachedData = (key: string, nuxtApp: NuxtApp): WithFetchedAt<T> | undefined => {
    const cachedData: WithFetchedAt<T> = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (!cachedData) return // Returning no data to force refetch without cache

    const expirationDate = new Date(cachedData.fetchedAt)
    expirationDate.setTime(cachedData.fetchedAt.getTime() + CACHE_EXPIRATION_TIME)
    const isExpired = Date.now() > expirationDate.getTime()
    if (isExpired) return // Returning no data to force refetch without cache

    return cachedData
  }

  return {
    transform,
    getCachedData,
  }
}
