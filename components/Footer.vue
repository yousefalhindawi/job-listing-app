<template>
  <footer class="bg-gray-800 text-white p-6 mt-12">
    <div class="container mx-auto text-center">
      <p>&copy; {{ new Date().getFullYear() }} JobFinder. All rights reserved.</p>

      <div class="mt-4 space-x-6">
        <NuxtLink to="https://yousefalhindawi.vercel.app/" :external="true" target="_blank" class="hover:text-gray-400">Portfolio</NuxtLink>
        <NuxtLink to="https://www.linkedin.com/in/yousef-alhindawi/" :external="true" target="_blank" class="hover:text-gray-400">LinkedIn</NuxtLink>
        <NuxtLink href="mailto::eng.yousefalhindawi@gmail.com" class="hover:text-gray-400">Email</NuxtLink>
      </div>

      <!-- Legal Links (Optional) -->
      <div class="mt-2 space-x-6">
        <NuxtLink to="/" class="hover:text-gray-400">Privacy Policy</NuxtLink>
        <NuxtLink to="/" class="hover:text-gray-400">Terms of Service</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>