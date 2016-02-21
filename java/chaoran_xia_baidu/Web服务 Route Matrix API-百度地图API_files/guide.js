/**
 * 增加引导页面添加guid.js文件, by wjp
 */

/**
 * cookie操作从tangram中拷贝而来
 */
window.baidu = window.baidu || {};
baidu.cookie = baidu.cookie || {};
baidu.cookie._isValidKey = function(key) {
    // http://www.w3.org/Protocols/rfc2109/rfc2109
    // Syntax:  General
    // The two state management headers, Set-Cookie and Cookie, have common
    // syntactic properties involving attribute-value pairs.  The following
    // grammar uses the notation, and tokens DIGIT (decimal digits) and
    // token (informally, a sequence of non-special, non-white space
    // characters) from the HTTP/1.1 specification [RFC 2068] to describe
    // their syntax.
    // av-pairs   = av-pair *(";" av-pair)
    // av-pair    = attr ["=" value] ; optional value
    // attr       = token
    // value      = word
    // word       = token | quoted-string

    // http://www.ietf.org/rfc/rfc2068.txt
    // token      = 1*<any CHAR except CTLs or tspecials>
    // CHAR       = <any US-ASCII character (octets 0 - 127)>
    // CTL        = <any US-ASCII control character
    //              (octets 0 - 31) and DEL (127)>
    // tspecials  = "(" | ")" | "<" | ">" | "@"
    //              | "," | ";" | ":" | "\" | <">
    //              | "/" | "[" | "]" | "?" | "="
    //              | "{" | "}" | SP | HT
    // SP         = <US-ASCII SP, space (32)>
    // HT         = <US-ASCII HT, horizontal-tab (9)>

    return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24")).test(key);
};

baidu.cookie.getRaw = function(key) {
    if (baidu.cookie._isValidKey(key)) {
        var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
            result = reg.exec(document.cookie);

        if (result) {
            return result[2] || null;
        }
    }

    return null;
};

baidu.cookie.get = function(key) {
    var value = baidu.cookie.getRaw(key);
    if ('string' == typeof value) {
        value = decodeURIComponent(value);
        return value;
    }
    return null;
};

baidu.cookie.setRaw = function(key, value, options) {
    if (!baidu.cookie._isValidKey(key)) {
        return;
    }

    options = options || {};
    //options.path = options.path || "/"; // meizz 20100402 设定一个初始值，方便后续的操作
    //berg 20100409 去掉，因为用户希望默认的path是当前路径，这样和浏览器对cookie的定义也是一致的

    // 计算cookie过期时间
    var expires = options.expires;
    if ('number' == typeof options.expires) {
        expires = new Date();
        expires.setTime(expires.getTime() + options.expires);
    }

    document.cookie =
        key + "=" + value + (options.path ? "; path=" + options.path : "") + (expires ? "; expires=" + expires.toGMTString() : "") + (options.domain ? "; domain=" + options.domain : "") + (options.secure ? "; secure" : '');
};

baidu.cookie.set = function(key, value, options) {
    baidu.cookie.setRaw(key, encodeURIComponent(value), options);
};

baidu.cookie.remove = function(key, options) {
    options = options || {};
    options.expires = new Date(0);
    baidu.cookie.setRaw(key, '', options);
};

baidu.g = function(id) {
    if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
    } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
    }
    return null;
};

/**
 * 获取对象元素在页面中的位置
 * @param {Object} Html元素对象
 * @return {Object} 位置对象
 */
function getPosition(obj) {
    var pos = {
        left: 0,
        top: 0
    };
    while (obj && obj.offsetParent) {
        pos.left += obj.offsetLeft;
        pos.top += obj.offsetTop;
        obj = obj.offsetParent;
    };
    return pos;
}

/**
 * 计算窗口尺寸
 */
function getClientSize() {
    if (window.innerHeight) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    } else if (document.documentElement && document.documentElement.clientHeight) {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    } else {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    }
}

/**
 * 计算页面总的尺寸
 */
function getPageSize() {
    return {
        width: document.documentElement.scrollWidth || document.body.scrollWidth,
        height: document.documentElement.scrollHeight || document.body.scrollHeight
    };
}

/**
 * 获取dom元素的高宽
 */
function getDomSize(dom) {
    return {
        width: dom.offsetWidth,
        height: dom.offsetHeight
    }
}

