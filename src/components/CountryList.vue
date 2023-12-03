<script setup>
import {ref, defineProps} from "vue";
import CountryItem from "./CountryItem.vue";
const props = defineProps(['countries']);

</script>


<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    <div v-for="country in countries" :key="country.name.common" class="border border-gray-300 rounded p-3">
      <CountryItem :country="country"/>
    </div>
  </div>
</template>