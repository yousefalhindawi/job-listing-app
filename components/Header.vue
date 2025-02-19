<template>
  <header class="bg-blue-600 text-white p-4 mb-8">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="text-2xl font-bold hover:text-gray-300">JobFinder</NuxtLink>

      <!-- Navigation Links -->
      <nav class="space-x-6">
        <NuxtLink 
          v-for="link in links" 
          :key="link.to" 
          :to="link.to" 
          :class="[
            'hover:text-gray-300 px-2 py-1 rounded transition',
            route.path === link.to ? 'bg-white text-blue-600 font-semibold' : ''
          ]">
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const links = [
  // { to: "/", label: "Home" },
  { to: "/", label: "Jobs" },
  { to: "/favorites", label: "Favorites" },
  { to: "/contact", label: "Contact" }
];
</script>
