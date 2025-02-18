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
  }),
  actions: {
    async fetchJobs() {
      this.loading = true;
      this.error = null;
      const config = useRuntimeConfig();

      const activeFilters = Object.fromEntries(
        Object.entries(this.filters).filter(([_, value]) => value)
      );

      try {
        const params = new URLSearchParams({
          page: this.page,
          ...activeFilters,
          api_key: config.public.themuseApiKey,
        }).toString();

        // const { data: jobs } = await useFetch(`${config.public.apiBase}?${params}`, {
        const jobs = await $fetch(`${config.public.apiBase}?${params}`, {
          onResponseError: (error) => {
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
        });
        // console.log(jobs);
        this.totalJobs = jobs.total || 0;
        this.totalPageCount = jobs.page_count || 0;
        this.jobs = jobs.results || [];
        // this.totalJobs = jobs.value.total || 0;
        // this.totalPageCount = jobs.value.page_count || 0;
        // this.jobs = jobs.value.results || [];
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
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
            onResponseError: (error) => {
              if (
                error &&
                error?.response?._data?.error &&
                error?.response?._data?.code
              ) {
                this.error = `${error?.response?._data?.error} (Code: ${error?.response?._data?.code})`;
              } else {
                this.error =
                  "An unexpected error occurred while fetching jobs.";
              }
              this.loading = false;
            },
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

      if (process.client) {
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      }
    },

    loadFavorites() {
      if (process.client) {
        this.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      }
      // if(import.meta.client) {
      //   console.log("this.favorites", this.favorites);
      //   console.log("localStorage.getItem('favorites')", localStorage.getItem('favorites'));

      // }
    },
  },
});
