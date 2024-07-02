<template>
  <h1>{{ cryptoTitle }}</h1>
  <p>{{ paragraphText }}</p>
</template>

<script setup lang="ts">
import { useBitcoinValue } from './useBitcoinValue'
import { useSecondHighestCrypto } from './useSecondHighestCrypto'
import { convertValueInDollars } from '~/utils'

defineComponent({ name: 'CryptoTitle' })

const { data: bitcoin } = await useBitcoinValue()
const cryptoTitle = computed(() => {
  if (!bitcoin.value || !bitcoin.value.quote.USD) {
    return 'Non è stato possibile recuperare il valore di Bitcoin'
  }
  return `Il valore di Bitcoin è ${convertValueInDollars(bitcoin.value.quote.USD.price)}`
})

const { data: secondHighestCrypto } = await useSecondHighestCrypto()
const paragraphText = computed(
  () => {
    if (!secondHighestCrypto.value) {
      return 'Non è stato possibile recuperare la seconda cryptovaluta con maggior Market Cap'
    }
    if (!secondHighestCrypto.value.quote.USD) {
      return 'Non è stato possibile recuperare il valore della seconda cryptovaluta con maggior Market Cap'
    }
    return `La cryptovaluta con maggior Market Cap dopo Bitcoin è ${secondHighestCrypto.value.name} con valore ${convertValueInDollars(secondHighestCrypto.value.quote.USD.price)}`
  },
)
</script>
