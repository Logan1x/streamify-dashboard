import {
  keyMetrics,
  userGrowthData,
  revenueDistribution,
  topStreamedSongs,
  recentStreams,
} from "./mockData";

// Mock API service
const apiService = {
  getKeyMetrics: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(keyMetrics);
      }, 500); // Simulate a 500ms delay
    });
  },

  getUserGrowthData: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userGrowthData);
      }, 500);
    });
  },

  getRevenueDistribution: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(revenueDistribution);
      }, 500);
    });
  },

  getTop5StreamedSongs: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(topStreamedSongs);
      }, 500);
    });
  },

  getRecentStreams: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(recentStreams);
      }, 500);
    });
  },
};

export default apiService;
