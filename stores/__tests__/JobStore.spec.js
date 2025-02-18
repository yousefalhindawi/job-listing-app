import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useJobStore, useFavoriteStore } from "../jobStore";

vi.stubGlobal("useRuntimeConfig", () => ({
  public: {
    apiBase: "https://api.example.com", 
    themuseApiKey: "mock-api-key",
  },
}));
describe("JobStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // it("initializes with default state", () => {
  //   const jobStore = useJobStore();
  //   expect(jobStore.jobs).toEqual([]);
  //   expect(jobStore.page).toBe(1);
  //   expect(jobStore.pageSize).toBe(20);
  //   expect(jobStore.totalJobs).toBe(0);
  //   expect(jobStore.filters).toEqual({
  //     name: "",
  //     location: "",
  //     category: "",
  //     company: "",
  //   });
  // });

  it("fetches jobs and updates state", async () => {
    const jobStore = useJobStore();

    vi.stubGlobal("useFetch", vi.fn(() => {
      return Promise.resolve({
        data: {
          value: {
            results: [{ id: 1, name: "Frontend Developer" }],
            total: 1,
            page_count: 1,
          },
        },
      });
    }));

    await jobStore.fetchJobs();
    expect(jobStore.jobs.length).toBe(1);
    expect(jobStore.jobs[0].name).toBe("Frontend Developer");
    expect(jobStore.totalJobs).toBe(1);
  });

  it("fetches a single job and updates state", async () => {
    const jobStore = useJobStore();

    vi.stubGlobal("useFetch", vi.fn(() => {
      return Promise.resolve({
        data: {
          value: { id: 1, name: "Frontend Developer" },
        },
      });
    }));

    await jobStore.fetchJob(1);
    expect(jobStore.job.id).toBe(1);
    expect(jobStore.job.name).toBe("Frontend Developer");
  });

  it("filters jobs based on company", () => {
    const jobStore = useJobStore();
    jobStore.jobs = [
      { id: 1, company: "Google" },
      { id: 2, company: "SpaceX" },
    ];
    jobStore.filters.company = "Google";

    const filteredJobs = jobStore.jobs.filter(j =>
      j.company.toLowerCase().includes(jobStore.filters.company.toLowerCase())
    );

    expect(filteredJobs.length).toBe(1);
    expect(filteredJobs[0].company).toBe("Google");
  });
});

describe("FavoriteStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("adds a job to favorites", () => {
    const favoriteStore = useFavoriteStore();
    const job = { id: 1, name: "Frontend Developer" };

    favoriteStore.toggleFavorite(job);
    expect(favoriteStore.favorites.length).toBe(1);
    expect(favoriteStore.favorites[0].id).toBe(1);
  });

  it("removes a job from favorites", () => {
    const favoriteStore = useFavoriteStore();
    const job = { id: 1, name: "Frontend Developer" };

    favoriteStore.toggleFavorite(job); // Add
    favoriteStore.toggleFavorite(job); // Remove

    expect(favoriteStore.favorites.length).toBe(0);
  });
});
