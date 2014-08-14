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
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    
    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the marvelous NgRequire generator!'));
    }

    var prompts = [{
      type: 'confirm',
      name: 'appName',
      message: 'How would you like to name your application?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  app: function () {

    var context = {
      appName: this.appName
    };

    this.copy('_package.json', 'package.json');
    this.template("_bower.json", "bower.json", context);
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
//    this.mkdir('app/scripts');
//    this.mkdir('app/scripts/modules');
  },

  appFiles: function () {

    // TODO for now only copying
    this.copy('_app/_404.html', 'app/404.html');
    this.copy('_app/_favicon.ico', 'app/favicon.ico');
    this.copy('_app/_.htaccess', 'app/.htaccess');
    this.copy('_app/_index.html', 'app/index.html');
    this.copy('_app/_robots.txt', 'app/robots.txt');
    this.copy('_app/_index.template.html', 'app/index.template.html');

  },

  projectFiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = NgRequireGenerator;
