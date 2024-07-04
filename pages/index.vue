<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <CryptoTitle />
      </v-col>
      <v-col cols="12">
        <NuxtLink
          to="cache-test"
        >Clicca qui per testare il caching</NuxtLink>
      </v-col>
      <v-col cols="12">
        <ClientOnly>
          <CryptoTable />
        </ClientOnly>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import CryptoTable from '~/components/CryptoTable.vue'
import CryptoTitle from '~/components/title/CryptoTitle.vue'
</script>
