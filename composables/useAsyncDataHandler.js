const useAsyncDataHandler = async () => {
  const jobStore = useJobStore();
  await useAsyncData(
    "jobs",
    async () => {
      await jobStore.fetchJobs();
      return jobStore.jobs;
    },
    {
      getCachedData: (key) => jobStore.getCachedDataHandler(key),
      transform: (data) => jobStore.transformHandler(data),
    }
  );
};

export default useAsyncDataHandler;
