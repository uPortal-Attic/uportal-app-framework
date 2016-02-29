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
    },
    run: {
      get_bower: {
        cmd: 'npm',
        args: [
          'run',
          'pretest'
        ]
      },
      build_static: {
        cmd: 'npm',
        args: [
          'run',
          'build-static'
        ],
        options: {
          wait: true
        }
      },
      run_static: {
        cmd : 'npm',
        args: [
          'run','static'
        ],
        options: {
          wait: false
        }
      }
    },

    watch: {
     files: ['uw-frame-components/**/*'],
     tasks: ['run:build_static'],
   }
  });

  grunt.registerTask('serve', 'Compile static and watch for change so it can recompile', function(){
    grunt.task.run([
      'run:get_bower',
      'run:run_static',
      'watch'
    ]);
  })
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');

  // Default task(s).
  grunt.registerTask('default', ['processhtml']);
};
