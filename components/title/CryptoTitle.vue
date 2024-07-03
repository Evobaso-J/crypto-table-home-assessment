<template>
  <h1>
    <span>
      {{ bitcoinValue ? 'Il valore di Bitcoin è ' : 'Non è stato possibile recuperare il valore di Bitcoin ' }}
    </span>
    <ClientOnly>
      <template #fallback>
        <v-progress-circular
          class="ml-5"
          indeterminate
          color="teal-darken-4"
          size="20"
          width="4"
        />
      </template>
      <span
        :class="{
          'text-red': isCryptoValueUpdated,
        }"
      >
        {{ bitcoinValue }}
      </span>
    </ClientOnly>
  </h1>
  <p>{{ paragraphText }}</p>
</template>

<script setup lang="ts">
import { useCryptocurrencyLatestValue } from './useCryptocurrencyLatestValue'
import { useBitcoinValue } from '~/components/title/useBitcoinValue'
import { useSecondHighestCrypto } from '~/components/title/useSecondHighestCrypto'
import { convertValueInDollars } from '~/utils'

defineComponent({ name: 'CryptoTitle' })

const { data: bitcoin } = await useBitcoinValue()
const bitcoinValue = computed(() => {
  if (!bitcoin.value || !bitcoin.value.quote.USD) {
    return undefined
  }
  return convertValueInDollars(bitcoin.value.quote.USD.price)
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

const { isCryptoValueUpdated } = useCryptocurrencyLatestValue(bitcoin)
</script>
