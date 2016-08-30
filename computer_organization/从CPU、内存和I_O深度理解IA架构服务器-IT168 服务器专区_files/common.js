



(function(window, undefined){

	//登录设置
	if(getCookie("sso_username")!=null && getCookie("sso_username")!="undefined"){ 

		jQuery("#LoginFalse").hide(); 
		jQuery("#LoginTrue").show();  
		jQuery("#logintrueName").html(substr(getCookie("sso_username"),10));
		jQuery("#log_out").attr("href","http://u.it168.com/Logout?returnUrl="+location.href);
		
		
		//autoAddEllipsis
		
		jQuery("#LoginTrue").hover(
			function() {
				jQuery('.zhanghao').show();
			},
			function() {
				jQuery('.zhanghao').hide()
		});
	}
	else{
		jQuery("#LoginTrue").hide(); 
		jQuery("#LoginFalse").show();  
		jQuery("#login").attr('href','http://u.it168.com/Login?returnUrl='+escape(top.document.URL));
		jQuery("#Register").attr('href','http://u.it168.com/Register?returnUrl='+escape(top.document.URL))
	}
	
	function getCookie(sName)
	{
	var aCookie = document.cookie.split("; ");
	 for (var i=0; i < aCookie.length; i++){
	var aCrumb = aCookie[i].split("=");
	if (encodeURIComponent(sName) == aCrumb[0])
	  return decodeURIComponent(aCrumb[1]);
	}
	 return null;
			
	  
	}
	
	
	//导航切换
	document.getElementById("nav").onselectstart=function(){return false;}
	if (document.getElementById("nav")){
		var sfEls = document.getElementById("nav").getElementsByTagName("li");
		for (var i=0; i<sfEls.length; i++) {
			//sfEls[i].onmouseover = function() { 
			//	this.className = "all";
			//}
			//sfEls[i].onmouseout=function() {
			//	var _this=this;	
			//		_this.className="";
			//}
			$(sfEls[i]).hover(
				  function () {
					$(this).addClass("all");
				  },
				  function () {
					$(this).removeClass("all");
				  }
				);
			
		}
	}
	//搜索
	jQuery("#SouSearch").submit(
		function ()
		{	
			 var q=document.getElementById("q").value;
			 if(q==""||q=="请输入要查询的关键词")
			 {
				alert("请输入要查询的关键词!");
				return false;
			 }		 
			 document.getElementById("SouSearch").action ="http://sou.it168.com/search?q="+q+"&f="+chanstr;
		}
	)
	
// 切换签
jQuery(".Tab_Nav li").hover(
	function() {
		var idstr= jQuery(this).parent().attr("id");					
		for(var i = 0; i < jQuery(this).parent().find("li").length; i++){
		jQuery("#"+idstr+"_Content" + i).hide();
		}					
		jQuery(this).parent().find("span").attr("class","");
		jQuery(this).find("span").attr("class","here");
		jQuery("#"+idstr+"_Content" + jQuery(this).attr("data")).show();					
	});
	
	//截字
	function substr(str, len)  
	{  
		if( ! str || ! len)  
		{  
			return '';  
		}  
		// 预期计数：中文2字节，英文1字节  
		var a = 0;  
		// 循环计数  
		var i = 0;  
		// 临时字串  
		var temp = '';  
		for (i = 0; i < str.length; i ++ )  
		{  
			if (str.charCodeAt(i) > 255)  
			{  
				// 按照预期计数增加2  
				a += 2;  
			}  
			else  
			{  
				a ++ ;  
			}  
			// 如果增加计数后长度大于限定长度，就直接返回临时字符串  
			if(a > len)  
			{  
				return temp;  
			}  
			// 将当前内容加到临时字符串  
			temp += str.charAt(i);  
		}  
		// 如果全部是单字节字符，就直接返回源字符串  
		return str;  
	}
	

	/*相关文档start */
	try 
	{
		if((channelpropertyid==10||channelpropertyid==19||channelpropertyid==18||channelpropertyid==4||channelpropertyid==296||channelpropertyid==13||channelpropertyid==283||channelpropertyid==20||channelpropertyid==2||channelpropertyid==21||channelpropertyid==43||channelpropertyid==32||channelpropertyid==11||channelpropertyid==67)&&tab_it168_iniMenu)
		{

			if(articletag== null || typeof(articletag) == "undefined" || articletag=="")
			{
			var articletag=channelNameSt;
			}
			if(articletag !="")
			{ 		
			var Action_url ='http://ajaxlist.it168.com/It168ArticleHandler.ashx?type=WenKuSou&limit=10&articletag='+escape(articletag);
			$.ajax({
					type: "GET",
					cache:false,
					url: Action_url+ "&src=ajaxreturn",
					dataType : "jsonp",
					jsonp: "callbackparam",
					success: function (data) {	
						 var jsonobj=eval('('+data+')');					
						 var  html=""; 
						 var wen= $("#tab04_Content0");
						 html+='<ul class="list4">';
						 for (a in jsonobj.response){
							 var id=jsonobj.response[a].id;
							 var title=jsonobj.response[a].docName;
								title =substr(title,36);
							 
							 if(a!="9")
							 {
							   html=html+'<li ><a href="http://wenku.it168.com/d_'+id+'.shtml" target="_blank">'+title+'</a></li>';
							 }
							 else
							 {
							
							   html=html+'<li class="ba0"><a href="http://wenku.it168.com/d_'+id+'.shtml" target="_blank">'+title+'</a></li>';
							 }
						   }
						   html+='</ul>';
						   if(wen!= null && typeof(wen) != "undefined")
						   {
								$("#tab04_Content0").html(html)
						   }
						   else {         
									 $("#wenku").hide();
									 $("#tab04_Content2").hide();
							 }
					},
					error: function (data) {
					}
				});	
			}
		}


		if((channelpropertyid==68)&&tab_it168_iniMenu)
		{

			if(articletag== null || typeof(articletag) == "undefined" || articletag=="")
			{
			var articletag=channelNameSt;
			}
			if(articletag !="")
			{ 		
			var Action_url ='http://ajaxlist.it168.com/It168ArticleHandler.ashx?type=WenKuSou&limit=9&articletag='+escape(articletag);
			$.ajax({
					type: "GET",
					cache:false,
					url: Action_url+ "&src=ajaxreturn",
					dataType : "jsonp",
					jsonp: "callbackparam",
					success: function (data) {	
						 var jsonobj=eval('('+data+')');					
						 var  html='<ul class="list4"> <li ><a href="http://wenku.it168.com/d_001286543.shtml" target="_blank">桌面虚拟化成本不断下降而价值与日俱增</a></li>'; 
						 var wen= $("#tab04_Content0");
						 for (a in jsonobj.response){
							 var id=jsonobj.response[a].id;
							 var title=jsonobj.response[a].docName;
								title =substr(title,36);
							 
							 if(a!="8")
							 {
							   html=html+'<li ><a href="http://wenku.it168.com/d_'+id+'.shtml" target="_blank">'+title+'</a></li>';
							 }
							 else
							 {
							
							   html=html+'<li class="ba0"><a href="http://wenku.it168.com/d_'+id+'.shtml" target="_blank">'+title+'</a></li>';
							 }
						   }
						   html+='</ul>';
						   if(wen!= null && typeof(wen) != "undefined")
						   {
								$("#tab04_Content0").html(html)
						   }
						   else {         
									 $("#wenku").hide();
									 $("#tab04_Content2").hide();
							 }
					},
					error: function (data) {
					}
				});	
			}
		}
	} 
	catch (e) 
	{ 
	/*
		alert(e.message); 
		alert(e.description) 
		alert(e.number) 
		alert(e.name) 
		throw new Error(10,"asdasdasd") 
		*/
	} 
	/*相关文档end */
	
	
	//==================【zjl】==================================
	/*    文章点赞   */
	
	function It168Article_CommonAjax() {	
		
		this.Main = function ()  {
			var AjaxsendUrl = "http://ajaxlist.it168.com/It168ArticleHandler.ashx?type=ArticleCommon&articleid=" + articleCode;
			$.ajax({
				type: "GET",
				cache:false,
				url: AjaxsendUrl+ "&src=ajaxreturn",
				dataType : "jsonp",
				jsonp: "callbackparam",//服务端用于接收callback调用的function名的参数 
				success: function (data) {
					if (data != null && typeof (data) != "undefined" && data != '') {                                
						$("#commonajax").html(data);
						
							if($('#IT168zanNum').length>0&&$('#ArticleComment_count').length>0)
							{
								$("#IT168zanNum").html($("#ArticleComment_count").html());	
								
								var val = readCookie("ArtGrade_cookie_zan");
								val = val == null ? "" : val;
								if(val != "")
								{
									var arr = val.split(',');
									for (var i = 0; i < arr.length; i++) 
									{
										if($.trim(arr[i]) == articleCode)
										{
											//$("#IT168zan").html("已赞");	
											//alert('赞过了');
											//$("#IT168zanclass").removeClass().addClass("zan2");
										}										
									}
								}
							}
									//购买
							if($('#Article_Ds_Count').length>0)
							{
								$(".It168_ArticleDsCount_span").show();
								$("#It168_ArticleDsCount").html($("#Article_Ds_Count").html());
								
							}
																						
					}
					else{return;}
				},
				error: function (data) {
				}
			});
		};	
		

		var setCook = function(name, value) {
			var exp = new Date();
			exp.setTime(exp.getTime() + 864000000);//十天
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=.it168.com;path=/";
		};

		//读取cookie
		var readCookie =function (name, defaultValue) {
			var cName = name + "="; //'cookie名'加‘=’号，定义新变量以便查找是否存在于cookie中
			var CA = new Array(); //存放cookie的数组
			CA = document.cookie.split(';'); //解析cookie
			for (var i = 0; i < CA.length; i++) {
				var c = CA[i].replace(/(^\s*)|(\s*$)/g, ""); //去掉cookie左右的空格
				if (c.indexOf(cName) == 0) return decodeURIComponent(c.substring(cName.length, c.length)); //以nameEQ开头的cookie将被提取出来
			}
			return typeof defauleValue != "undefined" ? defauleValue : null; //找不到cookie值时默认返回null
		};
		
		var It168addcount = function (d) 
		{
			var g = new Image(1, 1);
			g.onLoad = function() {};
			g.src = d
			
		};
		
		this.addArtGrade=function (artId, typeId) {    
			if(typeId==1)
			{	
				var val = readCookie("ArtGrade_cookie_zan");
				val = val == null ? "" : val;
				var arr = val.split(',');
				
				for (var i = 0; i < arr.length; i++) {
					if ($.trim(arr[i]) == artId) {
						//alert("您已经评价过本篇文章，请不要重复评价");
						return;
					}
				}	
				//jQuery("#IT168zan").html("已赞");IT168zanNum
				//.fenxiang2 a.zan增加position:relative;

				jQuery('.zan').css('position','relative');				
				
				//jQuery(".or").html(parseInt($(".or").html()) + 1);
				jQuery("#IT168zanNum").html(parseInt($("#IT168zanNum").html()) + 1);
				//$("#IT168zanclass").removeClass().addClass("zan2"); 	
				 setTimeout(function () { 
						$('.numZan1').hide();
					}, 500);
				if (jQuery.trim(val) == "") {
					val = artId;
				}
				else {
					val = val + "," + artId;
				}
				setCook("ArtGrade_cookie_zan", val);
			
			}
			var it168_ArticleCommentUrl ='http://ajaxlist.it168.com/It168ArticleHandler.ashx?type=ArticleComment&articleId=' + artId + '&typeId=' + typeId;
			It168addcount(it168_ArticleCommentUrl);
			
		}
		this.init=function(){
			jQuery(".zan").hover(
			  function () {
				// over	
				var val = readCookie("ArtGrade_cookie_zan");
				val = val == null ? "" : val;
				var arr = val.split(',');
				var artId2 = jQuery(".zan").attr('data');
				for (var i = 0; i < arr.length; i++) {
					if ($.trim(arr[i]) == artId2) {
						jQuery("#unTap_zan").hide();
						jQuery("#tap_zan").show();

						//InitZan
					}else
					{
						jQuery("#tap_zan").hide();
						jQuery("#unTap_zan").show();	
					}
					jQuery(".InitZan").hide();
				}
			  },
			  function () {
				// out
				jQuery("#unTap_zan").hide();
				jQuery("#tap_zan").hide();
				jQuery(".InitZan").show();
				
			  }
			);
		};
		
}
	var It168CommonAjax=new It168Article_CommonAjax();
	// if(tab_it168_iniMenu)
	// {
	It168CommonAjax.Main();
	It168CommonAjax.init();
	jQuery(".zan").click(function(){
		var artId1 = jQuery(".zan").attr('data');
		It168CommonAjax.addArtGrade(artId1,1);
	});

	
			$(window).scroll(function(){
               if ($(window).scrollTop()>250){
                   $(".fu").fadeIn(500);
              }
               else
               {
                   $(".fu").fadeOut(500);
               }
            });
	
		// 返回顶部
			$(".fanhui").click(function(){
               $('body,html').animate({scrollTop:0},1000);
               return false;
            });
			
			/*返回顶部*/
// function toTopHide(){
    // if(document.documentElement.scrollTop+document.body.scrollTop > 400){
        // if(!(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent)))){
          // document.getElementById("ToIndex_a").style.display = "block";
            // document.getElementById("product_a").style.display = "block";
            // document.getElementById("comment_a").style.display = "block";
            // document.getElementById("backToTop_a").style.display = "block";
        // }
    // }else{
		// document.getElementById("ToIndex_a").style.display = "none";
        // document.getElementById("product_a").style.display = "none";
        // document.getElementById("comment_a").style.display = "none";
        // document.getElementById("backToTop_a").style.display = "none";
    // }
// }
// function toTopHide(){
	// if(document.documentElement.scrollTop+document.body.scrollTop > 250){
		//// $(".fu").show();
		// document.getElementById("nav_tips").style.display = "block";
	// }else
	// {
		// document.getElementById("nav_tips").style.display = "none";
	// }
// }

//返回顶部
    // $(window).scroll(function(){
        // toTopHide();
        // $(".fanhui").click(function(){
            // window.scrollTo(0,0);
            // return false;
        // });
    // });

			
			
			
			
			
//========= zjl 0520
/*
 * 处理过长的字符串，截取并添加省略号
 * 注：半角长度为1，全角长度为2
 * 
 * pStr:字符串
 * pLen:截取长度
 * 
 * return: 截取后的字符串
 */
function autoAddEllipsis(pStr, pLen) { 

    var _ret = cutString(pStr, pLen); 
    var _cutFlag = _ret.cutflag; 
    var _cutStringn = _ret.cutstring; 

    if ("1" == _cutFlag) { 
        return _cutStringn + "..."; 
    } else { 
        return _cutStringn; 
    } 
} 
/*
 * 取得指定长度的字符串
 * 注：半角长度为1，全角长度为2
 * 
 * pStr:字符串
 * pLen:截取长度
 * 
 * return: 截取后的字符串
 */
function cutString(pStr, pLen) { 
    // 原字符串长度 
    var _strLen = pStr.length; 
    var _tmpCode; 
    var _cutString; 
    // 默认情况下，返回的字符串是原字符串的一部分 
    var _cutFlag = "1"; 
    var _lenCount = 0; 
    var _ret = false; 
    if (_strLen <= pLen/2) { 
        _cutString = pStr; 
        _ret = true; 
    } 
    if (!_ret) { 
        for (var i = 0; i < _strLen ; i++ ) { 
            if (isFull(pStr.charAt(i))) { 
                _lenCount += 2; 
            } else { 
                _lenCount += 1; 
            } 

            if (_lenCount > pLen) { 
                _cutString = pStr.substring(0, i); 
                _ret = true; 
                break; 
            } else if (_lenCount == pLen) { 
                _cutString = pStr.substring(0, i + 1); 
                _ret = true; 
                break; 
            } 
        } 
    } 
    if (!_ret) { 
        _cutString = pStr; 
        _ret = true; 
    } 
    if (_cutString.length == _strLen) { 
        _cutFlag = "0"; 
    } 
    return {"cutstring":_cutString, "cutflag":_cutFlag}; 
} 
/*
 * 判断是否为全角
 * 
 * pChar:长度为1的字符串
 * return: tbtrue:全角
 *          false:半角
 */
function isFull (pChar) {
  for (var i = 0; i < pChar.strLen ; i++ ) {     
    if ((pChar.charCodeAt(i) > 128)) { 
        return true; 
    } else { 
        return false; 
    }
}
}
	
	
})(window);


