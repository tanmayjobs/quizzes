module.exports = function(config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-firefox-launcher'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      browsers: ['Firefox'],
    });
  };