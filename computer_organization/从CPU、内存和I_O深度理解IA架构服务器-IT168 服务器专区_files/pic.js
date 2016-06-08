;(function(global){
    var HAIYUN_IMG=global.HAIYUN_IMG || {};
    HAIYUN_IMG={
        util:{},    
        effect:{},  
        core:{} 
    };
    HAIYUN_IMG.util={
        send_r:function(url){
            var oImg=new Image();
            oImg.src=url;
        },
        getWinWidth: function() {
            return document.documentElement.clientWidth;
        },
        getWinHeight: function() {
            return document.documentElement.clientHeight;
        },
        getLocation:function(){
            return encodeURIComponent(document.location);
        },
        getReferer:function(){
            return encodeURIComponent(document.referrer);
        },
        t:function(){
            return +new Date();
        },
        setCookie:function(name,value,time){
            if(time){
                var oDate = new Date();
                oDate.setTime(oDate.getTime() + expire * 864e5);
                document.cookie=name + "=" + value + ";expires=" + oDate.toGMTString()+";path=/";
            }else{
                if(window.localStorage){
                    localStorage.setItem(name,value);
                }else{
                    document.cookie=name + "=" + value + ";path=/";
                }
            }
        },
        getCookie:function(name){
            if(window.localStorage){
                return localStorage.getItem(name);
            }else{
                return (name = (document.cookie).match("\\b" + name + "=([^;]*)\\b")) ? name[1] : undefined;
            }
        },
        bind:function(obj,sEv,fn){
            if(obj.addEventListener){
                obj.addEventListener(sEv,fn,false);
            }else{
                obj.attachEvent('on'+sEv,fn);
            }
        },
		documentWrite: function(url) {
			try{
				if(url.indexOf('</script>')!=-1){
					document.writeln("<div>"+url+"</div>");
				}else{
					document.writeln("<div><script src=\'"+url+"\'></script></div>");
				}
			}catch(e){}
		},
		monitor: function(url) {
        var callScript = HAIYUN_IMG.util.send_r;
        huzhong_url = new Array;
        huzhong_url = url.split(",");
			for (i = 0; i < huzhong_url.length; i++) {
				callScript(decodeURIComponent(huzhong_url[i]))
			}
		},		
        unbind:function(obj,sEv,fn){
            if(obj.removeEventListener){
                obj.removeEventListener(sEv,fn,false);
            }else{
                obj.detachEvent('on'+sEv,fn);
            }
        }
    };
    HAIYUN_IMG.effect={
        showImg:function(json){
            json=json || {};
            if(json.imgType!=1)return; 
            json.clickUrl=json.clickUrl || 'http://www.baidu.com';
            json.width=json.width || 300;
            json.height=json.height || 300;
            json.imgpath=json.imgpath || 'https://www.baidu.com/img/bd_logo1.png';
            json.avsrUrl=json.avsrUrl || 'http://www.morenzhanshi.com';
            json.acsrUrl=json.acsrUrl || 'http://www.click.cn';
			json.showMonitorUrl=="0"?json.showMonitorUrl=null:json.showMonitorUrl;
			json.clickMonitorUrl=="0"?json.clickMonitorUrl=null:json.clickMonitorUrl;
			
			var monitor=HAIYUN_IMG.util.monitor;

            var objID='HAIYU'+Math.random().toString(36).substring(2)+new Date().getTime();
            var str='';
            str='<a id="'+objID+'" href="'+json.clickUrl+'" target="_blank" style="border:none; outline:none;">'
                +'<img src="'+json.imgpath+'" width="'+json.width+'" height="'+json.height+'" style="border:0 none;">'
                +'</a>';
            document.write(str);
            var bind=HAIYUN_IMG.util.bind;
            var unbind=HAIYUN_IMG.util.unbind;
            var nowObj=document.getElementById(objID);
            function clickShow(){
                HAIYUN_IMG.core.clickRequest(json.acsrUrl,json);
				json.clickMonitorUrl!=null?monitor(json.clickMonitorUrl):"";
            }
            if(nowObj){
                bind(nowObj,'click',clickShow);  
            }
            HAIYUN_IMG.core.showRequest(json.avsrUrl,json);
			HAIYUN_IMG.util.send_r(json.winUrl);
			json.showMonitorUrl!=null?monitor(json.showMonitorUrl):"";
        },
        showFlash:function(json){
            json=json || {};
            if(json.imgType!=2)return;
            json.adid=json.adid || 1;
            json.imgid=json.imgid || 1;
            json.publisherid=json.publisherid || 1;
            json.clickUrl=json.clickUrl || 'http://www.baidu.com'; 
            json.width=json.width || 300;
            json.height=json.height || 300;
            json.imgpath=json.imgpath || 'http://demo.zhinengshe.com/strive/1.swf';
            json.avsrUrl=json.avsrUrl || 'http://www.morenzhanshi.com';
            json.acsrUrl=json.acsrUrl || 'http://www.click.cn';
			json.showMonitorUrl=="0"?json.showMonitorUrl=null:json.showMonitorUrl;
			json.clickMonitorUrl=="0"?json.clickMonitorUrl=null:json.clickMonitorUrl;
			var monitor=HAIYUN_IMG.util.monitor;
            var t=new Date().getTime();
            var objID='HAIYU'+Math.random().toString(36).substring(2)+t;
            document.write('<embed wmode="transparent" src="'+json.imgpath+'" width="'+json.width+'" height="'+json.height+'" id="e1'+t+'"/>');
            var oE=document.getElementById('e1'+t);
            if(oE){
                document.write('<a target="_blank" id="'+objID+'" href="'+json.clickUrl+'" style="width:'+oE.offsetWidth+'px; height:'+oE.offsetHeight+'px; display:block; position: absolute; left:'+oE.offsetLeft+'px; top:'+oE.offsetTop+'px; background:#488;opacity:0; filter:alpha(opacity:0);">strive</a>');
            }
            var my_a_layer=document.getElementById(objID);
            var timer=setInterval(function(){
                if(!my_a_layer){
                    if(oE){
                        document.write('<a target="_blank" id="'+objID+'" href="'+json.clickUrl+'" style="width:'+oE.offsetWidth+'px; height:'+oE.offsetHeight+'px; display:block; position:absolute; left: '+oE.offsetLeft+'px; top:'+oE.offsetTop+'px; background:#488;opacity:0; filter:alpha(opacity:0);">strive</a>');
                    }
                }else{
                    clearInterval(timer);
                }
            },30);
            var bind=HAIYUN_IMG.util.bind;
            var unbind=HAIYUN_IMG.util.unbind;
            var nowObj=document.getElementById(objID);
            function clickShow(){
                HAIYUN_IMG.core.clickRequest(json.acsrUrl,json);
				json.clickMonitorUrl!=null?monitor(json.clickMonitorUrl):"";
            }
            if(nowObj){
                bind(nowObj,'click',clickShow); 
            }
            HAIYUN_IMG.core.showRequest(json.avsrUrl,json);
			HAIYUN_IMG.util.send_r(json.winUrl);
			json.showMonitorUrl!=null?monitor(json.showMonitorUrl):"";
        }
    };
    HAIYUN_IMG.core={
        init:function(json){
		var documentWrite=HAIYUN_IMG.util.documentWrite;
            switch(Number(json.type)){
                case 1:
                    switch(Number(json.imgType)){
                        case 1:
                            HAIYUN_IMG.effect.showImg(json);
                            break;
                        case 2:
                        case 3:
                            HAIYUN_IMG.effect.showFlash(json);
                            break;
                    }
                    break;
                case 2:
                    if(!json.jscode)return;
					documentWrite(json.jscode);
                    break;
                case 3: //网页
                    if(!json.imgpath)return;
                    document.write('\<iframe src="'+ json.imgpath +'" width="'+json.width +'" height="' + json.height + '" frameborder="0"  scrolling="no" ></iframe>');
                    break;
            }
        },
        showRequest:function(url,json){
            var processingtime=HAIYUN_IMG.util.t(),
                sw=HAIYUN_IMG.util.getWinWidth() || null,
                sh=HAIYUN_IMG.util.getWinHeight() || null,
                beforeUrl=HAIYUN_IMG.util.getReferer() || null,
                nowUrl=HAIYUN_IMG.util.getLocation();
            var avsrdata='{"imgid":"'+json.imgid+'","publisherid":"'+json.publisherid+'","processingtime":"'+processingtime+'","cookies":"123","screenwidth":"'+sw+'","screenheight":"'+sh+'","floorPrice":"'+json.floorPrice+'","memberid":"'+json.memberid+'","requestId":"'+requestid+'","bidId":"'+bidid+'","impId":"'+impid+'","sourceurl":"'+beforeUrl+'","targeturl":"'+nowUrl+'"}';
            HAIYUN_IMG.util.send_r(url+'?avsrdata='+avsrdata);
        },
        clickRequest:function(url,json){
            var processingtime=HAIYUN_IMG.util.t(),
                sw=HAIYUN_IMG.util.getWinWidth() || null,
                sh=HAIYUN_IMG.util.getWinHeight() || null,
                beforeUrl=HAIYUN_IMG.util.getReferer() || null,
                nowUrl=HAIYUN_IMG.util.getLocation();
            var acsrdata='{"imgid":"'+json.imgid+'","publisherid":"'+json.publisherid+'","processingtime":"'+processingtime+'","cookies":"123","screenwidth":"'+sw+'","screenheight":"'+sh+'","floorPrice":"'+json.floorPrice+'","memberid":"'+json.memberid+'","requestId":"'+requestid+'","bidId":"'+bidid+'","impId":"'+impid+'","sourceurl":"'+beforeUrl+'","targeturl":"'+nowUrl+'"}';
            HAIYUN_IMG.util.send_r(url+'?acsrdata='+acsrdata);
        }
    };
    HAIYUN_IMG.core.init({
     type:type,
     imgType:imgType,
     clickUrl:clickUrl,
     avsrUrl:avsrUrl,
     acsrUrl:acsrUrl,
     width:width,
     height:height,
     publisherid:publisherid,
     imgid:imgid,
     imgpath:imgpath,
	 effect:effect,
	 showMonitorUrl:showMonitorUrl,
	 clickMonitorUrl:clickMonitorUrl,
	 memberid:memberid,
	 floorPrice:floorPrice,
	 winUrl:winUrl,
      requestid:requestid,
      bidid:bidid,
      impid:impid
    });
})(window);