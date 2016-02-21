//menu by zhangying 2012-11-01
function addClass_on(myId) {
	$(document.getElementById(myId)).addClass('on');
}

function addClass_on1(myId) {
	$(document.getElementById(myId)).addClass('on1');
}

function addClass_on2(myId) {
	$(document.getElementById(myId)).addClass('on2');
}

function addClass_on3(myId) {
	$(document.getElementById(myId)).addClass('on3');
}

//总类导航
function addMenu_main() {
	document.write('<ul>');
	document.write('<li id="mainmenu_1" class="mm1">');
	document.write('<a href ="http://developer.baidu.com/map/">首页</a>');
	document.write('</li>');
	document.write('<li id="mainmenu_2" class="mm2">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'msubmenu\');">地图API产品</a>');
	document.write('<div class="msubmenu" id="msubmenu">');
	document.write('<ul>');
	document.write('<li id="mainmenu_21"><a href="jshome.htm">JavaScript API</a></li>');
	document.write('<li id="mainmenu_24"><a href="library.htm">JavaScript 开源库</a></li>');
	document.write('<li id="mainmenu_22"><a href="flash.htm">Flash API</a></li>');
	document.write('<li id="mainmenu_23"><a href="staticimg.htm">静态图 API</a></li>');
	document.write('<li id="mainmenu_25"><a href="sdk-android.htm">Android SDK<img src="static/img/new.png"/></a></li>');
	document.write('<li id="mainmenu_26"><a href="sdk-ios.htm">iOS SDK <img src="static/img/new.png"/></a></li>');
	document.write('<li id="mainmenu_27"><a href="geosdk.htm">定位 SDK</a></li>');
	document.write('<li id="mainmenu_28"><a href="webservice.htm">Web服务 API</a></li>');
	document.write('<li id="mainmenu_29"><a href="carhome.htm">车联网 API<img src="static/img/new.png"></a></li><li><a href="uri.htm">URI API </a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li id="mainmenu_3" class="mm3">');
	document.write('<a href ="lbs-cloud.htm">LBS.云<img src="static/img/new.png"></a>');
	document.write('</li>');
	document.write('<li id="mainmenu_4" class="mm4">');
	document.write('<a href ="tool.htm">插件与工具</a>');
	document.write('</li>');
	document.write('<li id="mainmenu_5" class="mm5">');
	document.write('<a href ="question.htm">常见问题</a>');
	document.write('</li>');
	document.write('<li id="mainmenu_6" class="mm6">');
	document.write('<a href ="case.htm">成功案例</a>');
	document.write('</li>');
	//增加开发资源, by wjp
	document.write('<li id="mainmenu_6_1" class="mm6_1">');
	document.write('<a href ="devRes.htm">开发资源</a>');
	document.write('</li>');
	document.write('<li id="mainmenu_7" class="mm7">');
	document.write('<a href ="news.htm">新闻动态</a>');
	document.write('</li>');
	//注释, by wjp
	//document.write('<li id="mainmenu_8" class="mm8">');	
	//document.write('<a href ="jschat.htm">API群&amp;微博</a>');
	//document.write('</li>');
	document.write('<li id="mainmenu_9" class="mm9">');
	document.write('<a target="_blank" href ="http://bbs.lbsyun.baidu.com/">API论坛</a>');
	document.write('</li>');
	document.write('<li id="mainmenu_10" class="mm10">');
	document.write('<a href ="contact.htm">联系我们</a>');
	document.write('</li>');
	document.write('</ul>');
}

