'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var context = {};
var NgRequireGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = require('../package.json');

    this.on('end', function() {
      this.installDependencies({
        bower: true,
        npm: true,
        skipInstall: this.options['skip-install'],
        skipMessage: this.options['skip-install'],
        callback: function() {
          console.log(chalk.bold.green('\nEverything is ready!, just run')
                  + chalk.bold.yellow(' grunt serve.'));
        }
      });
    });
  },
  askFor: function() {

    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the marvelous NgRequire generator!'));
      //codeBusters brand.
      console.log('\t\t\t' + chalk.bold.white('code') + chalk.bold.red('Busters')
              + chalk.bold.white(' S.L.') + '\n\n');
    }

    var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'How would you like to name your application?',
        default: 'codeBusters'
      }];

    this.prompt(prompts, function(props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },
  askForLess: function() {
    var done = this.async();

    this.prompt([{
        type: 'confirm',
        name: 'less',
        message: 'Would you like to use Less?',
        default: false
      }], function(props) {
      this.less = props.less;

      done();
    }.bind(this));
  },
  askForSEO: function() {
    var done = this.async();
    context = {
      'indexTitle': '',
      'indexDescription': ''
    };
    this.prompt([{
        type: 'confirm',
        name: 'seo',
        message: 'Would you like to configure basic SEO data?',
        default: true
      }], function(props) {
      this.seo = props.seo;
      if (this.seo) {
        var questions = [
          {
            type: "input",
            name: "indexTitle",
            message: "Enter index title"
          },
          {
            type: "input",
            name: "indexDescription",
            message: "Enter index description"
          }
        ];
        this.prompt(questions, function(answers) {
          context.indexTitle = answers.indexTitle;
          context.indexDescription = answers.indexDescription;
          done();
        });
      } else {
        done();
      }
    }.bind(this));
  },
  askForTheme: function() {
    var done = this.async();
    var prompts = [
      {
        type: "list",
        name: "theme",
        message: "Choose theme",
        choices: ["Snow", "Stark"],
        filter: function(val) {
          return val.toLowerCase();
        }
      }
    ];
    this.prompt(prompts, function(props) {
      this.theme = props.theme;
      done();
    }.bind(this));
  },
  app: function() {
    var context = {
      appConfig: {
        app: 'app',
        dist: 'dist'
      },
      connect: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      less: this.less,
      appName: this.appName
    };
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_bowerrc', 'bowerrc');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.template('_gruntfile.js', 'Gruntfile.js', context);
    this.copy('_karma.conf.js', 'karma.conf.js');
    this.copy('_karma-e2e.conf.js', 'karma-e2e.conf.js');

  },
  scaffoldFolders: function() {
    this.mkdir('app');
    // TODO add assert for inner files in test
    this.directory('_app/_config', 'app/config');
    // TODO add assert for inner files in test
    this.mkdir('app/styles');
    // TODO add assert for inner files in test
    this.directory('_app/_images', 'app/images');
    // TODO add assert for inner files in test
    this.directory('_app/_scripts', 'app/scripts');
    this.mkdir('test');
  },
  appFiles: function() {
    // TODO for now only copying
    this.copy('_app/_404.html', 'app/404.html');
    this.copy('_app/_favicon.ico', 'app/favicon.ico');
    this.copy('_app/htaccess', 'app/.htaccess');
    this.copy('_app/_robots.txt', 'app/robots.txt');

    this.template('_app/_index.template.html', 'app/index.template.html', context);
    //Copy style file
    if (this.less) {
      this.copy('_app/_styles/'+this.theme+'.less', 'app/styles/main.less');
    } else {
      this.copy('_app/_styles/'+this.theme+'.css', 'app/styles/main.css');
    }
  },
  projectFiles: function() {
  }
});

module.exports = NgRequireGenerator;
