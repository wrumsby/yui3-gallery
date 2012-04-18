YUI.add('gallery-node-full-screen', function(Y) {

'use strict';

var FullScreen = Y.FullScreen,
	doc = Y.config.doc,
	prefix = FullScreen._vendorPrefix,
	EVENT_NAME = (prefix + 'fullscreenchange');
	
Y.namespace('Plugin').NodeFullScreen = Y.Base.create('NodeFullScreen', Y.Plugin.Base, [], {
	/**
	 * @private
	 */
	_listener: null,
	
	/**
	 *
	 */
	request: function() {
		var node = this.get('host'),
		
			el = node.getDOMNode();
		
		if (!FullScreen.isSupported()) {
			return;
		}
		
		this._listener = function() {
			FullScreen.fire('change', { node: node });

			FullScreen.once('change', function() {
				if (!FullScreen.isEnabled()) {
					el.removeEventListener(EVENT_NAME, this._listener, true);
				}
			});
		};
		
		// Use addEventListener and removeEventListener because browsers that support FullScreen
		// also support DOM Events
		el.addEventListener(EVENT_NAME, Y.bind(this._listener, this), true);
		
		switch (prefix) {
			case 'webkit':
				el.webkitRequestFullScreen();
				break;
			case 'moz':
				el.mozRequestFullScreen();
				break;
			default:
				el.requestFullScreen();
		}
	}
}, {
	NS: 'fullScreen'
});


}, '@VERSION@' ,{requires:['gallery-full-screen', 'plugin', 'base-build', 'node-pluginhost'], skinnable:false});
