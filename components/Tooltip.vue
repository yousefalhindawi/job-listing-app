<template>
    <span class="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 group">
        <i class="fas fa-info-circle cursor-pointer"></i>
        <span
            class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-sm bg-gray-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
            {{ infoText }}
        </span>
    </span>
</template>

<script setup>
defineProps({
    infoText: {
        type: String,
        required: true,
    },
});
</script>