/**
 * 判断是否显示引导页面
 */
function isDispGuide() {
    initGuide(); //设置引导页的位置

    if (!baidu.cookie.get('hasDisplayed')) {
        var opts = {
            expires: 365 * 24 * 60 * 60 * 1000 //设置1年
        };
        baidu.cookie.set('hasDisplayed', true, opts);

        openGuide();
    }

    //openGuide();//debug    
}

/**
 * 显示引导页面
 */
function initGuide() {
    var size = getClientSize(),
        domGuideContainer = baidu.g('guideContainer'),
        containerSize = getDomSize(domGuideContainer);

    //弹出窗口居中显示
    var left = (size.width - containerSize.width) / 2,
        top = (size.height - containerSize.height) / 2;

    domGuideContainer.style.left = left + 'px';
    domGuideContainer.style.top = top + 'px';

    /*
    //开关按钮调整到合适位置
    var guideArrowSize = getDomSize(baidu.g('guide_arrow')),
        domSwitch = baidu.g('guideSwitch'),
        h_margin = 5,
        v_margin = 25;
    domSwitch.style.left = (left + containerSize.width 
                            + guideArrowSize.width + h_margin) + 'px';
    domSwitch.style.top = (top + guideArrowSize.height + v_margin) + 'px';
    */

    //设置遮罩层的高度
    var domMask = baidu.g('guideMask'),
        pageSize = getPageSize();
    domMask.style.width = pageSize.width + 'px';
    domMask.style.height = pageSize.height + 'px';
}

/**
 * 打开引导页面
 */
function openGuide() {
    initGuide(); //页面长度发生变化
    baidu.g('guideContainer').style.visibility = 'visible';
    baidu.g('guideMask').style.display = 'block';
}

/**
 * 关闭引导页面
 */
function closeGuide() {
    baidu.g('guideContainer').style.visibility = 'hidden';
    baidu.g('guideMask').style.display = 'none';

    _addStat('apidoc_guide17')
}

/**
 * 打开弹出提出信息
 */
function openTip(id) {
    var dom = baidu.g(id);
    dom.style.display = 'block';
}

/**
 * 关闭弹出提出信息
 */
function closeTip(id) {
    var dom = baidu.g(id);
    dom.style.display = 'none';
}
//更新统计方法
window._addStatNew = function(product, opts) {
    if (!product) {
        return;
    }
    // 组装参数
    opts = opts || {};
    var extq = '';
    for (var i in opts) {
        extq = extq + '&' + i + '=' + encodeURIComponent(opts[i]);
    }
    // 内部函数定义 - 发送统计请求
    var sendStatnew = function(q) {
        if (!q) {
            return;
        }
        _addStatNew._sending = true;
        setTimeout(function() {
            _addStatNew._img.src = 'http://api.map.baidu.com/images/blank.gif?' + q.src
        }, 50);
    }
    // 内部函数定义 - 发送队列中下一个统计请求
    var reqNext = function() {
        var nq = _addStatNew._reqQueue.shift();
        if (nq) {
            sendStatnew(nq);
        }
    }
    var ts = (Math.random() * 100000000).toFixed(0);
    if (_addStatNew._sending) {
        // 将本次请求加入队列
        _addStatNew._reqQueue.push({
            src: 't=' + ts + '&product=' + product + extq
        });
    } else {
        // 直接发送请求
        sendStatnew({
            src: 't=' + ts + '&product=' + product + extq
        });
    }
    // 绑定事件
    if (!_addStatNew._binded) {
        //baidu.on修改为on事件, by wjp
        _addStatNew._img.onload = function() {
            _addStatNew._sending = false;
            reqNext();
        }

        _addStatNew._img.onerror = function() {
            _addStatNew._sending = false;
            reqNext();
        }
        _addStatNew._binded = true;
    }
};

// 初始化请求队列
window._addStatNew._reqQueue = [];
window._addStatNew._img = new Image();

