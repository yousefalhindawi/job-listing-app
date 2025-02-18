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