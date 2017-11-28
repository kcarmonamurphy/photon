/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
let Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  	let app = new EmberApp(defaults, {
		outputPaths: {
	  		app: {
				html: 'index.html',
				css: {
		  			'app': '/assets/css/photon.css'
				},
				js: '/assets/js/photon.js'
	  		},
	  		vendor: {
				css: '/assets/css/vendor.css',
				js: '/assets/js/vendor.js'
	  		}
		},
		sassOptions: {
	  		includePaths: ['node_modules/materialize-css/sass/']
		}
  	});

    //materialize
  	app.import('node_modules/materialize-css/dist/js/materialize.js');

    //keypress
  	app.import('vendor/dmauro-keypress/keypress.js');

    //photoswipe
  	app.import('node_modules/photoswipe/dist/photoswipe.js');
  	app.import('node_modules/photoswipe/dist/photoswipe-ui-default.js');
  	app.import('node_modules/photoswipe/dist/photoswipe.css');

	let materializeRobotoFont = new Funnel('node_modules/materialize-css/dist/fonts/roboto', {
	  	srcDir: '/',
	  	include: ['*'],
	  	destDir: 'assets/fonts/roboto'
  	});

  	let photoswipeDefaultSkin = new Funnel('node_modules/photoswipe/dist/default-skin', {
	  	srcDir: '/',
	  	include: ['*'],
	  	destDir: 'assets/css/default-skin'
  	});

	// Use `app.import` to add additional libraries to the generated
	// output files.
	//
	// If you need to use different assets in different
	// environments, specify an object as the first parameter. That
	// object's keys should be the environment name and the values
	// should be the asset to use in that environment.
	//
	// If the library that you are including contains AMD or ES6
	// modules that you would like to import into your application
	// please specify an object with the list of modules as keys
	// along with the exports of each module as its value.

  	return app.toTree([materializeRobotoFont, photoswipeDefaultSkin]);
};
