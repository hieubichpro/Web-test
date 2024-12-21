// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // Sử dụng jsdom cho các ứng dụng React
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy", // Mock các tệp CSS
  },
};
