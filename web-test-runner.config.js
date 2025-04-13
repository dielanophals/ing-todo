// web-test-runner.config.js
export default {
    rootDir: '.',
    files: './src/tests/*.test.js',
    nodeResolve: true,
    browserLogs: true,
    testFramework: {
      config: {
        ui: 'bdd',
      },
    },
  };
  