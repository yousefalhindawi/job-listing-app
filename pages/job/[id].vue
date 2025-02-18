<script setup>
import { useRoute } from "nuxt/app";
import { storeToRefs } from "pinia";
import { useJobStore } from "~/stores/jobStore";
const route = useRoute();
const jobStore = useJobStore();
const { job } = storeToRefs(jobStore);
await jobStore.fetchJob(route.params.id);
// console.log("jobStore.job", job.value);
</script>

<template>

  <div class="p-6">

    <Head>
      <Title>Job Finder | {{ job?.name }}</Title>
      <Meta name="description" :content="job?.contents" />
    </Head>
    <h1 class="text-2xl font-bold">{{ job?.name }}</h1>
    <p class="text-gray-700">{{ job?.company?.name }} - {{job?.locations?.map(l => l.name).join(', ')}}</p>
    <client-only>
      <p v-html="job?.contents" class="mt-4"></p>
    </client-only>
    <p class="mt-2">Type: {{ job?.type }}</p>
    <p class="mt-2">Level: {{job?.levels?.map(l => l.name).join(', ')}}</p>

    <NuxtLink :to="job?.refs?.landing_page" :external="true" target="_blank"><button
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Apply Now</button></NuxtLink>
  </div>
</template>