//JS导航
function addMenu_js() {
	document.write('<ul>');
	document.write('<li id="jsmenu_0" class="mm14">');
	document.write('<a href ="jshome.htm">概述</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_7" class="mm14">');
	document.write('<a href="http://lbsyun.baidu.com/apiconsole/key?application=key" target="_blank">获取密钥</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_1" class="mm11">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'msubmenu\');">开发指南</a>');
	document.write('<div class="msubmenu" id="msubmenu">');
	document.write('<ul>');
	document.write('<li id="jsmenu_11"><a href="jsdevelop-1.htm">简介</a></li>');
	document.write('<li id="jsmenu_12"><a href="jsdevelop-2.htm">Hello World</a></li>');
	document.write('<li id="jsmenu_13"><a href="jsdevelop-3.htm">控件</a></li>');
	document.write('<li id="jsmenu_14"><a href="jsdevelop-4.htm">覆盖物</a></li>');
	document.write('<li id="jsmenu_15"><a href="jsdevelop-5.htm">事件</a></li>');
	document.write('<li id="jsmenu_16"><a href="jsdevelop-6.htm">地图图层</a></li>');
	document.write('<li id="jsmenu_17"><a href="jsdevelop-7.htm">工具</a></li>');
	document.write('<li id="jsmenu_18"><a href="jsdevelop-8.htm">服务</a></li>');
	document.write('<li id="jsmenu_19"><a href="jsdevelop-9.htm">用户数据图层 <img src="static/img/new.png" width="25"/></a></li>');
	document.write('<li id="jsmenu_20"><a href="jsdevelop-10.htm">全景图展现 <img src="static/img/new.png" width="25"/></a></li>');
	document.write('<li id="jsmenu_21"><a href="jsdevelop-11.htm">定制个性地图 <img src="static/img/new.png" width="25"/></a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li id="jsmenu_2" class="mm12">');
	document.write('<a href ="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E6%A0%B8%E5%BF%83%E7%B1%BB" target="_blank">类参考V2.0</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_3" class="mm13">');
	document.write('<a href ="jsdemo.htm" target="_blank">示例DEMO</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_4" class="mm14">');
	document.write('<a href ="jsupdate.htm">更新日志</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_5" class="mm14">');
	document.write('<a href ="jsqa.htm">常见问题</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_6" class="mm14 ">');
	document.write('<a href ="js-download.htm">相关下载</a>');
	document.write('</li>');
	document.write('<li class="mm14 mmanage">');
	document.write('<a href="jsmobile.htm" ><img src="static/img/outside-link-marker.png" /> JavaScript 极速版</a>');
	document.write('</li>');
	document.write('<li class="mm14 mmanage">');
	document.write('<a href="library.htm" target="_blank"><img src="static/img/outside-link-marker.png" /> JavaScript 开源库</a>');
	document.write('</li>');
	document.write('</ul>');
}

//JS极速版导航
function addMenu_js_mobile() {
	document.write('<ul>');
	document.write('<li id="jsmobile_0" class="mm14">');
	document.write('<a href ="jsmobile.htm">概述</a>');
	document.write('</li>');
	document.write('<li id="jsmobile_7" class="mm14">');
	document.write('<a href="http://lbsyun.baidu.com/apiconsole/key?application=key" target="_blank">获取密钥</a>');
	document.write('</li>');
	document.write('<li id="jsmobile_1" class="mm11">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'msubmenu\');">开发指南</a>');
	document.write('<div class="msubmenu" id="msubmenu">');
	document.write('<ul>');
	// document.write('<li id="jsmobile_11"><a href="jsguide-1.htm">简介</a></li>');
	document.write('<li id="jsmobile_gui1"><a href="jsguide-1.htm">Hello World</a></li>');
	document.write('<li id="jsmobile_gui2"><a href="jsguide-2.htm">控件</a></li>');
	document.write('<li id="jsmobile_gui3"><a href="jsguide-3.htm">覆盖物</a></li>');
	document.write('<li id="jsmobile_gui4"><a href="jsguide-4.htm">事件</a></li>');
	document.write('<li id="jsmobile_gui5"><a href="jsguide-5.htm">地图图层</a></li>');
	document.write('<li id="jsmobile_gui6"><a href="jsguide-6.htm">服务</a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li id="jsmobile_2" class="mm12">');
	document.write('<a href ="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%9E%81%E9%80%9F%E7%89%88JS%E6%80%BB%E7%B1%BB/%E6%9E%81%E9%80%9F%E7%89%88%E6%A0%B8%E5%BF%83%E7%B1%BB" target="_blank">类参考V1.0</a>');
	document.write('</li>');
	document.write('<li id="jsmobile_3" class="mm13">');
	document.write('<a href ="jsdemo-mobile.htm" target="_blank">示例DEMO</a>');
	document.write('</li>');
	document.write('<li id="jsmobile_4" class="mm14">');
	document.write('<a href ="jsmobile-update.htm">更新日志</a>');
	document.write('</li>');
	document.write('<li id="jsmobile_6" class="mm14">');
	document.write('<a href ="jsmobile-download.htm">相关下载</a>');
	document.write('</li>');
	document.write('<li class="mm14 mmanage">');
	document.write('<a href="jshome.htm" ><img src="static/img/outside-link-marker.png" /> JavaScript 大众版</a>');
	document.write('</li>');
	document.write('<li class="mm14 mmanage">');
	document.write('<a href="library.htm" target="_blank"><img src="static/img/outside-link-marker.png" /> JavaScript 开源库</a>');
	document.write('</li>');
	document.write('</ul>');
}

