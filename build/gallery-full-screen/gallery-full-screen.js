YUI.add('gallery-full-screen', function(Y) {

'use strict';

var doc = Y.config.doc,
	Lang = Y.Lang;

function FullScreen(config) {
	FullScreen.superclass.constructor.apply(this, arguments);
}

FullScreen.NAME = 'fullScreen';

FullScreen.ATTRS = {
	'node': {
		value: null,
		readOnly: true
	}
};

Y.extend(FullScreen, Y.Base, {
	_isSupported: false,
	
	_vendorPrefix: '',
	
	initializer: function() {
		this.publish('change', {
			emitFacade: true,
			broadcast: 2
		});
	
		this.before('change', function(e) {
			var isEnabled = this.get('enabled');
		
			this._set('node', isEnabled ? e.node : null);
		});
	},
	
	/**
	 *
	 */
	isSupported: function() {
		return this._isSupported;
	},
	
	/**
	 *
	 */
	isEnabled: function() {
		if (!supportsFullScreen) {
			return false;
		}
		
		switch (this._vendorPrefix) {
			case 'webkit':
				return doc.webkitIsFullScreen;
			case 'moz':
				return doc.mozFullScreen;
			default:
				return Lang.isUndefined(doc.fullscreenEnabled) ? doc.fullScreen : doc.fullscreenEnabled;
		}
	},
	
	/**
	 *
	 */
	exitFullscreen: function() {
		if (!supportsFullScreen) {
			return;
		}
		
		switch (this._vendorPrefix) {
			case 'webkit':
				doc.webkitCancelFullScreen();
				break;
			case 'moz':
				doc.mozCancelFullScreen();
				break;
			default:
				doc.exitFullscreen();
		}
		
		this.fire('change', { node: null });
	}
});

Y.FullScreen = new FullScreen();

(function() {
	var VENDOR_PREFIXES = new Y.ArrayList(['webkit', 'moz']);
	
	if (!Y.Lang.isUndefined(doc.cancelFullScreen) || !Y.Lang.isUndefined(doc.exitFullScreen)) {
		Y.FullScreen._isSupported = true;
	} else {
		// TODO: use the functional programming model to do a .some()
		VENDOR_PREFIXES.each(function(item) {
			if (!Y.FullScreen._isSupported && !Y.Lang.isUndefined(doc[item + 'CancelFullScreen'])) {
				Y.FullScreen._isSupported = true;
				Y.FullScreen._vendorPrefix = item;
				return;
			}
		});
	}
}());


}, '@VERSION@' ,{requires:['arraylist', 'base-build'], skinnable:false});
