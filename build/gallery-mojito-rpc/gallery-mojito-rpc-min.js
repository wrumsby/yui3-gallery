YUI.add("gallery-mojito-rpc",function(c){function b(d){this._mojit_proxy=d.url;if(c.Lang.isArray(d.methods)){c.each(d.methods,c.bind(b.addMethod,null,this));}}b.addMethod=function(f,d,e){if(f[d]&&!e){return;}f[d]=function(){var g=c.Array(arguments,0,true),h=g[g.length-1],i;if(c.Lang.isFunction(h)||(h&&h.on&&(h.on.success||h.on.failure))){i=g.pop();}return this.exec(d,g,i);};};b.prototype={exec:function(g,e,f){var d={params:{body:{params:e}}};if(c.Lang.isFunction(f)){f={on:{success:f}};}this._mojit_proxy.invoke(g,d,function(j,i){var h={id:null,error:null,result:i};if(j&&f.on.failure){h.error={code:-32000,message:j.message};f.on.failure.call(f.context,h);}else{if(!j&&f){f.on.success.call(f.context,h);}}});}};var a=c.namespace("RPC");a.Mojito=b;a.mojito=function(e,h,f,g,d){if(e&&h){return new b(c.mix({url:e},d)).exec(h,f,g);}};},"gallery-2012.05.16-20-37",{requires:["oop"]});