//android导航
function addMenu_and() {
	document.write('<ul>');
	document.write('<li id="andmenu_1" class="mm12">');
	document.write('<a href="sdk-android.htm">概述</a>');
	document.write('</li>');
	document.write('<li id="andmenu_2" class="mm12">');
	document.write('<a href="android-mobile-apply-key.htm">获取密钥</a>');
	document.write('</li>');
	document.write('<li id="andmenu_3" class="mm11">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'msubmenu\');">开发指南</a>');
	document.write('<div class="msubmenu" id="msubmenu">');
	document.write('<ul>');
	document.write('<li id="andmenu_31"><a href="sdkandev-1.htm">简介</a></li>');
	document.write('<li id="andmenu_32"><a href="sdkandev-2.htm">Hello World<img src="static/img/new.png"/></a></li>');
	document.write('<li id="andmenu_33"><a href="sdkandev-3.htm">地图图层</a></li>');
	document.write('<li id="andmenu_34"><a href="sdkandev-4.htm">检索服务</a></li>');
	document.write('<li id="andmenu_35"><a href="sdkandev-5.htm">路径规划<img src="static/img/new.png"/></a></li>');
	document.write('<li id="andmenu_36"><a href="sdkandev-6.htm">覆盖物<img src="static/img/new.png"/></a></li>');
	document.write('<li id="andmenu_37"><a href="sdkandev-7.htm">定位</a></li>');
	document.write('<li id="andmenu_38"><a href="sdkandev-8.htm">LBS云服务</a></li>');
	document.write('<li id="andmenu_39"><a href="sdkandev-9.htm">Place详情页</a></li>');
	document.write('<li id="andmenu_310"><a href="sdkandev-10.htm">离线地图</a></li>');
	document.write('<li id="andmenu_311"><a href="sdkandev-11.htm">事件监听</a></li>');
	document.write('<li id="andmenu_312"><a href="sdkandev-12.htm">附录</a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li id="andmenu_4" class="mm12">');
	document.write('<a href ="android_refer/index.html" target="_blank">类参考</a>');
	document.write('</li>');
	document.write('<li id="andmenu_5" class="mm12">');
	document.write('<a href ="sdkandev-update.htm">更新日志</a>');
	document.write('</li>');
	document.write('<li id="andmenu_6" class="mm12">');
	document.write('<a href ="sdkandev-question.htm">常见问题</a>');
	document.write('</li>');
	document.write('<li id="andmenu_7" class="mm12">');
	document.write('<a href ="sdkandev-download.htm">相关下载</a>');
	document.write('</li>');
	document.write('</ul>');
}

