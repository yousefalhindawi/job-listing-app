<script setup>
import { ref } from "vue";

const form = ref({ name: "", email: "", message: "" });
const successMessage = ref("");

const handleSubmit = () => {
    successMessage.value = "Your message has been sent!";
    form.value = { name: "", email: "", message: "" };
};
</script>

<template>
    <div class="container mx-auto max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-blue-600 mb-4">Contact Us</h1>
        <p class="text-gray-700 mb-6">Have a question? Reach out to us.</p>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label class="block font-semibold">Name</label>
                <input v-model="form.name" type="text" placeholder="Your Name" class="w-full p-2 border rounded"
                    required />
            </div>

            <div>
                <label class="block font-semibold">Email</label>
                <input v-model="form.email" type="email" placeholder="Your Email" class="w-full p-2 border rounded"
                    required />
            </div>

            <div>
                <label class="block font-semibold">Message</label>
                <textarea v-model="form.message" placeholder="Your Message" class="w-full p-2 border rounded"
                    required></textarea>
            </div>

            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Send Message
            </button>
        </form>

        <div v-if="successMessage" class="mt-4 text-green-500">{{ successMessage }}</div>
    </div>
</template>