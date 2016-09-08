module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {}
      }
    },

    watch: {
      js: {
        files: ['src/**/*.js'],
        tasks: ['concat']
      }
    },

    concat: {
      options: {
        sourceMap: true
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/main.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'connect', 'watch']);
}
