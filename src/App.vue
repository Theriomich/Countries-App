<script setup>
import { onMounted, ref, watch } from 'vue';
import PageHeader from './components/PageHeader.vue';
import CountryList from "./components/Countrylist.vue";
import axiosClient from "./utils/axios"

const countries = ref([]);
const search = ref("");
const filteredCountries = ref([]);
const page = ref(1);
const itemsPerPage = ref(12);
const paginationCountries = ref([]);
const totalItems = ref(0);

const fetchCountries = async () => {
  try {
    const { data } = await axiosClient.get("/all");
    countries.value = data;
    totalItems.value = countries.value.length;
  } catch (error) {
    console.log(error);
  }
}

const changePage = (newPage) => {
  page.value = newPage;
}

onMounted(() => {
  fetchCountries();
});

const filterCountries = () => {
  if (search.value === "") {
    filteredCountries.value = countries.value;
  } else {
    filteredCountries.value = countries.value.filter(country =>
      country.name.common.toLowerCase().includes(search.value.toLowerCase())
    );
  }
};

const sliceCountries = (currentCountries) => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = page.value * itemsPerPage.value;
  paginationCountries.value = currentCountries.slice(start, end);
};

watch([countries, page, search], () => {
  filterCountries();
  sliceCountries(filteredCountries.value);
});

</script>

<template>
  <PageHeader/>
  <div class="container max-w-screen-lg mx-auto px-6">
    <div class="mb-8">
      <input
        type="text"
        class="border border-gray-300 rounded w-full p-1 px-4"
        placeholder="Search by Country Name"
        @input="filterCountries"
        v-model="search"
      />
    </div>
    <div class="mb-8 flex justify-center space-x-24">
      <button
        :disabled="page <= 1"
        :class="{ 'opacity-50': page <= 1 }"
        @click="changePage(page - 1)"
        class="border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-200"
      >
        Previous
      </button>
      <button
        :disabled="page >= totalItems / itemsPerPage"
        :class="{ 'opacity-50': page >= totalItems / itemsPerPage }"
        @click="changePage(page + 1)"
        class="border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-200"
      >
        Next
      </button>
    </div>

    <CountryList :countries="paginationCountries"/>
  </div>
</template>