//IOS导航
function addMenu_ios() {
	document.write('<ul>');
	document.write('<li id="iosmenu_1" class="mm12">');
	document.write('<a href="sdk-ios.htm">概述</a>');
	document.write('</li>');
	document.write('<li id="iosmenu_2" class="mm12">');
	document.write('<a href="ios-mobile-apply-key.htm">获取密钥</a>');
	document.write('</li>');
	document.write('<li id="iosmenu_3" class="mm11">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'msubmenu\');">开发指南</a>');
	document.write('<div class="msubmenu" id="msubmenu">');
	document.write('<ul>');
	document.write('<li id="iosmenu_31"><a href="sdkiosdev-1.htm">简介</a></li>');
	document.write('<li id="iosmenu_32"><a href="sdkiosdev-2.htm">Hello World</a></li>');
	document.write('<li id="iosmenu_33"><a href="sdkiosdev-3.htm">注意事项</a></li>');
	document.write('<li id="iosmenu_39"><a href="sdkiosdev-10.htm">3D地图展示</a></li>');
	document.write('<li id="iosmenu_34"><a href="sdkiosdev-4.htm">卫星图图层</a></li>');
	document.write('<li id="iosmenu_35"><a href="sdkiosdev-5.htm">实时路况图层</a></li>');
	document.write('<li id="iosmenu_36"><a href="sdkiosdev-6.htm">地图覆盖物<img src="static/img/new.png"/></a></li>');
	document.write('<li id="iosmenu_37"><a href="sdkiosdev-7.htm">服务类<img src="static/img/new.png"/></a></li>');
	document.write('<li id="iosmenu_38"><a href="sdkiosdev-8.htm">定位</a></li>');
	document.write('<li id="iosmenu_40"><a href="sdkiosdev-11.htm">LBS.云服务</a></li>');
	document.write('<li id="iosmenu_310"><a href="sdkiosdev-9.htm">离线地图</a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li id="iosmenu_4" class="mm12">');
	document.write('<a href ="ios_refer/html/annotated.html" target="_blank">类参考</a>');
	document.write('</li>');
	document.write('<li id="iosmenu_5" class="mm12">');
	document.write('<a href ="sdkiosdev-update.htm">更新日志</a>');
	document.write('</li>');
	document.write('<li id="iosmenu_6" class="mm12">');
	document.write('<a href ="sdkiosdev-question.htm">常见问题</a>');
	document.write('</li>');
	document.write('<li id="iosmenu_7" class="mm12">');
	document.write('<a href ="sdkiosdev-download.htm">相关下载</a>');
	document.write('</li>');
	document.write('</ul>');
}

//定位塞班导航
function addMenu_geosdk_symbian() {
	document.write('<ul>');
	document.write('<li id="geosym_1" class="mm14">');
	document.write('<a href="geosdk-symbian.htm">概述</a>');
	document.write('</li>');
	document.write('<li id="geosym_2" class="mm14">');
	document.write('<a href="geosdk-symbian-develop.htm">开发指南</a>');
	document.write('</li>');
	document.write('<li id="geosym_3" class="mm14">');
	document.write('<a href="geosdk-symbian-class.htm">类参考</a>');
	document.write('</li>');
	document.write('<li id="geosym_4" class="mm14">');
	document.write('<a href="geosdk-symbian-update.htm">更新日志</a>');
	document.write('</li>');
	document.write('<li id="geosym_5" class="mm14">');
	document.write('<a href="geosdk-symbian-qa.htm">常见问题</a>');
	document.write('</li>');
	document.write('<li id="geosym_6" class="mm14">');
	document.write('<a href="geosdk-symbian-download.htm">相关下载</a>');
	document.write('</li>');
	document.write('<li id="geosym_7" class="mm14 mnewgeosdk">');
	document.write('<a href="geosdk-android.htm"><img src="static/img/outside-link-marker.png" /> Android定位SDK</a>');
	document.write('</li>');
	document.write('</ul>');
}

