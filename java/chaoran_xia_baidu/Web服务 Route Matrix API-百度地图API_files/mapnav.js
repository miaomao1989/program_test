var mnav = function(ids) {
	var htmlBody = document.getElementsByTagName("body")[0];
	var header = document.createElement("div");
	header.setAttribute("id", "header");
	var more = '<li id="mapnav_creatmap"><a  href="javascript:openGuide();" onclick="_addStatNew(' + 'lbsapi_guanwang' + ',{' + 'operate' + ': ' + 'guanwang_productclick' + '})">产品指引</a><b>|</b></li>\r\n';

	var str1 = ['<ul id="mapnav_tool_two">\r\n',
		'<li id="mapnav_creatmap"><a  href="http://api.map.baidu.com/lbsapi/creatmap/index.html">地图生成器</a><b>|</b></li>\r\n',
		'<li id="mapnav_getpoint"><a  href="http://api.map.baidu.com/lbsapi/getpoint/index.html">坐标拾取工具</a><b>|</b></li>\r\n',
		'<li id="mapnav_mapcard"><a  href="http://api.map.baidu.com/mapCard/">地图名片</a><b>|</b></li>\r\n',
		'<li id="mapnav_tuan"><a  href="http://api.map.baidu.com/lbsapi/tuan/index.html">团购插件</a><b>|</b></li>\r\n',
		'<li id="mapnav_move"><a  href="move.htm">零成本搬家</a></li>',
		'</ul>\r\n'
	].join('');
	var str2 = ['<ul id="mapnav_support_two">\r\n', more,
		'<li id="mapnav_question"><a  href="question.htm">常见问题</a><b>|</b></li>\r\n',
		'<li id="mapnav_devRes"><a  href="devRes.htm">开发资源</a><b>|</b></li>\r\n',
		'<li id="mapnav_help"><a  href="help_index.html">咨询求助</a><b>|</b></li>\r\n',
		'<li id="mapnav_suggest"><a  href="suggest_index.html">意见反馈</a><b>|</b></li>\r\n',
		'<li id="mapnav_contact"><a  href="contact.htm">联系我们</a></li>\r\n',
		'</ul>\r\n'
	].join('');
	var str3 = ['<ul id="mapnav_product_two">\r\n',
		'<li id="mapnav_yun"><a  href="lbs-cloud.htm">LBS.云</a><b>|</b></li>\r\n',
		'<li id="mapnav_javascript"><a class="Top_two" href="jshome.htm">JavaScript API</a></li>\r\n',
		'<li id="mapnav_flash"><a href="flash.htm">Flash API</a><b>|</b></li>\r\n',
		'<li>\r\n',
		'<ul>\r\n',
		'<li id="mapnav_and"><a href="sdk-android.htm" class="Top_two">Android SDK</a></li>\r\n',
		'<li id="mapnav_ios"><a href="sdk-ios.htm" class="Top_two">iOS SDK</a></li>\r\n',
		'<li id="mapnav_geo"><a href="geosdk.htm">定位SDK</a><b>|</b></li>\r\n',
		'</ul>\r\n',
		'</li>\r\n',
		'<li>\r\n',
		'<ul>\r\n',
		'<li id="mapnav_web" class="nav-item "><a href="webservice.htm" class="Top_two_triangle">Web服务API</a>\r\n',
		'<div  class="homeTab webTab" >\r\n',
		'<ul>\r\n',
		'<li><a href="webservice-placeapi.htm">Place API</a></li>\r\n',
		'<li><a href="place-suggestion-api.htm">Place suggestion API</a></li>\r\n',
		'<li><a href="webservice-geocoding.htm">Geocoding API</a></li>\r\n',
		'<li><a href="direction-api.htm">Direction API</a></li>\r\n',
		'<li><a href="route-matrix-api.htm">Route Matrix API</a></li>\r\n',
		'<li><a href="ip-location-api.htm">IP定位 API</a></li>\r\n',
		'<div class="clear"></div>\r\n',
		'</ul>\r\n',
		'</div>\r\n',
		'</li>\r\n',
		'<li id="mapnav_static"><a href="staticimg.htm" class="Top_two">静态图API</a></li>\r\n',
		'<li id="mapnav_car"><a href="carhome.htm" class="Top_two">车联网API</a></li>\r\n',
		'<li id="mapnav_uri"><a href="uri.htm" >URI API</a></li>\r\n',
		'</ul>\r\n'
	].join('');
	var str4 = ['<ul id="mapnav_success_two">\r\n',
		'<li id="mapnav_houseProperty"><a  href="case.htm">房产类</a><b>|</b></li>\r\n',
		'<li id="mapnav_more_case"><a  href="case-more.htm">更多案例</a><b></b></li>\r\n',
		// '<li id="mapnav_humRes"><a  href="#">人才招聘类</a><b>|</b></li>\r\n',
		// '<li id="mapnav_logisticsMonitoring"><a  href="#">物流监控类</a></li>\r\n',
		'</ul>\r\n'
	].join('');
	var support = '<a href="javascript:openGuide();" onclick="_addStatNew(' + '"lbsapi_guanwang"' + ',{' + 'operate' + ': ' + 'guanwang_productclick' + '})">产品指引</a> | <a href="question.htm">常见问题</a> | <a href="devRes.htm">开发资源</a>\r\n';

	var content = ['<div id="top_main">\r\n',
		'<a href="http://developer.baidu.com/map/"><img class="logo" width="256px" height="52px" src="static/img/logo.png" /></a>\r\n',
		'<div id="nav">\r\n',
		'<div id="logins">\r\n',
		'<ul class="user-nav">\r\n',
		'<li class="user-nav-item " id="user-state-li" style="display:none">\r\n',

		'<a id="userName"></a><label>l</label>\r\n',
		'<ul class="username-dropdown" style="visibility: hidden;">\r\n',
		'<li><a target="_top" href="http://passport.baidu.com/center" class="bd-cloud-dropdown-link">帐号设置</a></li>\r\n',
		// '<li><a target="_top" href="http://developer.baidu.com/user/info" class="bd-cloud-dropdown-link">开发者信息</a></li>\r\n',
		'<li><a target="_top" href="" id="logout">退出</a></li>\r\n',
		'<div class="clear"></div>\r\n',
		'</ul>\r\n',
		'<div class="clear"></div>\r\n',
		'</li>\r\n',
		'<li class="user-nav-item">\r\n',
		'<a target="_blank" href="http://lbsyun.baidu.com/">LBS开放平台</a><label>l</label>\r\n',
		'</li>\r\n',
		'<li class="user-nav-item">\r\n',
		'<a  target="_blank" href="http://developer.baidu.com/">百度开放云</a>\r\n',
		'</li>\r\n',
		'<li id="login-reg-li" class="user-nav-item" style="display:none;">\r\n',
		'<label id="dot-line">l</label><a id="login" href="" target="_top">登录</a>\r\n',

		'<a id="register" href="" target="_top">注册</a>\r\n',
		'</li>\r\n',

		'<div class="clear"></div>\r\n',
		'</ul>\r\n',
		// '<a target="_blank" href="http://lbsyun.baidu.com/">LBS开放平台</a> \r\n',
		// '<a target="_blank" href="http://map.baidu.com/">百度地图</a> | \r\n',
		// '<a target="_blank" href="http://developer.baidu.com/">百度开发者中心</a> | \r\n',
		// '<span id="unLogin"><a href="###" id="login">登录</a> <a href="#" id="register">注册</a></span><div style="display:inline-block;" id="userName"></div>\r\n',
		'</div>\r\n',
		'<div class="clear"></div>\r\n',
		'<ul class="navul">\r\n',
		'<li >\r\n',
		'<a id="mapnav_home" href="http://developer.baidu.com/map/">首页</a>\r\n',
		'</li>\r\n',
		'<li  class="nav-item">\r\n',
		'<a id="mapnav_product" href="lbs-cloud.htm">API <span class="tri_span"></span></a>\r\n',
		'<div id="homeTab1" class="homeTab">',
		'<ul>\r\n',
		'<li><a href="lbs-cloud.htm">LBS.云</a></li>\r\n',
		'<li><a href="jshome.htm">JavaScript API</a> | <a href="flash.htm">Flash API</a></li>\r\n',
		'<li><a href="sdk-android.htm">Android SDK</a> | <a href="sdk-ios.htm">iOS SDK</a> | <a href="geosdk.htm">定位 SDK</a></li>\r\n',
		'<li><a href="webservice.htm">Web服务 API</a> | <a href="staticimg.htm">静态图 API</a> | <a href="carhome.htm">车联网 API</a> | <a href="uri.htm">URI API</a></li>\r\n',
		'<div class="clear"></div>\r\n',
		'</ul>\r\n',
		'</div>\r\n',
		'</li>\r\n',
		'<li class="nav-item">\r\n',
		'<a id="mapnav_tool" target="_blank" href="http://api.map.baidu.com/lbsapi/creatmap/index.html">工具<span class="tri_span"></span></a>\r\n',
		'<div  class="homeTab">\r\n',
		'<ul>\r\n',
		'<li><a target="_blank" href="http://api.map.baidu.com/lbsapi/creatmap/index.html">地图生成器</a></li>\r\n',
		'<li><a target="_blank" href="http://api.map.baidu.com/lbsapi/getpoint/index.html">坐标拾取工具</a></li>\r\n',
		'<li><a target="_blank" href="http://api.map.baidu.com/mapCard/">地图名片</a></li>\r\n',
		'<li><a target="_blank" href="http://api.map.baidu.com/lbsapi/tuan/index.html">团购插件</a></li>\r\n',
		'<li><a target="_blank" href="move.htm">零成本搬家工具</a></li>\r\n',
		'<div class="clear"></div>\r\n',
		'</ul>\r\n',
		'</div>\r\n',
		'</li>\r\n',
		'<li >\r\n',
		'<a id="mapnav_news" href="http://lbsyun.baidu.com/news">新闻</a>\r\n',
		'</li>\r\n',
		'<li  class="nav-item">\r\n',
		'<a id="mapnav_support" href="question.htm" >支持<span class="tri_span"></span></a>\r\n',
		'<div  class="homeTab">\r\n',
		'<ul>\r\n',
		'<li>\r\n', support,
		'</li>\r\n',
		'<li>\r\n',
		'<a href="help_index.html">咨询求助</a> | <a href="suggest_index.html">意见反馈</a> | <a href="contact.htm">联系我们</a>\r\n',
		'</li>\r\n',
		'<div class="clear"></div>\r\n',
		'</ul>\r\n',
		'</div>\r\n',
		'</li>\r\n',
		'<li >\r\n',
		'<a id="mapnav_bbs"  target="_blank" href="http://bbs.lbsyun.baidu.com/">论坛</a>\r\n',
		'</li>\r\n',
		'<li class="nav-item">\r\n',
		'<a id="mapnav_success" href="case.htm" class="a_success">成功案例<span class="tri_span"></span></a>\r\n',
		'<div  class="homeTab">',
		'<ul>\r\n',
		'<li style="width:250px"><a href="case.htm">房产类</a></li>\r\n',
		'<li style="width:250px"><a href="case-more.htm">更多案例</a></li>\r\n',
		// '<li><a href="#">人才招聘类</a></li>\r\n',
		// '<li><a href="#">物流监控类</a></li>\r\n',
		'<div class="clear"></div>\r\n',
		'</ul>\r\n',
		'</div>\r\n',
		'</li>\r\n',
		'</ul>\r\n',
		'</div>\r\n',
		'</div>\r\n',
		'<div class="clear"></div>\r\n',
		'<div id="headTop">\r\n',
		'<div id="headeTop_main">\r\n'
	].join('');
	var footer = [
		'</li>\r\n',
		'</ul>\r\n',
		'</div><!--end of headTop_main-->\r\n',
		'</div><!-- end of headTop -->'
	].join('');
	var htmlcontent = content + str1 + str2 + str4 + str3 + footer;
	header.innerHTML = htmlcontent;
	htmlBody.appendChild(header);
	var clear = document.createElement("div");
	clear.setAttribute("class", "clear");
	htmlBody.appendChild(clear);
	document.write("<script src='static/js/login.js'><\/script>");
	if (ids) {
		if (ids.one_nav) {
			document.getElementById(ids.one_nav).className = " nav_on";
		}
		if (ids.two_nav) {
			document.getElementById(ids.two_nav).className += " Top_on";
		}
		switch (ids.one_nav) {
			case 'mapnav_product':
				document.getElementById('mapnav_product_two').style.display = 'block';
				break;
			case 'mapnav_tool':
				document.getElementById('mapnav_tool_two').style.display = 'block';
				break;
			case 'mapnav_support':
				document.getElementById('mapnav_support_two').style.display = 'block';
				break;
			case 'mapnav_success':

				document.getElementById('mapnav_success_two').style.display = 'block';

				break;
			case 'mapnav_news':
				document.getElementById('headTop').style.height = '1px';
				break;
		}
	}


	//	default:

}

//var index_nav=function(){
//	var
//}