YUI.add("gallery-formmgr-overlay-plugin",function(b){function a(){a.superclass.constructor.apply(this,arguments);}a.NAME="OverlayFormPlugin";a.NS="form";a.ATTRS={formmgr:{writeOnce:true}};b.extend(a,b.Plugin.Base,{initializer:function(c){var d=this.get("host").get("contentBox").one("form");if(!d.get("name")){d.set("name",b.guid("form-overlay-"));}this.set("formmgr",new b.FormManager(d.get("name")));this.onHostEvent("visibleChange",function(f){if(f.newVal&&!this.get("formmgr").prepareForm()){f.halt();}});this.afterHostEvent("visibleChange",function(f){if(f.newVal){this.get("formmgr").initFocus();}else{this.get("formmgr").clearForm();}});}});b.namespace("Plugin");b.Plugin.OverlayForm=a;},"gallery-2012.05.16-20-37",{requires:["plugin","overlay","gallery-formmgr"]});