//定位安卓导航
function addMenu_geosdk_android() {
	document.write('<ul>');
	document.write('<li id="geoand_1" class="mm14">');
	document.write('<a href ="geosdk-android.htm">概述</a>');
	document.write('</li>');
	document.write('<li id="geoand_2" class="mm11">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'msubmenu\');">开发指南</a>');
	document.write('<div class="msubmenu" id="msubmenu">');
	document.write('<ul>');
	document.write('<li id="geoand_28"><a href="geosdk-android-key.htm">申请密钥</a></li>');
	document.write('<li id="geoand_27"><a href="geosdk-android-developv4.0.htm">V4.0</a></li>');
	document.write('<li id="geoand_20"><a href="geosdk-android-developv3.3.htm">V3.3</a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li id="geoand_3" class="mm11">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'msubmenu2\');">类参考</a>');
	document.write('<div class="msubmenu" id="msubmenu2" style="display:none;">');
	document.write('<ul>');
	document.write('<li id="geoand_37"><a href="geosdk-android-classv4.0.htm">V4.0</a></li>');
	document.write('<li id="geoand_30"><a href="geosdk-android-classv3.3.htm">V3.3</a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li id="geoand_4" class="mm14">');
	document.write('<a href="geosdk-android-update.htm">更新日志</a>');
	document.write('</li>');
	document.write('<li id="geoand_5" class="mm14">');
	document.write('<a href="geosdk-android-qa.htm">常见问题</a>');
	document.write('</li>');
	document.write('<li id="geoand_6" class="mm14">');
	document.write('<a href="geosdk-android-download.htm">相关下载</a>');
	document.write('</li>');
	document.write('<li id="geoand_7" class="mm14 mnewgeosdk">');
	document.write('<a href="geosdk-symbian.htm"><img src="static/img/outside-link-marker.png" /> Symbian定位SDK</a>');
	document.write('</li>');
	document.write('</ul>');
}
//webservicev1导航
function addMenu_webv1() {
	document.write('<ul>');
	document.write('<li id="webmenu_1" class="mm12">');
	document.write('<a href ="apply-key.htm">获取密钥</a>');
	document.write('</li>');
	document.write('<li id="webmenu_2" class="mm13">');
	document.write('<a href ="place-api.htm">Place API</a>');
	document.write('</li>');
	document.write('<li id="webmenu_3" class="mm14">');
	document.write('<a href ="geocoding-api.htm">Geocoding API</a>');
	document.write('</li>');
	document.write('</ul>');
}

//webservicev2导航
function addMenu_web() {
	document.write('<ul>');
	document.write('<li id="webmenu_6" class="mm16">');
	document.write('<a href ="webservice.htm">概述</a>');
	document.write('</li>');
	document.write('<li id="webmenu_1" class="mm12">');
	document.write('<a href ="http://lbsyun.baidu.com/apiconsole/key?application=key" target="_blank">获取密钥</a>');
	document.write('</li>');
	document.write('<li id="webmenu_2" class="mm13">');
	document.write('<a href ="webservice-placeapi.htm">Place API</a>');
	document.write('</li>');
	document.write('<li id="webmenu_8" class="mm18">');
	document.write('<a href ="place-suggestion-api.htm">Place suggestion API</a>');
	document.write('</li>');
	document.write('<li id="webmenu_3" class="mm14">');
	document.write('<a href ="webservice-geocoding.htm">Geocoding API</a>');
	document.write('</li>');
	document.write('<li id="webmenu_4" class="mm15">');
	document.write('<a href ="direction-api.htm">Direction API</a>');
	document.write('</li>');
	document.write('<li id="webmenu_9" class="mm17">');
	document.write('<a href ="route-matrix-api.htm">Route Matrix API<img src="static/img/new.png"/></a>');
	document.write('</li>');
	document.write('<li id="webmenu_7" class="mm17">');
	document.write('<a href ="ip-location-api.htm">IP定位 API</a>');
	document.write('</li>');

	document.write('<li id="webmenu_5" class="mm16">');
	document.write('<a href ="service-update.htm">更新日志</a>');
	document.write('</li>');
	document.write('</ul>');
}

