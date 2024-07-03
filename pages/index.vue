<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <CryptoTitle />
      </v-col>
      <v-col cols="12">
        <v-no-ssr>
          <CryptoTable />
        </v-no-ssr>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import CryptoTable from '~/components/CryptoTable.vue'
import CryptoTitle from '~/components/title/CryptoTitle.vue'
</script>
