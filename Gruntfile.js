module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    processhtml: {
      dist: {
        files: {
          'uw-frame-static/target/index.html': ['uw-frame-static/index.html'],
          'docs/target/index.html': ['docs/index.html'],
          'uw-frame-static/target/vendor/angulartics-ga.min.js': ['uw-frame-components/bower_components/angulartics-google-analytics/dist/angulartics-ga.min.js'],
          'uw-frame-static/target/vendor/angulartics-ga.min.js.map': ['uw-frame-components/bower_components/angulartics-google-analytics/dist/angulartics-ga.min.js.map']
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
      },
      build_docs: {
        cmd: 'npm',
        args: [
          'run',
          'build-docs'
        ],
        options: {
          wait: true
        }
      },
      run_docs: {
        cmd : 'npm',
        args: [
          'run','docs'
        ],
        options: {
          wait: false
        }
      }
    },

    watch: {
      static : {
        files: ['uw-frame-components/**/*'],
        tasks: ['run:build_static']
      },
      docs : {
        files: ['uw-frame-components/**/*','docs/**','!docs/target/**'],
        tasks: ['run:build_docs']
      }
    }
  });

  grunt.registerTask('serve', 'Compile static and watch for change so it can recompile', function(){
    grunt.task.run([
      'run:get_bower',
      'run:run_static',
      'watch:static'
    ]);
  });

  grunt.registerTask('serve_docs', 'Compile docs and watch for change so it can recompile', function(){
    grunt.task.run([
      'run:get_bower',
      'run:run_docs',
      'watch:docs'
    ]);
  })
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');

  // Default task(s).
  grunt.registerTask('default', ['processhtml']);
};