// 统计
window._addStat = function(code, opts) {

    if (!code) {
        return;
    }
    // 组装参数
    opts = opts || {};
    var extq = '';
    for (var i in opts) {
        extq = extq + '&' + i + '=' + encodeURIComponent(opts[i]);
    }
    // 内部函数定义 - 发送统计请求
    var sendStat = function(q) {
        if (!q) {
            return;
        }
        _addStat._sending = true;
        setTimeout(function() {
            _addStat._img.src = 'http://api.map.baidu.com/images/blank.gif?' + q.src
        }, 50);
    }
    // 内部函数定义 - 发送队列中下一个统计请求
    var reqNext = function() {
        var nq = _addStat._reqQueue.shift();
        if (nq) {
            sendStat(nq);
        }
    }
    var ts = (Math.random() * 100000000).toFixed(0);
    if (_addStat._sending) {
        // 将本次请求加入队列
        _addStat._reqQueue.push({
            src: 't=' + ts + '&code=' + code + extq
        });
    } else {
        // 直接发送请求
        sendStat({
            src: 't=' + ts + '&code=' + code + extq
        });
    }
    // 绑定事件
    if (!_addStat._binded) {
        //baidu.on修改为on事件, by wjp
        _addStat._img.onload = function() {
            _addStat._sending = false;
            reqNext();
        }

        _addStat._img.onerror = function() {
            _addStat._sending = false;
            reqNext();
        }
        _addStat._binded = true;
    }
};
// 初始化请求队列
window._addStat._reqQueue = [];
window._addStat._img = new Image();

//统计项
/*
apidoc_guide1 //程序猿
apidoc_guide2 //Android程序猿 
apidoc_guide3 //iOS程序猿
apidoc_guide4 //C#/C++/Java程序猿
apidoc_guide5 //汽车厂商（车联网服务）
apidoc_guide6 //硬件制造厂商（手机、Pad等）
apidoc_guide7 //开发小白
apidoc_guide8 //Android定位 
apidoc_guide9 //Symbian定位
apidoc_guide10 //iOS定位
apidoc_guide11 //我要管理我的数据
apidoc_guide12 //我要调用百度地图
apidoc_guide13 //我要搜索百度POI数据
apidoc_guide14 //我要坐标 我要地址
apidoc_guide15 //更多问题
apidoc_guide16 //官网指南针
apidoc_guide17 //点击叉号关闭
*/

//添加首页引导页的dom元素
var htmlBody = document.getElementsByTagName("body")[0];
/*
var guideSwitch = document.createElement("div");
guideSwitch.setAttribute('id', 'guideSwitch');
guideSwitch.onclick = function () {
    openGuide();
    _addStat('apidoc_guide16');
} 
htmlBody.appendChild(guideSwitch);
*/

var guideMask = document.createElement("div");
guideMask.setAttribute("id", "guideMask");
htmlBody.appendChild(guideMask);

