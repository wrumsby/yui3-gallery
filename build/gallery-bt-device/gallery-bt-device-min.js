YUI.add("gallery-bt-device",function(c){var a=null,b={Name:null,OS:null,OS_Version:0,Borwser:null,getTouchSupport:function(){return((c.config.win&&("ontouchstart" in c.config.win))&&!(c.UA.chrome&&c.UA.chrome<6));},getPositionFixedSupport:function(){var e,d;if(a!==null){return a;}e=c.one(".bt_posfixed")||c.one("body").appendChild('<div class="bt_posfixed"><div><span></span></div></div>');d=e.one("div").set("scrollTop","30px").one("span").getY();e.remove();return a=(d===1);},getDeviceWidth:function(){return screen.width;},getDeviceHeight:function(){return screen.height;},getBrowserWidth:function(){return window.innerWidth;},getBrowserHeight:function(){return window.innerHeight;}};if(c.UA.iphone){b.Name="iphone";b.OS="Apple";b.OS_Version=c.UA.iphone;b.Browser="safari";b.B_Version=c.UA.safari;}else{if(c.UA.ipad){b.Name="ipad";b.OS="Apple";b.OS_Version=c.UA.ipad;b.Browser="safari";b.B_Version=c.UA.safari;}else{if(c.UA.ipod){b.Name="ipad";b.OS="Apple";b.OS_Version=c.UA.ipod;b.Browser="safari";b.B_Version=c.UA.safari;}else{if(c.UA.mobile==="Android"){b.Name="android";b.OS="android";b.OS_Version=c.UA.android;b.Browser="webkit";b.B_Version=c.UA.webkit;}else{if(c.UA.ie){b.Browser="ie";b.B_Version=c.UA.ie;}else{if(c.UA.gecko){b.Browser="firefox";b.B_Version=c.UA.gecko;}else{if(c.UA.chrome){b.Browser="chrome";b.B_Version="chrome";}}}}}}}c.namespace("Bottle").Device=b;},"@VERSION@",{requires:["node-screen"]});