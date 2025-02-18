<script setup>
const favoriteStore = useFavoriteStore();
defineProps({
    job: {
        type: Object,
        required: true,
        // default: () => ({}),
    },
});
</script>

<template>
    <div class="p-4 border rounded shadow-md">
        <NuxtLink :to="`/job/${job.id}`" class="block hover:underline">
            <h2 class="font-bold">Title: {{ job.name }}</h2>
        </NuxtLink>

        <p>Company: {{ job.company.name }}</p>
        <p>Category: {{job.categories.map(l => l.name).join(', ')}}</p>
        <p>Location: {{job.locations.map(l => l.name).join(', ')}}</p>
        <p>Tags: {{job.tags.map(l => l).join(', ')}}</p>
        <NuxtLink :to="job?.refs?.landing_page" :external="true" target="_blank" class="text-blue-500">Apply
        </NuxtLink>
        <div>
            <button @click="favoriteStore.toggleFavorite(job)" :class="{
                'text-red-500': favoriteStore.favorites.some(j => j.id === job.id),
                'opacity-50': !favoriteStore.favorites.some(j => j.id === job.id)
            }">
                💖
            </button>

        </div>
    </div>

</template>