var guideContainer = document.createElement("div");
guideContainer.setAttribute("id", "guideContainer");
guideContainer.innerHTML = [
    '<div class="guide_title">',
    '<span>亲爱的访客：<span class="high">免费！</span>木有商业版，木有收费版... 全国人民用的都一样!</span>',
    '<div class="guide_close" onclick="closeGuide()"></div>',
    '</div>',
    '<div class="guide_content">',
    '<div id="guide_arrow"></div>',
    '<div class="title">我是...</div>',
    '<div class="item">',
    '<div class="item_left">',
    '<div class="guide_icon">',
    '<div class="programmer"></div>',
    '</div>',
    '<div class="guide_text">',
    '<div class="text_title">程序猿</div>',
    '<div class="text_link">',
    '<a onclick="_addStat(\'apidoc_guide1\')" href="http://developer.baidu.com/map/jshome.htm" target="_blank">Web程序猿</a>',
    '<a onclick="_addStat(\'apidoc_guide2\')" href="http://developer.baidu.com/map/sdk-android.htm" target="_blank">Android程序猿</a>',
    '<a onclick="_addStat(\'apidoc_guide3\')" href="http://developer.baidu.com/map/sdk-ios.htm" target="_blank">iOS程序猿</a><br/>',
    '<a onclick="_addStat(\'apidoc_guide4\')" href="http://developer.baidu.com/map/webservice.htm" target="_blank">C#/C++/Java程序猿</a>',
    '</div>',
    '</div>',
    '</div>',
    '<div class="item_right">',
    '<div class="guide_icon">',
    '<div class="factory"></div>',
    '</div>',
    '<div class="guide_text">',
    '<div class="text_title">厂商</div>',
    '<div class="text_link">',
    '<a onclick="_addStat(\'apidoc_guide5\')" href="http://developer.baidu.com/map/carhome.htm" target="_blank">汽车厂商（车联网服务）</a><br/>',
    '<a onclick="_addStat(\'apidoc_guide6\')" href="mailto:mapapi@baidu.com" onmouseover="openTip(\'hardwareTip\')" onmouseout="closeTip(\'hardwareTip\')">硬件制造厂商（手机、Pad等）</a>        <div id="hardwareTip" class="popTip"><span>地图需求的商业合作请发送邮件至mapapi@baidu.com</span></div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '<div class="dashline dashline_margin_bottom">',
    '<div class="dashline_left"></div>',
    '</div>',
    '<div class="item">',
    '<div class="item_left">',
    '<div class="guide_icon">',
    '<div class="xiaobai"></div>',
    '</div>',
    '<div class="guide_text">',
    '<div class="text_title">开发小白</div>',
    '<div class="text_tip">',
    '<span>老板催得紧，不会开发，咋办呀？<br/>这里一样潇洒用地图。</span>',
    '</div>',
    '<div class="text_link">',
    '<a onclick="_addStat(\'apidoc_guide7\')" href="http://developer.baidu.com/map/tool.htm" target="_blank">立即进入</a>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '<div class="solidline"></div>',
    '<div class="title">我要...</div>',
    '<div class="item item_short">',
    '<div class="item_left">',
    '<div class="guide_icon">',
    '<div class="position"></div>',
    '</div>',
    '<div class="guide_text">',
    '<div class="text_title">我要定位</div>',
    '<div class="text_link link_zIndex">',
    '<a onclick="_addStat(\'apidoc_guide8\')" href="http://developer.baidu.com/map/geosdk-android.htm" target="_blank">Android定位</a>',
    '<a onclick="_addStat(\'apidoc_guide9\')" href="http://developer.baidu.com/map/geosdk-symbian.htm" target="_blank">Symbian定位</a>',
    '<a onclick="_addStat(\'apidoc_guide10\')" href="javascript:void(0)" onmouseover="openTip(\'iosTip\')" onmouseout="closeTip(\'iosTip\')">iOS定位</a>',
    '<div id="iosTip" class="popTip"><span>请使用iOS系统自带的定位功能。为啥我木有？去问乔布斯哈！</span></div>',
    '</div>',
    '</div>',
    '</div>',
    '<div class="item_right">',
    '<div class="guide_icon">',
    '<div class="process"></div>',
    '</div>',
    '<div class="guide_text">',
    '<div class="text_title">我要管理我的数据</div>',
    '<div class="text_tip">',
    '<span>LBS云：帮您存、查、地图展示！</span>',
    '</div>',
    '<div class="text_link">',
    '<a onclick="_addStat(\'apidoc_guide11\')" href="http://developer.baidu.com/map/lbs-cloud.htm" target="_blank">立即进入</a>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '<div class="dashline dashline_margin_bottom">',
    '<div class="dashline_left"></div>',
    '<div class="dashline_right"></div>',
    '</div>',
    '<div class="item">',
    '<div class="item_left">',
    '<div class="guide_icon">',
    '<div class="callbaidu"></div>',
    '</div>',
    '<div class="guide_text">',
    '<div class="text_title">我要调用百度地图</div>',
    '<div class="text_tip">',
    '<span>从今以后这不再是梦！看位置、查公交<br/>一键分享都变得那么简单！</span>',
    '</div>',
    '<div class="text_link">',
    '<a onclick="_addStat(\'apidoc_guide12\')" href="http://developer.baidu.com/map/uri.htm" target="_blank">立即进入</a>',
    '</div>',
    '</div>',
    '</div>',
    '<div class="item_right">',
    '<div class="guide_icon">',
    '<div class="baidupoi"></div>',
    '</div>',
    '<div class="guide_text">',
    '<div class="text_title">我要搜索百度POI数据</div>',
    '<div class="text_tip">',
    '<span>北京的购物中心、宾馆...<br/>周边的餐馆、电影院...还有详情可以看！</span>',
    '</div>',
    '<div class="text_link">',
    '<a onclick="_addStat(\'apidoc_guide13\')" href="http://developer.baidu.com/map/webservice-placeapi.htm" target="_blank">立即进入</a>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '<div class="dashline dashline_margin_vertical">',
    '<div class="dashline_left"></div>',
    '</div>',
    '<div class="item">',
    '<div class="item_left">',
    '<div class="guide_icon">',
    '<div class="coord"></div>',
    '</div>',
    '<div class="guide_text">',
    '<div class="text_title">我要坐标 我要地址</div>',
    '<div class="text_tip">',
    '<span>坐标与地址间的解析，Geocoding帮您搞定！</span>',
    '</div>',
    '<div class="text_link">',
    '<a onclick="_addStat(\'apidoc_guide14\')" href="http://developer.baidu.com/map/webservice-geocoding.htm" target="_blank">立即进入</a>',
    '</div>',
    '</div>',
    '</div>',
    '<div class="item_right">',
    '<div class="more_problem">',
    '<a onclick="_addStat(\'apidoc_guide15\')" href="http://developer.baidu.com/map/question.htm" target="_blank">更多问题...</a>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
].join('');
htmlBody.appendChild(guideContainer);

