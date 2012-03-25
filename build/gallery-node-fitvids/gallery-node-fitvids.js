YUI.add('gallery-node-fitvids', function(Y) {

/**
 *
 *
 * <p>
 * <code>
 * &#60;script type="text/javascript"&#62; <br>
 * <br>
 *       //  Call the "use" method, passing in "gallery-node-fitvids".  This will <br>
 *       //  load the script and CSS for the FitVids Node Plugin and all of <br>
 *       //  the required dependencies. <br>
 * <br>
 *       YUI().use("gallery-node-fitvids", function(Y) { <br>
 * <br>
 *           //  Use the "contentready" event to initialize the accordion when <br>
 *           //  the element that represente the accordion <br>
 *           //  (&#60;div id="accordion-1"&#62;) is ready to be scripted. <br>
 * <br>
 *           Y.on('contentready', function () { <br>
 * <br>
 *               //  The scope of the callback will be a Node instance <br>
 *               //  representing the container element (&#60;div id="container"&#62;). <br>
 *               //  Therefore, since "this" represents a Node instance, it <br>
 *               //  is possible to just call "this.plug" passing in a <br>
 *               //  reference to the FitVids Node Plugin. <br>
 * <br>
 *               this.plug(Y.Plugin.NodeFitVids); <br>
 * <br>
 *           }, '#container'); <br>
 * <br>      
 *       }); <br>
 * <br>  
 *   &#60;/script&#62; <br>
 * </code>
 * </p>
 *
 * Based on FitVids 1.0
 *
 * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 * @module gallery-node-fitvids
 */

'use strict';

var CLASS_NAME = Y.ClassNameManager.getClassName('fluid-width-video-wrapper'),

	ANCESTOR_SELECTOR = '.' + CLASS_NAME,
	
	DATA_KEY = 'fitvids:originalAttributes',

	SELECTORS = [
		'iframe[src^="http://player.vimeo.com"]',
		'iframe[src^="http://www.youtube.com"]',
		'iframe[src^="http://www.kickstarter.com"]',
		'object',
		'embed'
	];

function getSelectors(customSelector) {
	var selectors = [].concat(SELECTORS);
	
	if (customSelector) {
		selectors.push(customSelector);
	}

	return selectors.join(',');
}

/**
 *
 * @namespace Y.Plugin
 * @class NodeFitVids
 * @extends Plugin.Base
 */
Y.namespace('Plugin').NodeFitVids = Y.Base.create('NodeFitVids', Y.Plugin.Base, [], {
	initializer: function(config) {
		var host = this.get('host'),
			query = getSelectors(this.get('customSelector')),
			self = this;

		if (!Y.instanceOf(host, Y.Node)) {
			return;
		}

		host.all(query).each(function() {
			var tagName = this.get('tagName'),
				parentNode = this.get('parentNode'),
				data = {},
				height,
				width,
				aspectRatio;

			if ((tagName === 'EMBED' && parentNode.get('tagName') === 'OBJECT') || parentNode.hasClass(CLASS_NAME)) {
				return;
			}

			height = tagName === 'OBJECT' ? this.get('height') : this.getComputedStyle('height');
			width = this.getComputedStyle('width');
			aspectRatio = parseInt(height, 10) / parseInt(width, 10);

			this.wrap('<div class="' + CLASS_NAME + '"></div>');
			this.ancestor(ANCESTOR_SELECTOR).setStyle('paddingTop', (aspectRatio * 100) + '%');

			if (this.get('height')) {
				data.height = this.get('height');
				this.removeAttribute('height');
			}
			
			if (this.get('width')) {
				data.width = this.get('width');
				this.removeAttribute('width');
			}

			// Save the original values of the height and width so we can restore them on unplug()
			this.setData(DATA_KEY, data);
		});
	},
	
	
	destructor: function() {
		var host = this.get('host'),
			query = getSelectors(this.get('customSelector')),
			self = this;
		
		if (!Y.instanceOf(host, Y.Node)) {
			return;
		}
		
		host.all(query).each(function() {
			var tagName = this.get('tagName'),
				originalDimensions;
			
			if (this.ancestor(ANCESTOR_SELECTOR)) {
				this.unwrap();

				originalDimensions = this.getData(DATA_KEY) || {};
				
				if (originalDimensions.height) {
					this.set('height', originalDimensions.height);
				}

				if (originalDimensions.width) {
					this.set('width', originalDimensions.width);
				}
				
				this.clearData(DATA_KEY);
			}
		});
	}
}, {
	NS: 'fitvids',
	
	ATTRS: {
		/**
		 *
		 * @attribute customSelector
		 * @type String
		 * @writeOnce
		 */
		customSelector: null
	}
});


}, '@VERSION@' ,{skinnable:false, requires:['plugin', 'base-build', 'node-base', 'node-style', 'node-pluginhost', 'classnamemanager']});
