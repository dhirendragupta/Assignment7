// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),



      // ========= // CREATE TASKS =========

  // this default task will go through all configuration (dev and production) in each task 
  

  // this task will only run the dev configuration 
 // grunt.registerTask('dev', ['jshint:dev', 'uglify:dev']);

  // only run production configuration 
  //grunt.registerTask('production', ['jshint:production', 'uglify:production']);


    // all of our configuration will go here
    // configure jshint to validate js files -----------------------------------
    

    // all of our configuration will go here
    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'src/**/*.js']
    },


     uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/all.min.js': ['src/js/Assignment7.js', 'src/js/CRUD.js' , 'src/js/parse.js']         }
      }
    }

});

// ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  
  grunt.registerTask('default', ['uglify','jshint']);
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
}