isDispGuide(); //判断是否显示guide页面
window.onresize = function() {
    initGuide(); //窗口发生变化时，重新引导页面位置
};

(function() {
    // JavaScript Document
    var html = '<div class="gf-con">' + '<div class="gf-plugin" id="gf_to_top"><a href="javascript:void(0)">返回顶部</a></div>' + '<div class="gf-plugin" id="gf_guide"><a href="javascript:openGuide();" onclick="_addStatNew(\'lbsapi_guanwang\',{\'operate\': \'guanwang_productclick\'})">产品指引</a></div>' + '<div class="gf-plugin" id="gf_for_help"><a href="help_index.html"  onclick="_addStatNew(\'lbsapi_guanwang\',{\'operate\': \'guanwang_helpclick\'})">咨询求助</a></div>' + '<div class="gf-plugin" id="gf_suggestion"><a href="suggest_index.html" onclick="_addStatNew(\'lbsapi_guanwang\',{\'operate\': \'guanwang_feedbackclick\'})">意见反馈</a></div>' + '</div>';

    $(html).appendTo($('body'));

    var $bTop = $('#gf_to_top');

    $(window).scroll(function() {
        if ($(this).scrollTop() >= 10) {
            $bTop.fadeIn();
            // if($('#slideToolBar')){
            //     $('#slideToolBar').fadeIn();
            // }
        } else {
            $bTop.fadeOut();
            // if($('#slideToolBar')){
            //     $('#slideToolBar').fadeOut();
            // }
        }
        /**********页面滚动侧边导航栏滑动效果*******/
        if ((document.getElementById('dIndustry')) && (document.getElementById('dSituation')) && (document.getElementById('dFunction')) && (document.getElementById('dShare'))) {

            var wHeight = $(this).scrollTop() + $(this).height(); //当前视图+滚动高度
            var dIndustryHeight = $('#dIndustry').offset().top + $('#dIndustry').height() + 107;
            var dSituationHeight = $('#dSituation').offset().top + $('#dSituation').height() + 107;
            var dFunctionHeight = $('#dFunction').offset().top + $('#dFunction').height() + 107;
            var dShareHeight = $('#dShare').offset().top + $('#dShare').height() + 107;
            /************元素进入试图内元素Y方向偏移量******************/
            var dIndustryDiffIn = wHeight - $('#dIndustry').offset().top - 28;
            var dSituationDiffIn = wHeight - $('#dSituation').offset().top - 28;
            var dFunctionDiffIn = wHeight - $('#dFunction').offset().top - 28;
            var dShareDiffIn = wHeight - $('#dShare').offset().top - 28;

            /*************元素离开试图时元素Y方向的偏移量***************/
            var dIndustryDiffOut = dIndustryHeight - $(this).scrollTop();
            var dSituationDiffOut = dSituationHeight - $(this).scrollTop();
            var dFunctionDiffOut = dFunctionHeight - $(this).scrollTop();
            var dShareDiffOut = dShareHeight - $(this).scrollTop();

            if (dIndustryDiffIn > 200) {
                $('.sideCatalog-dot').css("background-position", "-1px -45px");
                // $('.sideCatalog-dot').css("background","url(static/tmp/dot-off.jpg) no-repeat")
                $('#sideCatalog-item-1 a').siblings('.sideCatalog-dot').css("background-position", "-1px -5px");
                //$('#sideCatalog-item-1 a').siblings('.sideCatalog-dot').css("background","url(static/tmp/dot-on.jpg) no-repeat");
                $('.sideCatalog-item a').css({
                    'background': '#FFFFFF',
                    'color': '#7d7d7d',
                    'text-indent': "0px"
                });
                $('#sideCatalog-item-1 a').css({
                    'background': '#2D88F3',
                    'color': '#FFFFFF',
                    'text-indent': "5px"
                });
                $('.mod-triangle .t-inset').css('border-color', 'transparent #FFFFFF transparent transparent');
                $('#sideCatalog-item-1 a').siblings('.mod-triangle').children('.t-inset').css('border-color', 'transparent #2D88F3 transparent transparent');
            }
            if (dSituationDiffIn > 200) {
                $('.sideCatalog-dot').css("background-position", "-1px -45px");
                // $('.sideCatalog-dot').css("background","url(static/tmp/dot-off.jpg) no-repeat")
                $('#sideCatalog-item-2 a').siblings('.sideCatalog-dot').css("background-position", "-1px -5px");
                //$('#sideCatalog-item-2 a').siblings('.sideCatalog-dot').css("background","url(static/tmp/dot-on.jpg) no-repeat");
                $('.sideCatalog-item a').css({
                    'background': '#FFFFFF',
                    'color': '#7d7d7d',
                    'text-indent': "0px"
                });
                $('#sideCatalog-item-2 a').css({
                    'background': '#2D88F3',
                    'color': '#FFFFFF',
                    'text-indent': "5px"
                });
                $('.mod-triangle .t-inset').css('border-color', 'transparent #FFFFFF transparent transparent');
                $('#sideCatalog-item-2 a').siblings('.mod-triangle').children('.t-inset').css('border-color', 'transparent #2D88F3 transparent transparent');
            }
            if (dFunctionDiffIn > 200) {
                $('.sideCatalog-dot').css("background-position", "-1px -45px");
                // $('.sideCatalog-dot').css("background","url(static/tmp/dot-off.jpg) no-repeat")
                $('#sideCatalog-item-3 a').siblings('.sideCatalog-dot').css("background-position", "-1px -5px");
                //$('#sideCatalog-item-3 a').siblings('.sideCatalog-dot').css("background","url(static/tmp/dot-on.jpg) no-repeat");
                $('.sideCatalog-item a').css({
                    'background': '#FFFFFF',
                    'color': '#7d7d7d',
                    'text-indent': "0px"
                });
                $('#sideCatalog-item-3 a').css({
                    'background': '#2D88F3',
                    'color': '#FFFFFF',
                    'text-indent': "5px"
                });
                $('.mod-triangle .t-inset').css('border-color', 'transparent #FFFFFF transparent transparent');
                $('#sideCatalog-item-3 a').siblings('.mod-triangle').children('.t-inset').css('border-color', 'transparent #2D88F3 transparent transparent');
            }
            if (dShareDiffIn > 200) {
                $('.sideCatalog-dot').css("background-position", "-1px -45px");
                // $('.sideCatalog-dot').css("background","url(static/tmp/dot-off.jpg) no-repeat")
                $('#sideCatalog-item-4 a').siblings('.sideCatalog-dot').css("background-position", "-1px -5px");
                //$('#sideCatalog-item-4 a').siblings('.sideCatalog-dot').css("background","url(static/tmp/dot-on.jpg) no-repeat");
                $('.sideCatalog-item a').css({
                    'background': '#FFFFFF',
                    'color': '#7d7d7d',
                    'text-indent': "0px"
                });
                $('#sideCatalog-item-4 a').css({
                    'background': '#2D88F3',
                    'color': '#FFFFFF',
                    'text-indent': "5px"
                });
                $('.mod-triangle .t-inset').css('border-color', 'transparent #FFFFFF transparent transparent');
                $('#sideCatalog-item-4 a').siblings('.mod-triangle').children('.t-inset').css('border-color', 'transparent #2D88F3 transparent transparent');
            }
        }
        /********end ************/
    });

    $('.gf-plugin').hover(
        function() {
            $(this).stop(true).animate({
                width: 90
            }, 170).css('textIndent', 18);
        },
        function() {
            $(this).stop(true).animate({
                width: 54
            }, 170).css('textIndent', 22);
        });

    $bTop.click(function() {
        $("body, html").animate({
            scrollTop: "0px"
        });
    });

})();

