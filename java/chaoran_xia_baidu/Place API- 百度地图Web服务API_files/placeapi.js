var SAMPLE_ADVANCED_POST = 'http://api.map.baidu.com/place/v2/search?ak=您的密钥&output=json';

var advancedOptions = '';
var address;
function showOptionsURL() {
    advancedOptions = '';
    advancedOptions = SAMPLE_ADVANCED_POST;   
    var type = document.getElementById('searchType').value;
	var region = document.getElementById('region').value,
	    query = document.getElementById('query').value,
	    page_size = document.getElementById('page_size').value,
	    page_num = document.getElementById('page_num').value,
	    scope = document.getElementById('scope').value,
	    location = document.getElementById('location').value,
	    radius = document.getElementById('radius').value,
	    bounds = document.getElementById('bounds').value; 
	advancedOptions += "&query=" + query;
	advancedOptions += "&page_size=" + page_size;
	advancedOptions += "&page_num=" + page_num;
	advancedOptions += "&scope=" + scope;
    if (type == "region") {
	    advancedOptions += "&region=" + region;
    } else if (type == "bounds") {
	    advancedOptions += "&bounds=" + bounds;
    } else if (type == "location") {
	    advancedOptions += "&location=" + location;
	    advancedOptions += "&radius=" + radius;
    }

    
    var safe = advancedOptions;
    document.getElementById('optionsSampleUrl').innerHTML = safe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

function renderOption(response) {
    var html = '';
    document.getElementById('optionsNarrative').innerHTML = '';
    document.getElementById('queryResults').style.display = 'block';
    document.getElementById('queryResults').innerHTML = JsonUti.convertToString(response);
}

function doOptions() {
    showOptionsURL('buttonClick');
    var newURL = advancedOptions.replace('您的密钥','E4805d16520de693a3fe707cdc962045');
    $.getJSON("http://gothisway.duapp.com/callback.php?callback=?&url=" + encodeURIComponent(newURL), function(data){ 
        renderOption(data);
    });
};

$(document).ready(function(){
    $("#searchType").change(function() {
       var type = $("#searchType").val();
        $('#regiontr').hide();
        $('#boundstr').hide();
        $('#locationtr').hide();
        $('#radiustr').hide();
        if (type == "region") {
            $('#' + type + 'tr').show();
        } else if (type == "bounds") {
            $('#' + type + 'tr').show();
        } else if (type == "location") {
            $('#' + type + 'tr').show();
            $('#radiustr').show();
        }
    });
    
});

var JsonUti = {  
    //定义换行符  
    n: "\n",  
    //定义制表符  
    t: "\t",  
    //转换String  
    convertToString: function(obj) {  
        return JsonUti.__writeObj(obj, 1);  
    },  
    //写对象  
    __writeObj: function(obj //对象  
    , level //层次（基数为1）  
    , isInArray) { //此对象是否在一个集合内  
        //如果为空，直接输出null  
        if (obj == null) {  
            return "null";  
        }  
        //为普通类型，直接输出值  
        if (obj.constructor == Number || obj.constructor == Date || obj.constructor == String || obj.constructor == Boolean) {  
            var v = obj.toString();  
            var tab = isInArray ? JsonUti.__repeatStr(JsonUti.t, level - 1) : "";  
            if (obj.constructor == String || obj.constructor == Date) {  
                //时间格式化只是单纯输出字符串，而不是Date对象  
                return tab + ("\"" + v + "\"");  
            }  
            else if (obj.constructor == Boolean) {  
                return tab + v.toLowerCase();  
            }  
            else {  
                return tab + (v);  
            }  
        }  
        //写Json对象，缓存字符串  
        var currentObjStrings = [];  
        //遍历属性  
        for (var name in obj) {  
            var temp = [];  
            //格式化Tab  
            var paddingTab = JsonUti.__repeatStr(JsonUti.t, level);  
            temp.push(paddingTab);  
            //写出属性名  
            temp.push(name + " : ");  
            var val = obj[name];  
            if (val == null) {  
                temp.push("null");  
            }  
            else {  
                var c = val.constructor;  
                if (c == Array) { //如果为集合，循环内部对象  
                    temp.push(JsonUti.n + paddingTab + "[" + JsonUti.n);  
                    var levelUp = level + 2; //层级+2  
                    var tempArrValue = []; //集合元素相关字符串缓存片段  
                    for (var i = 0; i < val.length; i++) {  
                        //递归写对象  
                        tempArrValue.push(JsonUti.__writeObj(val[i], levelUp, true));  
                    }  
                    temp.push(tempArrValue.join("," + JsonUti.n));  
                    temp.push(JsonUti.n + paddingTab + "]");  
                }  
                else if (c == Function) {  
                    temp.push("[Function]");  
                }  
                else {  
                    //递归写对象  
                    temp.push(JsonUti.__writeObj(val, level + 1));  
                }  
            }  
            //加入当前对象“属性”字符串  
            currentObjStrings.push(temp.join(""));  
        }  
        return (level > 1 && !isInArray ? JsonUti.n: "") //如果Json对象是内部，就要换行格式化  
        + JsonUti.__repeatStr(JsonUti.t, level - 1) + "{" + JsonUti.n //加层次Tab格式化  
        + currentObjStrings.join("," + JsonUti.n) //串联所有属性值  
        + JsonUti.n + JsonUti.__repeatStr(JsonUti.t, level - 1) + "}"; //封闭对象  
    },  
    __isArray: function(obj) {  
        if (obj) {  
            return obj.constructor == Array;  
        }  
        return false;  
    },  
    __repeatStr: function(str, times) {  
        var newStr = [];  
        if (times > 0) {  
            for (var i = 0; i < times; i++) {  
                newStr.push(str);  
            }  
        }  
        return newStr.join("");  
    }  
};  
