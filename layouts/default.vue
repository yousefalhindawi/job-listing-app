<template>
    <NuxtLoadingIndicator />
    <div class="min-h-screen flex flex-col">
        <!-- Header -->
        <Header />

        <!-- Main Content -->
        <main class="flex-1 container mx-auto p-4">
            <slot>
                There is no content to display.
            </slot>
        </main>

        <!-- Footer -->
        <Footer />
    </div>
</template>

<script setup>
</script>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>