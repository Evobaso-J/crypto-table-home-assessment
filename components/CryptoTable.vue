<template>
  <KeepAlive>
    <div
      v-if="status === 'pending'"

      class="spinner-container-height d-flex justify-center align-center"
    >
      <v-progress-circular
        indeterminate
        color="teal-darken-4"
        size="50"
        width="5"
      />
    </div>

    <v-data-table
      v-else
      :header-props="{
        class: 'bg-teal-darken-4 text-uppercase text-overline',
      }"
      :headers
      :items
      hide-default-footer
      class="rounded-lg"
      items-per-page="100"
    >
      <template #[`item.name`]="{ item }">
        <div class="font-weight-bold">
          {{ item.name }}
        </div>
      </template>
    </v-data-table>
  </KeepAlive>
</template>

<script setup lang='ts'>
import { parseCryptocurrencyListings } from '~/resources/cryptocurrencies-listings/parse'
import type { CryptocurrencyListingResponse } from '~/resources/cryptocurrencies-listings/types/response'
import { convertISOStringToReadableDate, convertValueInDollars } from '~/utils'
import { useFetchCache } from '~/utils/useFetchCache'

defineComponent({ name: 'CryptoTable' })

type CryptocurrenciesTableItems = {
  name: string
  symbol: string
  price: string
  circulatingSupply: string
  lastUpdated: string
}

const { getCachedData, transform } = useFetchCache<CryptocurrencyListingResponse>()
const { data: cryptoListingsResponse, status } = useFetch('/api/cryptocurrency-listings', {
  method: 'GET',
  query: {
    sort: 'market_cap',
    sort_dir: 'desc',
  },
  server: false,
  lazy: true,
  transform,
  getCachedData,
})

const headers = [
  { title: 'Name', value: 'name' },
  { title: 'Symbol', value: 'symbol' },
  { title: 'Price', value: 'price' },
  { title: 'Circulating Supply', value: 'circulatingSupply' },
  { title: 'Last Updated', value: 'lastUpdated' },
] as const satisfies { title: string, value: keyof CryptocurrenciesTableItems }[]

const items = computed<CryptocurrenciesTableItems[]>(() => {
  if (status.value === 'pending') return []
  if (!cryptoListingsResponse.value) return []

  const { fetchedAt: _, ...cryptoListingsNoFetchedAt } = cryptoListingsResponse.value
  const cryptoListings = parseCryptocurrencyListings(cryptoListingsNoFetchedAt)
  return cryptoListings.map(crypto => ({
    name: crypto.name,
    symbol: crypto.symbol,
    price: convertValueInDollars(crypto.quote.USD?.price ?? 0),
    circulatingSupply: Math.floor(crypto.circulating_supply).toLocaleString(),
    lastUpdated: convertISOStringToReadableDate(crypto.last_updated),
  }))
})
</script>

<style scoped>
.spinner-container-height{
    min-height: 500px;
}
</style>
