<script setup>
import { useFavoriteStore } from "~/stores/jobStore";
const favoriteStore = useFavoriteStore();
favoriteStore.loadFavorites();
</script>
<template>

    <div class="p-6">
        <Head>
            <Title>Job Finder | Favorites</Title>
            <Meta name="description" content="Favorites" />
        </Head>
        <h1 class="text-2xl font-bold">Favorites</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            <p v-if="favoriteStore.favorites.length === 0" class="text-gray-500">No favorites found.</p>
            <JobListCard v-for="job in favoriteStore.favorites" :key="job.id" :job="job" />
        </div>
    </div>
</template>