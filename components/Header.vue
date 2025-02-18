<template>
    <header class="bg-blue-600 text-white p-4 mb-8">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold hover:text-gray-300">JobFinder</NuxtLink>
        
        <!-- Navigation Links -->
        <nav class="space-x-6">
          <NuxtLink to="/" class="hover:text-gray-300">Home</NuxtLink>
          <NuxtLink to="/" class="hover:text-gray-300">Jobs</NuxtLink>
          <NuxtLink to="/favorites" class="hover:text-gray-300">Favorites</NuxtLink>
          <NuxtLink to="/" class="hover:text-gray-300">Contact</NuxtLink>
        </nav>
        
        
        <!-- <div class="hidden md:block">
          <input
            type="text"
            placeholder="Search jobs..."
            class="p-2 rounded-lg text-black"
          />
        </div> -->
      </div>
    </header>
  </template>
  
  <script setup>
  </script>
  