//FLASH导航
function addMenu_flash() {
	document.write('<ul>');
	document.write('<li id="flashmenu_1" class="mm12">');
	document.write('<a href="flash.htm">概述</a>');
	document.write('</li>');
	document.write('<li id="flashmenu_2" class="mm11">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'msubmenu\');">开发指南</a>');
	document.write('<div class="msubmenu" id="msubmenu">');
	document.write('<ul>');
	document.write('<li id="flashmenu_21"><a href="fdevelop-1.htm">简介</a></li>');
	document.write('<li id="flashmenu_22"><a href="fdevelop-2.htm">基础知识</a></li>');
	document.write('<li id="flashmenu_23"><a href="fdevelop-3.htm">控件</a></li>');
	document.write('<li id="flashmenu_24"><a href="fdevelop-4.htm">覆盖物</a></li>');
	document.write('<li id="flashmenu_25"><a href="fdevelop-5.htm">事件</a></li>');
	document.write('<li id="flashmenu_26"><a href="fdevelop-6.htm">地图图层</a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li id="flashmenu_3" class="mm12">');
	document.write('<a href ="http://developer.baidu.com/map/reference/index.php?title=Class:flash%E6%80%BB%E7%B1%BB/flash%E6%A0%B8%E5%BF%83%E7%B1%BB" target="_blank">类参考</a>');
	document.write('</li>');
	document.write('<li id="flashmenu_4" class="mm14">');
	document.write('<a href ="fupdate.htm">更新日志</a>');
	document.write('</li>');
	document.write('<li id="flashmenu_5" class="mm14">');
	document.write('<a href ="fdownload.htm">相关下载</a>');
	document.write('</li>');
	document.write('</ul>');
}
//URI导航
function addMenu_uri() {
	document.write('<ul>');
	document.write('<li id="urimenu_1" class="mm14">');
	document.write('<a href="uri.htm">概述</a>');
	document.write('</li>');
	document.write('<li id="urimenu_2" class="mm11">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'msubmenu\');">开发指南</a>');
	document.write('<div class="msubmenu" id="msubmenu">');
	document.write('<ul>');
	document.write('<li id="urimenu_21"><a href="uri-developer.htm">简介</a></li>');
	document.write('<li id="urimenu_22"><a href="uri-example.htm">Hello World</a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li id="flashmenu_2" class="mm11">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'msubmenu1\');">接口说明</a>');
	document.write('<div class="msubmenu" id="msubmenu1" style="display:none;">');
	document.write('<ul>');
	document.write('<li id="flashmenu_21"><a href="uri-introweb.htm">web端</a></li>');
	document.write('<li id="flashmenu_22"><a href="uri-introandroid.htm">android端</a></li>');
	document.write('<li id="flashmenu_23"><a href="uri-introios.htm">iOS端</a></li>');
	document.write('<li id="flashmenu_33"><a href="uri-introadd.htm">附录</a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');

	document.write('<li id="urimenu_3" class="mm14">');
	document.write('<a href ="uri-updata.htm">更新日志</a>');
	document.write('</li>');
	document.write('<li id="urimenu_4" class="mm14">');
	document.write('<a href ="uri-download.htm">相关下载</a>');
	document.write('</li>');
	document.write('</ul>');
}
//云平台导航
function addMenu_lbs() {
	document.write('<ul>');
	document.write('<li class="mm12" id="lbsmenu_1">');
	document.write('<a href="lbs-cloud.htm">概述</a>');
	document.write('</li>');
	document.write('<li class="mm12">');
	document.write('<a href="http://lbsyun.baidu.com/apiconsole/key" target="_blank">申请密钥</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_1" class="mm11">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'msubmenu1\');">开发指南</a>');
	document.write('<div class="msubmenu" id="msubmenu1" style="display:none;">');
	document.write('<ul>');
	document.write('<li id="jsmenu_11"><a href="lbs-develop-1.htm">简介</a></li>');
	document.write('<li id="jsmenu_12"><a href="lbs-develop-2.htm">名称解释</a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li class="mm11" id="lbsmenu_2">');
	document.write('<a href ="#" onClick="Contextdisplay(\'msubmenu\');">接口说明</a>');
	document.write('<div class="msubmenu" id="msubmenu" style="display:none;">');
	document.write('<ul>');
	document.write('<li id="lbsmenu_2_1"><a href="lbs-geodata.htm">LBS云存储</a></li>');
	document.write('<li id="lbsmenu_2_2"><a href="lbs-geosearch.htm">LBS云检索</a></li>');
	document.write('<li id="lbsmenu_2_3"><a href="lbs-appendix.htm">附录</a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li class="mm14" id="lbsmenu_3">');
	document.write('<a href ="lbs-update.htm">更新日志</a>');
	document.write('</li>');
	document.write('<li class="mm14" id="lbsmenu_5">');
	document.write('<a href ="lbs-demo.htm">示例DEMO</a>');
	document.write('</li>');
	document.write('<li class="mm14" id="lbsmenu_4">');
	document.write('<a href ="lbs-download.htm">相关下载</a>');
	document.write('</li>');
	document.write('<li class="mm14 mmanage">');
	document.write('<a href="http://lbsyun.baidu.com/datamanager/datamanage" target="_blank"><img src="static/img/outside-link-marker.png" /> LBS云管理后台</a>');
	document.write('</li>');
	document.write('</ul>');
}


