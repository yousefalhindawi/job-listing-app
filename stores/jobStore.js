import { defineStore } from "pinia";
// import { debounce } from "lodash";
export const useJobStore = defineStore("jobStore", {
  state: () => ({
    jobs: [],
    page: 1,
    pageSize: 20,
    totalJobs: 0,
    totalPageCount: 0,
    cachedJobs: {},
    filters: { name: "", location: "", category: "", company: "" },
    job: {},
    error: null,
    loading: false,
    // isFirstFetch: true,
  }),
  actions: {
    async fetchJobs() {
      this.loading = true;
      this.error = null;
      const config = useRuntimeConfig();

      const activeFilters = Object.fromEntries(
        Object.entries(this.filters).filter(([_, value]) => value)
      );

      const params = new URLSearchParams({
        page: this.page,
        ...activeFilters,
        api_key: config.public.themuseApiKey,
      }).toString();
      // console.log("this.isFirstFetch", this.isFirstFetch);
      try {
        const jobs = await this.fetchData(`${config.public.apiBase}?${params}`);
        this.totalJobs = jobs.total || 0;
        this.totalPageCount = jobs.page_count || 0;
        this.jobs = jobs.results || [];
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async fetchData(url) {
      // const config = useRuntimeConfig();
      // let response;

      // if (this.isFirstFetch) {
      // const { data, error } = await useFetch(url, {
      //   onResponseError: this.handleError,
      // });
      // response = data.value;
      // this.isFirstFetch = false;
      // } else {
      const response = await $fetch(url, {
        onResponseError: this.handleError,
      });
      /* I used $fetch instead of useFetch here because I used the same function after Component is already mounted in the pagination & filtering,
        and the useFetch() is designed for server-side data fetching it's not meant to be used for dynamic client-side updates like filtering and pagination.
        https://nuxt.com/docs/getting-started/data-fetching */
      // }

      return response;
    },
    handleError(error) {
      if (
        error &&
        error?.response?._data?.error &&
        error?.response?._data?.code
      ) {
        this.error = `${error?.response?._data?.error} (Code: ${error?.response?._data?.code})`;
      } else {
        this.error = "An unexpected error occurred while fetching jobs.";
      }
      this.loading = false;
    },
    async fetchJob(jobId) {
      this.loading = true;
      this.error = null;
      const config = useRuntimeConfig();

      try {
        const { data, error } = await useFetch(
          () =>
            `${config.public.apiBase}/${jobId}?api_key=${config.public.themuseApiKey}`,
          {
            watch: [() => jobId],
            onResponseError: this.handleError,
          }
        );

        this.job = data.value || {};
      } catch (err) {
      } finally {
        this.loading = false;
      }
    },
    // updateFilter: debounce(function (key, value) {
    //   this.filters[key] = value;
    //   this.fetchJobs();
    // }, 300),
  },
});

export const useFavoriteStore = defineStore("favoriteStore", {
  state: () => ({
    // favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    favorites: [],
  }),
  getters: {
    favoriteJobs: (state) => state.favorites,
  },
  actions: {
    toggleFavorite(job) {
      const exists = this.favorites.find((j) => j.id === job.id);
      if (exists) {
        this.favorites = this.favorites.filter((j) => j.id !== job.id);
      } else {
        this.favorites.push(job);
      }

      if (import.meta.client) {
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      }
    },

    loadFavorites() {
      // if (process.client) {
      //   this.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      // }
      if (import.meta.client) {
        this.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      }
    },
  },
});
