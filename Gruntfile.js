module.exports = (grunt) => {
  grunt.initConfig({
    mochaTest: {
      files: './test/*.test.js'
    }
  });
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('test', ['mochaTest']);
};
