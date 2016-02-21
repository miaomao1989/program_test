var SAMPLE_ADVANCED_POST = 'http://api.map.baidu.com/geocoder/v2/?ak=您的密钥&callback=renderOption&output=json';

var advancedOptions = '';
var address
function showOptionsURL(type) {
    advancedOptions = SAMPLE_ADVANCED_POST;   
	address = document.getElementById('location').value; 
    var cityname=document.getElementById('cityname').value;
	advancedOptions+="&address="+address;
	advancedOptions+="&city="+cityname;

    
    var safe = advancedOptions;
    document.getElementById('optionsSampleUrl').innerHTML = safe.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

function renderOption(response) {
    var html = '';

		if (response.status ) {
			var text = "无正确的返回结果:\n";
			document.getElementById('optionsNarrative').innerHTML = text;
			return;
		}
		var location = response.result.location;
		var uri = 'http://api.map.baidu.com/marker?location='+ location.lat+','+location.lng +'&title='+response.result.level+'&content='+address+'&output=html';
		var staticimageUrl = "http://api.map.baidu.com/staticimage?center=" + location.lng+','+location.lat + "&markers=" + location.lng+','+location.lat;
		html = '<p>坐标：纬度: ' + location.lat + "  经度: " + location.lng+'<br/>';
		html += '精度: '+response.result.precise+'<br/>' ;
		html += '可信度: '+response.result.confidence +'<br/>';
		html += '地址类型: '+response.result.level+'</p>' ;
		html += '<p><img src="' + staticimageUrl + '"/></p>' ;
		html += '<p>分享该点: <a href="' + uri + '" target="_blank">' + uri + '</a></p>'; //将该链接设置成可单击
		document.getElementById('optionsNarrative').innerHTML = html;
		return;
    
    document.getElementById('optionsNarrative').innerHTML = html;
}

function doOptions() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    showOptionsURL('buttonClick');
    var newURL = advancedOptions.replace('您的密钥','E4805d16520de693a3fe707cdc962045');
    script.src = newURL;
    document.body.appendChild(script);
};