(function($) {
    $.fn.dropdown = function(settings) {
        var defaults = {
            dropdownEl: '.dropdown-menu',
            open: 'Top_on',
            delayTime: 100
        }
        var opts = $.extend(defaults, settings);
        return this.each(function() {
            var curObj = null;
            var preObj = null;
            var openedTimer = null;
            var closedTimer = null;
            $(this).hover(function() {
                if (openedTimer)
                    clearTimeout(openedTimer);
                curObj = $(this);
                openedTimer = setTimeout(function() {
                    curObj.addClass(opts.open).find(opts.dropdownEl).show();
                }, opts.delayTime);
                preObj = curObj;
            }, function() {
                if (openedTimer)
                    clearTimeout(openedTimer);
                openedTimer = setTimeout(function() {
                    preObj.removeClass(opts.open).find(opts.dropdownEl).hide();
                }, opts.delayTime);
            });
            /*//点击事件关闭菜单
			$(this).bind('click', function(){
				if(openedTimer)
				clearTimeout(openedTimer);
				openedTimer = setTimeout(function(){
					preObj.removeClass(opts.openedClass).find(opts.dropdownEl).hide();
				},opts.delayTime);
			});*/
        });
    };
})(jQuery);

//悬浮做导航栏
(function($) {
    $.fn.smartFloat = function() {
        var position = function(element) {
            var top = element.position().top,
                pos = element.css("position"),
                scrollHeight = this.$('body')[0].scrollHeight;
            var maxDifY = scrollHeight - $(".mwrappend").outerHeight(true) - $(".copyright").outerHeight(true) - 100;
            // console.log("body scrollHeight:",scrollHeight)
            // console.log("element.scrollHeight:",element[0].scrollHeight);
            // console.log("maxY:",maxY);
            // console.log("top:",top);
            // console.log("foot:",$(".foot").parent().outerHeight(true));
            // console.log("pos:",pos);
            $(window).scroll(function() {
                var scrolls = $(this).scrollTop();
                var maxY = maxDifY - element[0].scrollHeight;
                if (scrolls > top) {
                    // console.log(scrolls)
                    if (scrolls < maxY) {
                        if (window.XMLHttpRequest) {
                            element.css({
                                position: "fixed",
                                top: 0
                            });
                        } else {
                            element.css({
                                top: scrolls
                            });
                        }
                    } else {
                        // console.log(">",maxY - top)
                        element.css({
                            position: 'relative',
                            top: (maxY - top) + 'px'
                        });
                    }
                } else {
                    element.css({
                        position: pos,
                        top: top
                    });
                }
            });
        };
        return $(this).each(function() {
            position($(this));
        });
    };

})(jQuery);

