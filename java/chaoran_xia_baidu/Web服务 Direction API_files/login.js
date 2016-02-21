/**
 *  用户登录组件
 *  @param {JsonObject} ops json对象参数
 */
window.tag = 0;
var M = {};
// jQuery.cookie = function(name, value, options) {
//     if (typeof value != 'undefined') { // name and value given, set cookie
//         options = options || {};
//         if (value === null) {
//             value = '';
//             options.expires = -1;
//         }
//         var expires = '';
//         if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
//             var date;
//             if (typeof options.expires == 'number') {
//                 date = new Date();
//                 date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
//             } else {
//                 date = options.expires;
//             }
//             expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
//         }
//         var path = options.path ? '; path=' + options.path : '';
//         var domain = options.domain ? '; domain=' + options.domain : '';
//         var secure = options.secure ? '; secure' : '';
//         document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
//     } else { // only name given, get cookie
//         var cookieValue = null;
//         if (document.cookie && document.cookie != '') {
//             var cookies = document.cookie.split(';');
//             for (var i = 0; i < cookies.length; i++) {
//                 var cookie = jQuery.trim(cookies[i]);
//                 // Does this cookie string begin with the name we want?
//                 if (cookie.substring(0, name.length + 1) == (name + '=')) {
//                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                     break;
//                 }
//             }
//         }
//         return cookieValue;
//     }
// };
M.service = {};
M.service.login = function(ops) {
    var backurl = ops.backurl; // 登录退出后的跳转地址 [必须输入项]
    var echo = ops.echo; // 回调函数→script加载完被调用
    var charset = ops.charset; // 编码
    var flag = ops.flag; // 是否启用缓存 默认不缓存
    var callback = ops.callback; // 回调函数→在_getUserState方法中被调用

    M.service.login._config["backurl"] = backurl;
    M.service.login._config["callback"] = callback;
    //M.service.login._setHtml("s",null);
    var url = M.service.login._config["ACCESS"];
    jQuery.getJSON(url, function(userState) {
        var callback = M.service.login._config["callback"];
        if (userState) {
            var type = userState.isOnline == 1 ? "e" : "s";
            if (type == 's') {
                $("#login").attr('href', "https://passport.baidu.com/?login&u=" + location.href);
                $("#register").attr('href', "https://passport.baidu.com/v2/?reg&regType=1&tpl=mn&u=" + location.href);
                $("#login-reg-li").show();
            } else {
                $("#login-reg-li").hide();
                $("#logout").attr('href', "http://passport.baidu.com/?logout&u=" + M.service.login._config["backurl"]);
                // var icon = Array(userState.uName);
                // icon.push('<a href="http: //passport.baidu.com/?logout&u=' + M.service.login._config["backurl"] + '" id="logout">退出</a>');
                // loginBar = icon.join(M.service.login._config["SPLIT"]);
                //userState.uName = 'shortbaby';
                if (userState.uName == '') {
                    userState.uName = userState.email;
                }
                if (userState.uName.length > 15) {
                    userState.uName = userState.uName.replace(userState.uName.substring(1, userState.uName.length - 10), '...');
                }

                $("#userName").html(userState.uName);
                $('#user-state-li').bind({
                    "mouseenter": function(e) {

                        $('.username-dropdown').css('visibility', 'visible');
                    },
                    "mouseleave": function(e) {

                        $('.username-dropdown').css('visibility', 'hidden');
                    }
                });
                $("#user-state-li").show();

            }
        }
    });
}
M.service.login._config = {
    ACCESS: "http://mc.map.baidu.com/passport/Session.php?callback=?", // 取用户信息
    LOGIN: "https://passport.baidu.com/?login&u=" + location.href, // 登录passport地址
    SPLIT: "&nbsp;|&nbsp;" // 链接项目的分隔符
}

// 登录组件加载
$(document).ready(function() {
    var backurl = location.href;
    backurl = backurl.replace(/[<>]/g, function(match, pos, originalText) {
        switch (match) {
            case "<":
                return '&lt;';
                break;
            case ">":
                return '&gt;';
                break;
            case "&":
                return '&amp;';
                break;
            case "\"":
                return '&quot;';
                break;
        }
    });
    M.service.login({
        backurl: backurl, // *退出【登录】后的访问地址
        callback: function(o) {}
    });
});