//车联网导航
function addMenu_car() {
	document.write('<ul>');
	document.write('<li id="jsmenu_0" class="mm14">');
	document.write('<a href ="carhome.htm">概述</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_11" class="mm14"><a href="http://lbsyun.baidu.com/apiconsole/key?application=key" target="_blank">获取密钥</a></li>');
	document.write('<li id="jsmenu_1" class="mm11">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'msubmenu\');">开发指南</a>');
	document.write('<div class="msubmenu" id="msubmenu">');
	document.write('<ul>');
	document.write('<li id="jsmenu_11"><a href="cardevelop-1.htm">简介</a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li id="carapimenu_1" class="mm11">');
	document.write('<a href ="javascript:void(0);" onClick="Contextdisplay(\'car_api_menu\');">接口说明</a>');
	document.write('<div class="msubmenu" id="car_api_menu">');
	document.write('<ul>');
	document.write('<li id="carapimenu_111"><a href="carapi-11.htm">发送到车</a></li>');
	document.write('<li id="carapimenu_11"><a href="carapi-1.htm">Geocoding</a></li>');
	document.write('<li id="carapimenu_12"><a href="carapi-2.htm">反Geocoding</a></li>');
	document.write('<li id="carapimenu_13"><a href="carapi-3.htm">兴趣点检索</a></li>');
	document.write('<li id="carapimenu_14"><a href="carapi-4.htm">周边检索</a></li>');
	document.write('<li id="carapimenu_15"><a href="carapi-5.htm">驾车检索</a></li>');
	document.write('<li id="carapimenu_16"><a href="carapi-6.htm">测距</a></li>');
	document.write('<li id="carapimenu_17"><a href="carapi-7.htm">天气查询</a></li>');
	document.write('<li id="carapimenu_18"><a href="carapi-8.htm">交通事件查询</a></li>');
	document.write('<li id="carapimenu_19"><a href="carapi-9.htm">途径路段查询</a></li>');
	document.write('<li id="carapimenu_110"><a href="carapi-10.htm">附录</a></li>');
	document.write('</ul>');
	document.write('</div>');
	document.write('</li>');
	document.write('<li id="jsmenu_4" class="mm14">');
	document.write('<a href ="carupdate.htm">更新日志</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_12" class="mm14">');
	document.write('<a href ="car-success.htm">成功案例</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_6" class="mm14">');
	document.write('<a href ="car-download.htm">相关下载</a>');
	document.write('</li>');
	document.write('</ul>');
}



//静态图导航
function addMenu_static() {
	document.write('<ul>');
	document.write('<li id="jsmenu_0" class="mm14">');
	document.write('<a href ="staticimg.htm">概述</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_1" class="mm14">');
	document.write('<a href ="static-1.htm">接口说明</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_2" class="mm14">');
	document.write('<a href ="staticupdate.htm">更新日志</a>');
	document.write('</li>');
	document.write('</ul>');
}
//定位SDK
function addMenu_geosdk() {
	document.write('<ul>');
	document.write('<li id="jsmenu_0" class="mm14">');
	document.write('<a href ="geosdk.htm">概述</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_1" class="mm14">');
	document.write('<a href ="geosdk-android.htm">Android定位SDK</a>');
	document.write('</li>');
	document.write('<li id="jsmenu_2" class="mm14">');
	document.write('<a href ="geosdk-symbian.htm">Symbian定位SDK</a>');
	document.write('</li>');
	document.write('</ul>');
}