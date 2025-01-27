module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["js", "ts", "vue", "json"],
  testEnvironment: "jsdom",
};
