



(function(window, undefined){

	//��¼����
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
	
	
	//�����л�
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
	//����
	jQuery("#SouSearch").submit(
		function ()
		{	
			 var q=document.getElementById("q").value;
			 if(q==""||q=="������Ҫ��ѯ�Ĺؼ���")
			 {
				alert("������Ҫ��ѯ�Ĺؼ���!");
				return false;
			 }		 
			 document.getElementById("SouSearch").action ="http://sou.it168.com/search?q="+q+"&f="+chanstr;
		}
	)
	
// �л�ǩ
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
	
	//����
	function substr(str, len)  
	{  
		if( ! str || ! len)  
		{  
			return '';  
		}  
		// Ԥ�ڼ���������2�ֽڣ�Ӣ��1�ֽ�  
		var a = 0;  
		// ѭ������  
		var i = 0;  
		// ��ʱ�ִ�  
		var temp = '';  
		for (i = 0; i < str.length; i ++ )  
		{  
			if (str.charCodeAt(i) > 255)  
			{  
				// ����Ԥ�ڼ�������2  
				a += 2;  
			}  
			else  
			{  
				a ++ ;  
			}  
			// ������Ӽ����󳤶ȴ����޶����ȣ���ֱ�ӷ�����ʱ�ַ���  
			if(a > len)  
			{  
				return temp;  
			}  
			// ����ǰ���ݼӵ���ʱ�ַ���  
			temp += str.charAt(i);  
		}  
		// ���ȫ���ǵ��ֽ��ַ�����ֱ�ӷ���Դ�ַ���  
		return str;  
	}
	

	/*����ĵ�start */
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
						 var  html='<ul class="list4"> <li ><a href="http://wenku.it168.com/d_001286543.shtml" target="_blank">�������⻯�ɱ������½�����ֵ���վ���</a></li>'; 
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
	/*����ĵ�end */
	
	
	//==================��zjl��==================================
	/*    ���µ���   */
	
	function It168Article_CommonAjax() {	
		
		this.Main = function ()  {
			var AjaxsendUrl = "http://ajaxlist.it168.com/It168ArticleHandler.ashx?type=ArticleCommon&articleid=" + articleCode;
			$.ajax({
				type: "GET",
				cache:false,
				url: AjaxsendUrl+ "&src=ajaxreturn",
				dataType : "jsonp",
				jsonp: "callbackparam",//��������ڽ���callback���õ�function���Ĳ��� 
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
											//$("#IT168zan").html("����");	
											//alert('�޹���');
											//$("#IT168zanclass").removeClass().addClass("zan2");
										}										
									}
								}
							}
									//����
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
			exp.setTime(exp.getTime() + 864000000);//ʮ��
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";domain=.it168.com;path=/";
		};

		//��ȡcookie
		var readCookie =function (name, defaultValue) {
			var cName = name + "="; //'cookie��'�ӡ�=���ţ������±����Ա�����Ƿ������cookie��
			var CA = new Array(); //���cookie������
			CA = document.cookie.split(';'); //����cookie
			for (var i = 0; i < CA.length; i++) {
				var c = CA[i].replace(/(^\s*)|(\s*$)/g, ""); //ȥ��cookie���ҵĿո�
				if (c.indexOf(cName) == 0) return decodeURIComponent(c.substring(cName.length, c.length)); //��nameEQ��ͷ��cookie������ȡ����
			}
			return typeof defauleValue != "undefined" ? defauleValue : null; //�Ҳ���cookieֵʱĬ�Ϸ���null
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
						//alert("���Ѿ����۹���ƪ���£��벻Ҫ�ظ�����");
						return;
					}
				}	
				//jQuery("#IT168zan").html("����");IT168zanNum
				//.fenxiang2 a.zan����position:relative;

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
	
		// ���ض���
			$(".fanhui").click(function(){
               $('body,html').animate({scrollTop:0},1000);
               return false;
            });
			
			/*���ض���*/
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

//���ض���
    // $(window).scroll(function(){
        // toTopHide();
        // $(".fanhui").click(function(){
            // window.scrollTo(0,0);
            // return false;
        // });
    // });

			
			
			
			
			
//========= zjl 0520
/*
 * ����������ַ�������ȡ�����ʡ�Ժ�
 * ע����ǳ���Ϊ1��ȫ�ǳ���Ϊ2
 * 
 * pStr:�ַ���
 * pLen:��ȡ����
 * 
 * return: ��ȡ����ַ���
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
 * ȡ��ָ�����ȵ��ַ���
 * ע����ǳ���Ϊ1��ȫ�ǳ���Ϊ2
 * 
 * pStr:�ַ���
 * pLen:��ȡ����
 * 
 * return: ��ȡ����ַ���
 */
function cutString(pStr, pLen) { 
    // ԭ�ַ������� 
    var _strLen = pStr.length; 
    var _tmpCode; 
    var _cutString; 
    // Ĭ������£����ص��ַ�����ԭ�ַ�����һ���� 
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
 * �ж��Ƿ�Ϊȫ��
 * 
 * pChar:����Ϊ1���ַ���
 * return: tbtrue:ȫ��
 *          false:���
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


