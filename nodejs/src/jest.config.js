module.exports = {
  testEnvironment: "node",
  rootDir: "..",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["<rootDir>/tests/**/*.test.js"],
  moduleDirectories: ["src/node_modules", "node_modules"],
};
