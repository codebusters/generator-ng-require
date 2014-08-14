'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var NgRequireGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {

      this.installDependencies({
        bower: true,
        npm: true,
        skipInstall: this.options['skip-install'],
        skipMessage: this.options['skip-install'],
        callback: function () {
          console.log('Everything is ready!, just run grunt serve.');
        }
      });
      
    });
    
  },

  askFor: function () {
    
    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the marvelous NgRequire generator!'));
    }

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'How would you like to name your application?',
      default: 'codeBusters'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  app: function () {

//    var context = {
//      appName: this.appName
//    };

    this.copy('_package.json', 'package.json');
//    this.template('_package.json', 'package.json', context);
    this.copy('_bower.json', 'bower.json');
//    this.template("_bower.json", "bower.json", context);
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('_gruntfile.js', 'Gruntfile.js');
    this.copy('_karma.conf.js', 'karma.conf.js');
    this.copy('_karma-e2e.conf.js', 'karma-e2e.conf.js');

  },

  scaffoldFolders: function(){
    this.mkdir('app');
    // TODO add assert for inner files in test
    this.directory('_app/_config', 'app/config');
    // TODO add assert for inner files in test
    this.directory('_app/_styles', 'app/styles');
    // TODO add assert for inner files in test
    this.directory('_app/_images', 'app/images');
    // TODO add assert for inner files in test
    this.directory('_app/_scripts', 'app/scripts');
    this.mkdir('test');
  },

  appFiles: function () {

    // TODO for now only copying
    this.copy('_app/_404.html', 'app/404.html');
    this.copy('_app/_favicon.ico', 'app/favicon.ico');
    this.copy('_app/htaccess', 'app/.htaccess');
    this.copy('_app/_index.html', 'app/index.html');
    this.copy('_app/_robots.txt', 'app/robots.txt');
    this.copy('_app/_index.template.html', 'app/index.template.html');

  },

  projectFiles: function () {
  }
});

module.exports = NgRequireGenerator;
