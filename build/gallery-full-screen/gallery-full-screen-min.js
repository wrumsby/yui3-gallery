YUI.add("gallery-full-screen",function(d){var c=d.config.doc,b=d.Lang;function a(e){a.superclass.constructor.apply(this,arguments);}a.NAME="fullScreen";a.ATTRS={"node":{value:null,readOnly:true}};d.extend(a,d.Base,{_isSupported:false,_vendorPrefix:"",initializer:function(){this.publish("change",{emitFacade:true,broadcast:2});this.before("change",function(g){var f=this.get("enabled");this._set("node",f?g.node:null);});},isSupported:function(){return this._isSupported;},isEnabled:function(){if(!supportsFullScreen){return false;}switch(this._vendorPrefix){case"webkit":return c.webkitIsFullScreen;case"moz":return c.mozFullScreen;default:return b.isUndefined(c.fullscreenEnabled)?c.fullScreen:c.fullscreenEnabled;}},exitFullscreen:function(){if(!supportsFullScreen){return;}switch(this._vendorPrefix){case"webkit":c.webkitCancelFullScreen();break;case"moz":c.mozCancelFullScreen();break;default:c.exitFullscreen();}this.fire("change",{node:null});}});d.FullScreen=new a();(function(){var e=new d.ArrayList(["webkit","moz"]);if(!d.Lang.isUndefined(c.cancelFullScreen)||!d.Lang.isUndefined(c.exitFullScreen)){d.FullScreen._isSupported=true;}else{e.each(function(f){if(!d.FullScreen._isSupported&&!d.Lang.isUndefined(c[f+"CancelFullScreen"])){d.FullScreen._isSupported=true;d.FullScreen._vendorPrefix=f;return;}});}}());},"@VERSION@",{requires:["arraylist","base-build"],skinnable:false});