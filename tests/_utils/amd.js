/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals bender, define, require */

'use strict';

/**
 * AMD tools related to CKEditor.
 */
const amdUtils = {
	getModulePath( modulePath ) {
		if ( modulePath.indexOf( '/' ) < 0 ) {
			modulePath = modulePath + '/' + modulePath;
		}

		return '/ckeditor5/' + modulePath + '.js';
	},

	/**
	 * Shorthand for defining an AMD module.
	 *
	 * For simplicity the dependencies passed to the `body` will be unwrapped
	 * from the ES6 module object (so only the default export will be available). Also the returned value
	 * will be automatically handled as a default export.
	 *
	 * If you need to define a module which has access to other exports or can export more values,
	 * use the global `define()` function:
	 *
	 *		define( '/ckeditor5/my/module.js', [ 'exports', '/ckeditor5/foo/foo.js', ... ], ( FooModule, ... ) {
	 *			const FooClass = FooModule.default;
	 *			const FooOtherProp = FooModule.otherProp;
	 *
	 *			exports.default = MyClass;
	 *			exports.otherProp = 1;
	 *		} );
	 *
	 * **Note:** Since this method automatically unwraps modules from the ES6 module object when passing them
	 * to the `body` function, circular dependencies will not work. If you need them, either use the raw `define()`
	 * as shown above, or keep all the definitions outside modules and only access the variables from the scope:
	 *
	 *		PluginE = createPlugin( 'E' );
	 *		PluginF = createPlugin( 'F' );
	 *
	 *		PluginF.requires = [ PluginE ];
	 *		PluginE.requires = [ PluginF ];
	 *
	 *		amdUtils.define( '/ckeditor5/E/E.js', [ '/ckeditor5/core/plugin.js', '/ckeditor5/F/F.js' ], () => {
	 *			return PluginE;
	 *		} );
	 *
	 *		amdUtils.define( '/ckeditor5/F/F.js', [ '/ckeditor5/core/plugin.js', '/ckeditor5/E/E.js' ], () => {
	 *			return PluginF;
	 *		} );
	 *
	 * @param {String} path Parh to the module.
	 * @param {String[]} deps Dependencies of the module.
	 * @param {Function} body Module body.
	 */
	define( path, deps, body ) {
		if ( arguments.length == 2 ) {
			body = deps;
			deps = [];
		}

		deps = deps.map( amdUtils.getModulePath );

		// Use the exports object instead of returning from modules in order to handle circular deps.
		// http://requirejs.org/docs/api.html#circular
		deps.unshift( 'exports' );

		define( amdUtils.getModulePath( path ), deps, function( exports ) {
			const loadedDeps = Array.from( arguments ).slice( 1 ).map( ( module ) => module.default );

			exports.default = body.apply( this, loadedDeps );
		} );
	},

	/**
	 * Gets an object which holds the CKEditor modules guaranteed to be loaded before tests start.
	 *
	 * @params {...String} module The name of the module to load.
	 * @returns {Object} The object that will hold the loaded modules.
	 */
	require( modules ) {
		const resolved = {};
		const paths = [];
		const names = [];
		const done = bender.defer();

		for ( let name in modules ) {
			names.push( name );
			paths.push( amdUtils.getModulePath( modules[ name ] ) );
		}

		require( paths, function( ...loaded ) {
			for ( let i = 0; i < names.length; i++ ) {
				resolved[ names[ i ] ] = loaded[ i ].default;
			}

			// Finally give green light for tests to start.
			done();
		} );

		return resolved;
	}
};

export default amdUtils;
