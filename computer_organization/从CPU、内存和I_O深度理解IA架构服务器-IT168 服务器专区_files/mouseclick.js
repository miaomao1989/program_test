
var bfdBdiCallBack=function (data) {};
(function() {
	
	//实施调用必须
	function MouseClick() {
		this.begin=function() {
			clickControl.begin();			
		}
	}	 
	BCore.exts.MouseClick2=MouseClick;
	
	//收集数据业务逻辑代码
	var clickControl={
		options: {
			security: "1",
            hook: "bfd_hook",
			mode: 0
		},
		inited: false,
		location_ctrl: function() {
			var hash = window.location.hash;
			this.options.mode = 0;
			if (window.location.href.indexOf("bdf_page_doctor")!==-1) {
				this.options.mode = 1;
			}
			return this.options.mode;
		},
		begin: function() {
            var me = this;
            if (this.inited === true) return;
            this.inited = true;
			//获取当前页面脚本模式(0:抓取数据模式; 1:页面医生展示数据模式)
            var mode = this.location_ctrl();
            switch (mode) {
                case 0:
					this.bindMouseClick();
					break;
                case 1:
					if (window.addEventListener) {
						window.addEventListener("message", function(e) {
							me.show_heatlink(e.data);
						});
					}					
					else {
						window.attachEvent("onmessage", function(e) {
							me.show_heatlink(e.data);
						});
					}
					//脚本加载成功的消息
					window.parent.postMessage(JSON.stringify({
						loaded: true
					}), "*");
					break;
                default:
					break;
            }
        },
        show_heatlink: function(p) {
            try {
                var param = eval("(" + p + ")");
                loadScript( pDoctorConfig.jsPath, 
                function() {
                    new BFD_HotLinkMask(param)
                })
            } catch(e) {
                // console.log(e)
            }
        },
		eventHandler: function(e) {
			var ev = e || window.event;
			var t = ev.target || ev.srcElement;
			var i=clickControl.getParentAlabel(t);
			if(i.tagName.toLowerCase()==="a") {
				var hook_id;
				switch (Number(clickControl.options.security)) {
					case 0:
						if ("undefined" != typeof clickControl.options.hook && "" !== clickControl.options.hook) {
							hook_id = t.getAttribute(clickControl.options.hook);
							if (undefined === hook_id || null === hook_id) return

						} else return;
						break;
					case 1:
						if ("undefined" !== typeof clickControl.options.hook && "" !== clickControl.options.hook) {
							hook_id = t.getAttribute(clickControl.options.hook);
						}
						break;
					default:
					return
				}
				
				var href = clickControl.getHref(i);				
				// if (ev.button || ev.button === 0) if (ev.button !== 1 && ev.button !== 0) return;
				if (!href && !(i.tagName.toLowerCase() == "input" && i.type == "button")) return;
				var _st = document.body.scrollTop || document.documentElement.scrollTop;
				var _cw = document.documentElement.offsetWidth;
				var _ch = document.documentElement.clientHeight;
				// var offsetX = ev.clientX;
				// var offsetY = ev.clientY + _st;
				var source = window.location.href;
				if (/[#\?]/.test(source[source.length - 1])) source = source.substring(0, source.length - 1);
				var xpath = clickControl.readXPath(i);
				var param = {
					pth: xpath,
					lt: 0,
					tp: 0,
					ep: encodeURIComponent(source),
					ln: encodeURIComponent(href || location.href),
					hook: hook_id,
					cid: BCore.prototype.options.cid
				};
				clickControl.sendReq(param);
			}
		},
        bindMouseClick: function() {

            bind(document, "click", mouseDownHandler, true);
			
            function mouseDownHandler(event) {
				try {
					if(event.clientX!==0 || event.clientY!==0) {
						clickControl.eventHandler(event);
					}								
				}                
				catch(e) {
					// console.log(e);
					// alert(e.stack);
				}
            }
        },
		saveEventParam: function(param) {
			var mc = new BCore.inputs.UserAction("LinkClick");
			for (var prop in param) {
				mc[prop] = param[prop];
			}
			var rs = new BCore.exts.RequestSave;
			rs.save(mc);
		},
        sendReq: function(param) {			
			var url = new BCore.inputs.UserAction("LinkClick").getUrl();
            url = bfdBdiParamsUrl(url, param);
			bfdBdiJsonp(url);	
        },
		readXPath: function(element) {
			if (element.id !== "") return '//*[@id\x3d"' + element.id + '"]';
			if (element == document.body) return "/html/" + element.tagName;
			var ix = 0,
			siblings = element.parentNode.childNodes;
			for (var i = 0, l = siblings.length; i < l; i++) {
				var sibling = siblings[i];
				if (sibling == element) return arguments.callee(element.parentNode) + "/" + element.tagName + (ix + 1 == 1 ? "": "[" + (ix + 1) + "]");
				else if (sibling.nodeType == 1 && sibling.tagName == element.tagName) ix++
			}
		},
		getHref: function(ele) {
			if (/a/i.test(ele.tagName)) {
				var href = ele.getAttribute("href") == null ? ele.parentNode.getAttribute("href") : ele.getAttribute("href");
				var clickHref = ele.getAttribute("onclick");
				if (!href || href.replace(window.location.protocol + "//" + window.location.host + "/", "") == "#") {
					href=null;
				}
				else if (/^(javascript)/.test(href) && clickHref != null) {
					clickHref = clickHref.substring(clickHref.indexOf("http://"), clickHref.length - 2);
					href = clickHref;
				}
				if (!/^http(s)?:\/\//.test(href)) {
					href = window.location.protocol + "//" + window.location.host + (href.charAt(0) === "/" ? "": "/") + href;
				}
				return href;
			}
			if (ele == document.body) return null;
			return arguments.callee(ele.parentNode);
		},
		getParentAlabel: function (e) {
			while(e.tagName.toLowerCase()!=="a"&&e.tagName.toLowerCase()!=="body") {
				e=e.parentNode;
			}
			return e;		
		}
		
	}
	
	function bfdBdiParamsUrl(url, data, flag) {
		//构造后端所需参数(实际未使用到)
		data["sid"]="123";
		data["tma"]="123";
		data["tmd"]="123";
		data["tmc"]="123";
		data["uid"]="123";
		
		//添加bdi_data
		if(!flag) {
			flag=0
		}
		if(url.indexOf("?") ===-1 ){
			url+="?bfd_jsonp_flag="+flag;
		}else{
			url+="?bfd_jsonp_flag="+flag;;
		}
		//添加参数
		for(var t in data) {
			url += "&"+ t + "=" + data[t];
		}
		return url;
	}
	
	function bfdBdiJsonp(url, callback){		
		//添加callback, 也避免缓存
		if(url.indexOf("?") ===-1 ){
			url+="?callback=bfdBdiCallBack&rid="+(new Date()).getTime();
		}else{
			url+="&callback=bfdBdiCallBack&rid="+(new Date()).getTime();
		}
		//构造jsonp请求
		var script = document.createElement( 'script' );
		// script.setAttribute( 'src', encodeURIComponent(url));
		script.setAttribute( 'src', url);
		script.setAttribute( 'charset', "utf-8" );
		var _head = document.getElementsByTagName("head")[0];
		_head.insertBefore(script,_head.lastChild);
		
		(function sleep(numberMillis) {
			var now = new Date();
			var exitTime = now.getTime() + numberMillis;
			while (true) {
				now = new Date();
				if (now.getTime() > exitTime) {
					return;
				}
			}
		})(300);			
	}
	
    function loadScript(src, callback, id) {
		var s=document.getElementById(id);
		if(s) {
			s.parentNode.removeChild(s);
		}
        s = document.createElement("script");
		s.id=id;
        s.type = "text/" + (src.type || "javascript");
        s.src = src.src || src;
        s.async = false;
		s.charset="UTF-8";
        s.onreadystatechange = s.onload = function() {
            var state = s.readyState;
            if (!callback.done && (!state || /loaded|complete/.test(state))) {
                callback.done = true;
                callback();
            }
        }; 
		(document.getElementsByTagName("body")[0] || document.getElementsByTagName("head")[0]).appendChild(s)
    }
	function bind(node, type, listener, flag) {
		if(node.attachEvent){
			node.attachEvent('on' + type,listener);
		}
		else if(node.addEventListener){
			node.addEventListener(type,listener, flag);
		}
		else {
			
		}
	}
	
})();

	
