<template>
  <h1>{{ cryptoTitle }}</h1>
  <p>{{ paragraphText }}</p>
</template>

<script setup lang="ts">
import { useBitcoinValue } from './useBitcoinValue'
import { useSecondHighestCrypto } from './useSecondHighestCrypto'

defineComponent({ name: 'CryptoTitle' })

const bitcoinValue = useBitcoinValue()
const cryptoTitle = computed(() => `Il valore di Bitcoin è ${bitcoinValue}`)

const { name: secondHighestCryptoName, value: secondHighestCryptoValue } = useSecondHighestCrypto()
const paragraphText = computed(
  () =>
    `La cryptovaluta con maggior Market Cap dopo Bitcoin è ${secondHighestCryptoName} con valore ${secondHighestCryptoValue}`,
)
</script>
