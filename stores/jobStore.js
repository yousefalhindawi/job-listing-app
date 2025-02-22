import { defineStore } from "pinia";
// import { debounce } from "lodash";
export const useJobStore = defineStore("jobStore", {
  state: () => ({
    jobs: [],
    page: 1,
    pageSize: 20,
    totalJobs: 0,
    totalPageCount: 0,
    filters: { name: "", location: "", category: "", company: "" },
    job: {},
    error: null,
    loading: false,
    // isFirstFetch: true,
    cache: new Map(),
    cacheTTL: 60 * 1000, // 1 min
    maxCacheSize: 50, // Maximum number of cached requests
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
        // console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async fetchJob(jobId) {
      this.loading = true;
      this.error = null;
      const config = useRuntimeConfig();
      const url = `${config.public.apiBase}/${jobId}?api_key=${config.public.themuseApiKey}`;
      try {
        const { data, error } = await useFetch(() => url, {
          watch: [() => jobId],
          onResponseError: this.handleError,
          transform: (input) => this.transformHandler(input),
          getCachedData: (key) => this.getCachedDataHandler(key),
        });
        // console.log("data.value", data.value);
        // console.log("{...data.value}", {...data.value});
        this.setCache(url, { ...data.value });
        this.job = data.value || {};
      } catch (err) {
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
      // First, check the cache
      const cachedData = this.getCachedDataHandler(url);
      if (cachedData) {
        return cachedData;
      }
      try {
        const response = await $fetch(url, {
          onResponseError: this.handleError,
        });
        /* I used $fetch instead of useFetch here because I used the same function after Component is already mounted in the pagination & filtering,
        and the useFetch() is designed for server-side data fetching it's not meant to be used for dynamic client-side updates like filtering and pagination.*/
        // }

        // this.cache.set(url, { data: response, timestamp: Date.now() });
        this.setCache(url, response);
        return response;
      } catch (error) {
      } finally {
        this.loading = false;
      }
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
    getCachedDataHandler(key) {
      const nuxtApp = useNuxtApp();

      // Clean expired cache before returning data
      this.cleanCache();

      const cached = this.cache.get(key);
      if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
        // console.log("Cache hit for key:", key);
        // console.log("Cached:", cached);
        // console.log("Cached data:", cached.data);
        return cached.data;
      }

      // Check Nuxt's payload (SSR hydration)
      // return nuxtApp.payload.data[key] || nuxtApp.static.data[key] || undefined;
      const nuxtAppPayloadData =
        nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      if (!nuxtAppPayloadData) {
        return;
      }
      // console.log("nuxtAppPayloadData", nuxtAppPayloadData);
      // console.log("nuxtAppPayloadData.fetchedAt", nuxtAppPayloadData.fetchedAt);
      const isExpired =
        new Date(nuxtAppPayloadData.fetchedAt).getTime() + this.cacheTTL <
        new Date().getTime();
      // console.log("isExpired", isExpired);
      return isExpired ? undefined : nuxtAppPayloadData;
    },

    setCache(key, data) {
      // remove oldest entry if cache size exceeds max limit
      if (this.cache.size >= this.maxCacheSize) {
        const oldestKey = this.cache.keys().next().value; // first inserted key
        this.cache.delete(oldestKey);
      }

      // Store new entry
      this.cache.set(key, { data, timestamp: Date.now() });
    },

    cleanCache() {
      const now = Date.now();
      for (const [key, value] of this.cache.entries()) {
        if (now - value.timestamp >= this.cacheTTL) {
          this.cache.delete(key);
        }
      }
    },
    transformHandler(data) {
      return { ...data, fetchedAt: new Date() };
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
