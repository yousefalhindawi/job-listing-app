<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isMenuOpen = ref(false);
const links = [
  { to: "/", label: "Jobs" },
  { to: "/favorites", label: "Favorites" },
  { to: "/contact", label: "Contact" }
];
</script>

<template>
  <header class="bg-blue-600 text-white p-4 mb-8">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-bold hover:text-gray-300">JobFinder</NuxtLink>

      <!-- Desktop Menu -->
      <nav class="hidden md:flex space-x-6">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" :class="[
          'hover:text-gray-300 px-2 py-1 rounded transition',
          route.path === link.to ? 'bg-white text-blue-600 font-semibold' : ''
        ]">
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Mobile Menu Button -->
      <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>


    </div>

    <!-- Mobile Menu -->
    <Transition name="menu-slide" mode="out-in">
      <div v-if="isMenuOpen" class="md:hidden p-4 top-16 left-0 w-full bg-blue-600 lg:static lg:w-auto lg:bg-transparent lg:flex lg:space-x-6">
        <nav class="flex flex-col space-y-2 ">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" @click="isMenuOpen = false"
            class="block lg:inline-block px-4 py-2 text-center hover:text-gray-300 transition"
            :class="route.path === link.to ? 'bg-white text-blue-600 font-semibold rounded' : ''">
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
