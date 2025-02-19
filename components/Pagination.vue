<script setup>
import { ref, computed } from 'vue'
import { useJobStore } from "~/stores/jobStore";
const jobStore = useJobStore();
const { page, pageSize, totalJobs, totalPageCount } = storeToRefs(jobStore);
const pageRange = computed(() => {
    // console.log("page.value", page.value)
    const pagesArray = []
    const startPage = Math.max(page.value - 2, 1)
    const endPage = Math.min(page.value + 2, totalPageCount.value)

    for (let i = startPage; i <= endPage; i++) {
        pagesArray.push(i)
    }
    // console.log("pageRange", pagesArray)
    return pagesArray
})
const goToPage = (currentPage) => {
    // console.log("goToPage", currentPage)
    if (currentPage < 1 || currentPage > totalPageCount.value) return
    page.value = currentPage
    // console.log(`Fetching jobs for page ${currentPage}`)
    jobStore.fetchJobs();
}
</script>


<template>
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
            <!-- Mobile version -->
            <a href="#" @click.prevent="goToPage(page - 1)"
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                :disabled="page === 1">Previous</a>
            <a href="#" @click.prevent="goToPage(page + 1)"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                :disabled="page * pageSize >= totalJobs">Next</a>
        </div>

        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    Showing
                    {{ (page - 1) * pageSize + 1 }} to
                    {{ Math.min(page * pageSize, totalJobs) }} of
                    <span class="font-medium">{{ totalJobs }}</span>
                    results
                </p>
            </div>
            <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button href="#" @click.prevent="goToPage(page - 1)"
                        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        :disabled="page === 1" :class="{ 'opacity-50': page === 1 }">
                        <span class="sr-only">Previous</span>
                        <i class="fa fa-arrow-left" aria-hidden="true"></i>

                    </button>
                    <!-- First page -->
                    <button v-if="page > 3" @click.prevent="goToPage(1)"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">1</button>
                    <!-- Ellipsis before current page -->
                    <span v-if="page > 4"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">...</span>

                    <!-- Page numbers around the current page -->
                    <button v-for="p in pageRange" :key="p"
                        :class="['relative inline-flex items-center px-4 py-2 text-sm font-semibold', { 'bg-indigo-600 text-white': p === page, 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50': p !== page }]"
                        @click.prevent="goToPage(p)" :aria-current="p === page ? 'page' : null">
                        {{ p }}
                    </button>

                    <!-- Ellipsis after current page -->
                    <span v-if="page < totalPageCount - 3"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">...</span>

                    <!-- Last page -->
                    <button v-if="page < totalPageCount - 2" @click.prevent="goToPage(totalPageCount)"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">{{
                            totalPageCount }}</button>
                    <button href="#" @click.prevent="goToPage(page + 1)"
                        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        :disabled="page * pageSize >= totalJobs">
                        <span class="sr-only">Next</span>
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                    </button>
                </nav>
            </div>
        </div>
    </div>
</template>