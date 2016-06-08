var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
var is_mac = userAgent.indexOf('mac') != -1;

/*判断是不是显示翻页提示*/
var website=GetCookie('naizuier');
if(website==null && document.getElementById("zyf"))
{
 document.getElementById('zyf').style.display="block"; 
}
function hid()
{
	SetCookie('naizuier','article','m',30);
	document.getElementById("zyf").style.display="none";	
}
/*点击统计*/
function ClickPv(pbid,bdid,spid,ckpid,scid,bid,pid) {
        var clickpvtrack = new ClickPvTrack();
        clickpvtrack.cid = 4; 
        clickpvtrack.cpid = 9; 
        clickpvtrack.pbid = pbid; 
        clickpvtrack.bdid = bdid; 
        clickpvtrack.spid = spid;
        clickpvtrack.ckpid = ckpid;
        clickpvtrack.scid = scid;
        clickpvtrack.bid = bid;
        clickpvtrack.pid = pid;
        clickpvtrack.track();
    } 

/*其他*/
function doane(event) {
	e = event ? event : window.event;
	if(is_ie) {
		e.returnValue = false;
		e.cancelBubble = true;
	} else if(e) {
		e.stopPropagation();
		e.preventDefault();
	}
}

function GetRoundNum()
{
	var roundNum = Math.round((Math.random()) * 100000000);
	return roundNum;
}

function kill_error()
{
  return true;
 }
//window.onerror = kill_error;
function autoResize()
{
	try
	{
		document.getElementById("frmFlowAdd").style.height = frmFlowAdd.document.body.scrollHeight;
	}
	catch(e){}
}

function getElementsByClassName(n) { 
    var el = [],
        _el = document.getElementsByTagName('div');
    for (var i=0; i<_el.length; i++ ) {
       if (_el[i].className == n ) {
           el[el.length] = _el[i];
        }
   }
   return el;
}

function GetParentEle(element)
{
    if (is_ie) {
    return element.parentElement;
    }
    return element.parentNode;
}

function FindParentElement(element, tagName)
{
    while(element != null && element.tagName != tagName )
    {
        element = element.parentElement;
    }
    if ( element != null && element.tagName == tagName )
    {
        return element;
    }
    return null;
}

function FindChildElement(element, tagName)
{
    var isFounded = false;
    var elements = element;
    var result = element;
    if ( element.tagName == tagName )
    {
        return element;
    }
    while(!isFounded && elements != null && result != null && result.tagName != tagName)
    {
        elements = elements.childNodes;
        for( var i=0 ; elements != null && i < elements.length ; i++ )
        {
            result = elements.item(i);
            var result2 = FindChildElement(result, tagName);
            if ( result == null || result2 == null )
            {
                continue;
            }
            if ( result.tagName == tagName || result2.tagName == tagName )
            {
                if ( result2.tagName == tagName )
                {
                    result = result2;
                }
                isFounded = true;
                break;
            }
        }
    }
    if ( isFounded )
    {
        return result;
    }
    else
    {
        return null;
    }
}

 function SetIframeHeight(objId){ 
	var iframe=$(objId); 
	if (document.getElementById)
	{
		if(is_ie)
		{
			if (iframe && !window.opera){
				if (iframe.contentDocument && iframe.contentDocument.body.offsetHeight){
				 iframe.height = iframe.contentDocument.body.offsetHeight;
				}else if(iframe.Document && iframe.Document.body.scrollHeight){
				 iframe.height = iframe.Document.body.scrollHeight;
				}
			}
		}
		else
		{
			if (iframe && !window.opera){
				if (iframe.contentDocument && iframe.contentDocument.body.offsetHeight){
				 iframe.height = iframe.contentDocument.body.offsetHeight+20;
				}else if(iframe.Document && iframe.Document.body.scrollHeight){
				 iframe.height = iframe.Document.body.scrollHeight+20;
				}
			}
		}		
	}
  
 }

function GetCookieVal(offset){
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1)
endstr = document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie(name){
var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
while (i < clen){
var j = i + alen;
if (document.cookie.substring(i, j) == arg)
return GetCookieVal (j);
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) break;
}
return null;
}

function DelCookie(name){
var exp = new Date();
exp.setTime (exp.getTime() - 1);
var cval = GetCookie (name);
document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString();
}

function SetCookie(name, value,interval,number){
if (interval == "0") return false;
var expdate = new Date();
var argv = SetCookie.arguments;
var argc = SetCookie.arguments.length;
var expires = DateAdd(interval,number,expdate);
var path = "/";
var domain = "it168.com";
var reqUrl = window.location.href.toLowerCase(); 
if (reqUrl.lastIndexOf("itpub.net")>0) 
	domain='itpub.net';

var secure = (argc > 6) ? argv[6] : false;
document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expires.toGMTString()))
+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))
+((secure == true) ? "; secure" : "");
}

function DateAdd(interval,number,date){
switch(interval){
case "y":{
date.setFullYear(date.getFullYear()+number); 
return date; 
break; 
}
case "q":{
date.setMonth(date.getMonth()+number*3); 
return date; 
break; 
}
case "m":{
date.setMonth(date.getMonth()+number); 
return date; 
break; 
}
case "w":{
date.setDate(date.getDate()+number*7); 
return date; 
break; 
}
case "d":{
date.setDate(date.getDate()+number); 
return date; 
break; 
}
case "h":{
date.setHours(date.getHours()+number); 
return date; 
break; 
}
case "M":{
date.setMinutes(date.getMinutes()+number); 
return date; 
break; 
}
case "s":{
date.setSeconds(date.getSeconds()+number); 
return date; 
break; 
}
case "0":{ 
return date; 
break; 
}
} 
}
/*ajaxrequest*/
function getcookie(name) {
    var cookie_start = document.cookie.indexOf(name);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}

function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
    var expires = new Date();
    expires.setTime(expires.getTime() + seconds * 1000);
    domain = !domain ? cookiedomain : domain;
    path = !path ? cookiepath : path;
    document.cookie = escape(cookieName) + '=' + escape(cookieValue)
        + (expires ? '; expires=' + expires.toGMTString() : '')
        + (path ? '; path=' + path : '/')
        + (domain ? '; domain=' + domain : '')
        + (secure ? '; secure' : '');
}
//var oScript;
function request(id,url){
     oScript = document.getElementById(id);
     var head = document.getElementsByTagName("head").item(0);
     if (oScript) {
        head.removeChild(oScript);
     }
     oScript = document.createElement("script");
     oScript.setAttribute("src", url);
     oScript.setAttribute("id",id);
     oScript.setAttribute("type","text/javascript");
     oScript.setAttribute("language","javascript");
     head.appendChild(oScript);
     return oScript;
}

function done()
{
	var uselogin = getcookie('sso_userid');
	var preurl = articlePath;
	var aid = articleCode;
	var cookieaid = getcookie('acticleid');
	if(uselogin && cookieaid != aid){
		setcookie('acticleid',aid,'86400',' ','it168.com');
		var url = 'http://sso.it168.com/getprint.php?uid='+uselogin+'&aid='+aid+'&url='+preurl;
		request('acticle_sso',url);
	}
}
done();
/*end*/
