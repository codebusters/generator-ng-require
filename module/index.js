'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var angularUtils = require('../util.js');
var path = require('path');

// TODO: take into account following idea from aaron
//util.inherits(Generator, ScriptBase);

var NgRequireModuleGenerator = yeoman.generators.Base.extend({

  askModuleName: function () {

    var done = this.async();

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the marvelous NgRequire module generator!'));
    }

    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'How would you like to name your module?',
      default: 'module_name'
    }];

    this.prompt(prompts, function (props) {

      this.moduleName = this._.underscored(props.moduleName);
      this.moduleNameTitle = this._.classify(props.moduleName);

      this.angularModuleName = this.moduleNameTitle + 'Module';
      this.moduleControllerClass = this.moduleNameTitle + 'Controller';

      this.appPath = 'app';
      this.moduleRelativePath = path.join('modules', this.moduleName);
      this.modulePath = path.join(this.appPath, 'scripts', this.moduleRelativePath);

      this.controllerFile = this.moduleName + '_ctrl';
      this.routeFile = this.moduleName + '_route';

      done();
    }.bind(this));
  },

  module: function () {

    this.mkdir(this.modulePath);
    this.mkdir(path.join(this.modulePath, 'templates'));

    this.copy('_module/_templates/_template.html',
        path.join(this.modulePath, 'templates', this.moduleName + '.tpl.html'));

    this.copy('_module/_controller.js', path.join(this.modulePath, this.controllerFile + '.js'));

    this.copy('_module/_route.js', path.join(this.modulePath, this.routeFile + '.js'));

    // TODO add module tests files
  },

  injectDependenciesToApp : function () {

    angularUtils.injectIntoFile(
      this.appPath,
      path.join(this.moduleRelativePath, this.controllerFile),
      this.angularModuleName
    );

  }

});

module.exports = NgRequireModuleGenerator;
