//a focus blur

function checkUrl() {

    var pattern = /%3C|%3E|[<>'"\(\)]/ig; //格式 RegExp("定义特殊过滤字符")
    var url = decodeURI(window.location.href);
    if (pattern.test(url)) {
        var safeUrl = '';
        for (var i = 0; i < url.length; i++) {
            safeUrl = safeUrl + url.substr(i, 1).replace(pattern, '');
        }
        safeUrl = encodeURI(safeUrl);
        setTimeout(function() {
            window.location.href = safeUrl;
        }, 0)
    }
}

checkUrl();
window.onload = function() {
    for (var i = 0; i < document.links.length; i++) document.links[i].onfocus = function() {
        this.blur()
    }
    var script = document.createElement("script");
    script.setAttribute("src", "static/guide.js?v=1.0");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("charset", "utf-8");
    setTimeout(function() {
        document.getElementsByTagName('head')[0].appendChild(script);
    }, 1);
}

//button display and hide
function Contextdisplay(whichID) {
    document.getElementById(whichID).style.display = (document.getElementById(whichID).style.display != 'block' ? 'block' : 'none');
}

//change icon on class reference page----by xieyangxin
function changeIcon(whichID, target) {
    if (document.getElementById(whichID).style.display != 'block') {
        target.className += ' ' + whichID[0] + 'ccsubmenu';
    } else {
        target.className = whichID[0] + 'csubmenu';
    }
}
//button display hidden
function displayHidden(whichID) {
    document.getElementById(whichID).style.display = 'none';
}
//button display block
function displayBlock(whichID) {
    document.getElementById(whichID).style.display = 'block';
}

//修改, by wjp
if (typeof BMap != 'undefined') {
    var map = new BMap.Map("mmap");
    var point = new BMap.Point(116.307852, 40.057031);
    map.centerAndZoom(point, 15);
    var opts = {
        width: 250, // 信息窗口宽度
        height: 80, // 信息窗口高度
        title: "<a href='http://j.map.baidu.com/K3IXc' style='color:#CC5522;font-weight:800'>百度大厦<a>" // 信息窗口标题
    }
    var infoWindow = new BMap.InfoWindow("地址：北京市海淀区上地十街10号<br/>电话：(010)59928888", opts); // 创建信息窗口对象
    map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口
}

//banner slide
//$(function(){
var time = 2000,
    slideEl = $("#slideContent"),
    indexAt = 1,
    slideHode = false;
var indexBannerSrc = ["sdk-v.jpg", "house.jpg", "developer.jpg", "iOS-SDK-v2.1.0.jpg", "match.jpg"];
//var indexBannerSrc=["sdk-v.jpg","addURI.png","ad-geosdk2.jpg","ad-cloud.jpg","ad-card2.jpg"];
var changeLength = indexBannerSrc.length;
var changeBanner = function(index) {
    if (!slideHode) {
        $('img:not(.current)', slideEl).css({
            'opacity': '0.1',
            'filter': 'alpha(opacity=30)'
        });
        var $curImg = $('img.current', slideEl);
        $curImg.fadeTo("normal", "0.3", function() {
            $curImg.removeClass('current'); //current class make img visible
            nowImg = slideEl.find("img").eq(index);
            nowImg.addClass('current').fadeTo("normal", "1");
            bg = 'static/img/' + nowImg.attr('id') + '.png';
            $("#content .hdp").css({
                'background-image': 'url(' + bg + ')',
                'background-repeat': 'repeat-x'
            });
            slideEl.children(".focus-content").find("a").removeClass("current").eq(changeLength - index - 1).addClass("current");
            indexAt = index + 1;
            indexAt %= changeLength;
        });
    }
};

var slide = function() {
    setTimeout(function() {
        changeBanner(indexAt);
        setTimeout(slide, time);
    }, time);
};
//pre load other slide image
/*
    for(var i=1;i<changeLength;i++){
        var img = new Image();
        img.src = "http://developer.baidu.com/map/static/img/"+indexBannerSrc[i];
    }
	*/
slide();

$(".focus-content").bind({
    "click": function(e) {
        var $target = $(e.target);
        if ($target.context.tagName.toLowerCase() == "a") {
            e.stopPropagation();
            var idx = parseInt($target.attr("idx"));
            changeBanner(idx);
        }
        return false;
    },
    "mouseenter": function(e) {
        slideHode = false;
    },
    "mouseleave": function(e) {
        slideHode = true;
    }
});

$(".img-content").bind({
    "mouseenter": function() {
        slideHode = true;
    },
    "mouseleave": function() {
        slideHode = false;
    }
});
//})();


/***********新闻首页图片轮播******************/
var NewsPlayer = function() {
    /****
     * container: 图片容器,
     * numbers: 按钮容器,
     * currentTitle: 信息栏
     */
    /**
     * 循环次数
     */
    var LOOP_NUMBER = 20;

    /**
     * 遍历函数
     */
    function each(arr, callback, context) {
        if (arr.forEach) {
            arr.forEach(callback, context);
        } else {
            for (var i = 0, len = arr.length; i < len; i++) {
                callback.call(context, arr[i], i, arr);
            }
        }
    }

    /**
     * 淡入效果
     */
    function fadeIn(elem) {
        setOpacity(elem, 0);
        for (var i = 0; i <= LOOP_NUMBER; i++) {
            (function(i) {
                var pos = i * 5;
                setTimeout(function() {
                    setOpacity(elem, pos);
                }, i * 25);
            })(i);
        }
    }

    /**
     * 淡出效果
     */
    function fadeOut(elem) {
        for (var i = 0; i <= LOOP_NUMBER; i++) {
            (function(i) {
                var pos = 100 - i * 5;
                setTimeout(function() {
                    setOpacity(elem, pos);
                }, i * 25);
            })(i);
        }
    }

    /**
     * 设置透明度
     */
    function setOpacity(elem, level) {
        if (elem.filters) { //IE
            elem.style.filter = "alpha(opacity=" + level + ")";
        } else {
            elem.style.opacity = level / 100;
        }
    }

    /**
     * 设置元素zIndex属性
     */
    function setZIndex(elem, zIndex) {
        elem.style.zIndex = zIndex;
    }

    return {
        play: function(container, numbers, titles) {
            var me = this,
                targetIdx = 0, //目标图片序号
                curIdx = 0, //现在图片序号
                picCount = $(numbers).children.length;


            //初始化信息
            me.titles = $(titles);
            me.arrImgs = $(container).children('a');
            me.arrNums = $(numbers).children();
            me.arrNums[0].className = "on";

            //第一张图片设置zIndex为10，其它图片透明度设置为透明(0代表透明,1代表不透明)
            each(me.arrImgs, function(elem, idx, arr) {
                if (idx == 0) {
                    elem.style.zIndex = 10;
                } else {
                    setOpacity(elem, 0);
                }
            }, me);

            //为所有的li添加点击事件
            each(me.arrNums, function(elem, idx, arr) {
                elem.onclick = function() {
                    me.fade(idx, curIdx);
                    curIdx = idx;
                    targetIdx = idx;
                }
            }, me);

            //自动轮播
            var handler = setInterval(function() {
                if (targetIdx < me.arrNums.length - 1) {
                    targetIdx++;
                } else {
                    targetIdx = 0;
                }
                me.fade(targetIdx, curIdx);
                curIdx = targetIdx;
            }, 2000);

            $(numbers).bind({
                mouseover: function() {
                    clearInterval(handler)
                },
                mouseout: function() {
                    handler = setInterval(function() {
                        if (targetIdx < me.arrNums.length - 1) {
                            targetIdx++;
                        } else {
                            targetIdx = 0;
                        }
                        me.fade(targetIdx, curIdx);
                        curIdx = targetIdx;
                    }, 2000);
                }
            });
        },
        /**
         * 执行淡入淡出动作
         */
        fade: function(idx, lastIdx) {
            var me = this;
            if (idx == lastIdx) {
                return;
            }

            var lastImg = me.arrImgs[lastIdx], //上一个img
                img = me.arrImgs[idx]; //当前img

            setZIndex(lastImg, 1);
            setZIndex(img, 10);

            fadeOut(lastImg);
            fadeIn(img);

            each(me.arrNums, function(elem, elemIdx, arr) {
                if (elemIdx != idx) {
                    me.arrNums[elemIdx].className = '';
                } else {
                    me.arrNums[elemIdx].className = 'on';
                }
            }, me);
            each(me.titles, function(elem, elemIdx, arr) {
                if (elemIdx != idx) {
                    $(me.titles[elemIdx]).removeClass('cur_title');
                } else {
                    $(me.titles[elemIdx]).addClass('cur_title');
                }
            }, me);

        }

    }
}();

/********新闻首页全部新闻内容绑定高亮事件************/
function bindHighLightingEvt() {
    // $('.news_all .all_content .item').each(function(index, item) {
    //     baidu(item).mouseover(function(e) {
    //         baidu(this).css('border', 'solid 1px #b0d2ff');
    //         baidu(this).find('.arrow_shape').toggleClass('arrow_shape_highlighting');
    //     });

    //     baidu(item).mouseout(function(e) {
    //         baidu(this).css('border', 'solid 1px #f1f1f1');
    //         baidu(this).find('.arrow_shape').toggleClass('arrow_shape_highlighting');
    //     });
    // });

    $('.news_all .all_content .item').each(function() {

        $(this).bind({
            mouseover: function() {
                $(this).css('border', 'solid 1px #b0d2ff');
                $(this).find('.arrow_shape').toggleClass('arrow_shape_highlighting');
            },
            mouseout: function() {
                $(this).css('border', 'solid 1px #f1f1f1');
                $(this).find('.arrow_shape').toggleClass('arrow_shape_highlighting');
            }
        })
    });

}