$(document).ready(function() {
    $('.mmenu').smartFloat();
});
//下拉菜单
$(document).ready(function() {
    $('#headeTop_main .nav-item').dropdown({
        dropdownEl: '.homeTab',
        openclass: 'Top_on'
    });
});

(function($) {
    $.fn.dropdowns = function(settings) {
        var defaults = {
            dropdownEl: '.dropdown-menu',
            delayTime: 100
        }
        var opts = $.extend(defaults, settings);
        return this.each(function() {
            var curObj = null;
            var preObj = null;
            var openedTimer = null;
            var closedTimer = null;
            $(this).hover(function() {
                if (openedTimer)
                    clearTimeout(openedTimer);
                curObj = $(this);
                var isclass = curObj.find('a.nav_on');
                if (isclass.length <= 0) {
                    openedTimer = setTimeout(function() {
                        curObj.find(opts.dropdownEl).show();
                    }, opts.delayTime);
                    preObj = curObj;
                }

            }, function() {
                if (openedTimer)
                    clearTimeout(openedTimer);
                openedTimer = setTimeout(function() {
                    if (preObj) {
                        preObj.find(opts.dropdownEl).hide();
                    }

                }, opts.delayTime);
            });
            // //点击事件关闭菜单
            // $(this).bind('click', function(){
            //     if(openedTimer)
            //     clearTimeout(openedTimer);
            //     openedTimer = setTimeout(function(){
            //         preObj.find(opts.dropdownEl).hide();
            //     },opts.delayTime);
            // });
        });
    };
})(jQuery);

//下拉菜单
$(document).ready(function() {
    $('#nav .nav-item').dropdowns({
        dropdownEl: '.homeTab'
    });
});