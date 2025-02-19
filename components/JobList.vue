<script setup>
import { useJobStore } from "~/stores/jobStore";
import { debounce } from "lodash";
import JobListCard from "./JobListCard.vue";
import Tooltip from "./Tooltip.vue";
import Pagination from "./Pagination.vue";
const jobStore = useJobStore();
if (import.meta.server) {
  await jobStore.fetchJobs();
}

const debounceSearch = debounce(async () => {
  jobStore.page = 1;
  await jobStore.fetchJobs();
}, 1000);

const filteredJobs = computed(() => {
  return jobStore.jobs.filter(j =>
    j.name.toLowerCase().includes(jobStore.filters.name.toLowerCase())
  );
});
const goToPage = (currentPage) => {
  if (currentPage < 1 || currentPage > jobStore.totalPageCount) return
  jobStore.page = currentPage
  // console.log(`Fetching jobs for page ${currentPage}`)
  jobStore.fetchJobs();
}
</script>
<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="relative">
        <input v-model="jobStore.filters.name" placeholder="Title ex: Senior Software Engineering Manager, Google"
          class="p-2 border rounded pr-9 w-full" />
        <Tooltip infoText="Enter whole word (Case-sensitive)" /> <!-- because how the MUSE API works-->
      </div>
      <div class="relative">
        <input v-model="jobStore.filters.location" placeholder="Location ex: Bangalore, India"
          class="p-2 border rounded pr-9 w-full" @input="debounceSearch" />
        <Tooltip infoText="Enter whole word (Case-sensitive)" /> <!-- because how the MUSE API works-->
      </div>
      <div class="relative">
        <input v-model="jobStore.filters.company" placeholder="Company ex: Google"
          class="p-2 border rounded pr-9 w-full" @input="debounceSearch" />
        <Tooltip infoText="Enter whole word (Case-sensitive)" /> <!-- because how the MUSE API works-->
      </div>
      <div class="relative">
        <input v-model="jobStore.filters.category" placeholder="category ex: Software Engineering"
          class="p-2 border rounded pr-9 w-full" @input="debounceSearch" />
        <Tooltip infoText="Enter whole word (Case-sensitive)" /> <!-- because how the MUSE API works-->
      </div>
    </div>
    <div v-if="jobStore?.loading" class="mt-4 text-gray-500 text-sm">
      <p>Loading...</p>
    </div>
    <div v-if="jobStore?.jobs?.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
      <JobListCard v-for="job in filteredJobs" :key="job?.id" :job="job" />
    </div>
    <div class="flex justify-between mt-4">
      <button @click="goToPage(jobStore.page - 1)" class="bg-blue-500 text-white px-4 py-2 rounded"
        :disabled="jobStore.page === 1" :class="{ 'opacity-50': jobStore.page === 1 }">Previous</button>
      <span>Page {{ +jobStore.page }}</span>
      <button @click="goToPage(jobStore.page + 1)" class="bg-blue-500 text-white px-4 py-2 rounded" :class="{
        'opacity-50': jobStore.page * jobStore.pageSize >= jobStore.totalJobs || jobStore.totalJobs === 0
      }" :disabled="jobStore.page * jobStore.pageSize >= jobStore.totalJobs || jobStore.totalJobs === 0">Next</button>
    </div>
    <Pagination />

    <div v-if="jobStore?.error" class="mt-4 text-red-600 text-sm">
      <p>{{ jobStore?.error }}</p>
    </div>
  </div>
</template>