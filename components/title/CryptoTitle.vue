<template>
  <h1>{{ cryptoTitle }}</h1>
  <p>{{ paragraphText }}</p>
</template>

<script setup lang="ts">
import { useBitcoinValue } from './useBitcoinValue'
import { useSecondHighestCrypto } from './useSecondHighestCrypto'

defineComponent({ name: 'CryptoTitle' })

const bitcoinValue = await useBitcoinValue()
const cryptoTitle = computed(() => `Il valore di Bitcoin è ${bitcoinValue}`)

const { data: secondHighestCrypto } = await useSecondHighestCrypto()
const paragraphText = computed(
  () => {
    if (!secondHighestCrypto.value) {
      return 'Non è stato possibile recuperare la seconda cryptovaluta con maggior Market Cap'
    }
    if (!secondHighestCrypto.value.quote.USD) {
      return 'Non è stato possibile recuperare il valore della seconda cryptovaluta con maggior Market Cap'
    }
    const valueInDollars = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(secondHighestCrypto.value.quote.USD.price)
    return `La cryptovaluta con maggior Market Cap dopo Bitcoin è ${secondHighestCrypto.value.name} con valore ${valueInDollars}`
  },
)
</script>
