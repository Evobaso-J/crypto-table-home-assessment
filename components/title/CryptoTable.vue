<template>
  CryptoTable
  <div
    class="spinner-container-height d-flex justify-center align-center"
  >
    <v-progress-circular
      v-if="status === 'pending'"
      indeterminate
      color="teal"
      size="50"
      width="5"
    />

    <v-data-table
      v-else
      :items="cryptoItems"
      hide-default-footer
    />
  </div>
</template>

<script setup lang='ts'>
import { parseCryptocurrencyListings } from '~/resources/cryptocurrencies-listings/parse'

defineComponent({ name: 'CryptoTable' })

type CryptocurrenciesTableItems = {
  name: string
  symbol: string
  price: number
  circulatingSupply: number
  lastUpdated: string
}

const { data: cryptoListingsResponse, status } = useFetch('/api/cryptocurrency-listings', {
  method: 'GET',
  query: {
    sort: 'market_cap',
    sort_dir: 'desc',
  },
  server: false,
})
const cryptoItems = computed<CryptocurrenciesTableItems[]>(() => {
  if (status.value === 'pending') return []
  if (!cryptoListingsResponse.value) return []
  const cryptoListings = parseCryptocurrencyListings(cryptoListingsResponse.value)
  return cryptoListings.map(crypto => ({
    name: crypto.name,
    symbol: crypto.symbol,
    price: crypto.quote.USD?.price ?? 0,
    circulatingSupply: crypto.circulating_supply,
    lastUpdated: crypto.last_updated,
  }))
})
</script>

<style scoped>
.spinner-container-height{
    min-height: 500px;
}
</style>
