var SAMPLE_POST_REVERSE = 'http://api.map.baidu.com/geocoder/v2/?ak=您的密钥&callback=renderReverse';
var safe = '';
var pois;
function showReverseURL() {
	var latitude = document.getElementById('lat').value;
	var longitude = document.getElementById('lng').value;
	pois=document.getElementById('showPois').value;
	safe = SAMPLE_POST_REVERSE;
	safe +="&location="+latitude+","+longitude;
	safe+="&output=json";
	safe+='&pois='+pois;
    document.getElementById('reverseSampleUrl').innerHTML = safe.replace(/</g, '&lt;').replace(/>/g, '&gt;');;
};

function doReverse() {	
	document.getElementById('reverseNarrative').innerHTML = '';
	var script = document.createElement('script');
    script.type = 'text/javascript';
    showReverseURL();
    var newURL = safe.replace('您的密钥', 'E4805d16520de693a3fe707cdc962045');
    script.src = newURL;
    document.body.appendChild(script);
};

function renderReverse(response) {
    var html = '';
		if (response.status ) {
			var text = "无正确的返回结果:\n";
			document.getElementById('reverseNarrative').innerHTML = text;
			return;
		}
		var location = response.result.location;
			html = "<p>坐标:";
			html += '(' + location.lng + "," + location.lat;
			html += ")对应的地址是: "+ response.result.formatted_address+'</p>';
			if (pois==1)
			{
				html+="<p>该点周边100米内有"+response.result.pois.length+"个poi";
			}
			document.getElementById('reverseNarrative').innerHTML = html;
			return;
		

//	var location = response.results[0].locations[0];
//	html += location.street + ", " + location.adminArea5 + ", " + location.adminArea4 + ", " + location.adminArea3 + ", " + location.adminArea1;
    html +=address;
	html += "</p>";
    
    document.getElementById('reverseNarrative').innerHTML = html;
}
