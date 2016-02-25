module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    processhtml: {
      dist: {
        files: {
          'uw-frame-static/target/index.html': ['uw-frame-static/index.html'],
          'docs/target/index.html': ['docs/index.html']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-processhtml');

  // Default task(s).
  grunt.registerTask('default', ['processhtml']);
};
