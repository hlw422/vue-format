import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Website } from "@/data/initWebsites";

export const useWebsiteStore = defineStore(
  "website",
  () => {
    const websites = ref<Website[]>([]);
    const addWebsite = (website: Website) => {
      websites.value.push(website);
    };
    const updateWebsite = (website: Website) => {
      const index = websites.value.findIndex((w) => w.id === website.id);
      if (index !== -1) {
        websites.value[index] = website;
      }
    };
    const deleteWebsite = (id: number) => {
      const index = websites.value.findIndex((w) => w.id === id);
      if (index !== -1) {
        websites.value.splice(index, 1);
      }
    };
    const clearWebsites = () => {
      websites.value = [];
    };
    return {
      websites,
      addWebsite,
      updateWebsite,
      deleteWebsite,
      clearWebsites,
    };
  },
  {
    persist: true,
  }
);
