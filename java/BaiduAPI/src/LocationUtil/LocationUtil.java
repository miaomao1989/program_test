package LocationUtil;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;




public class LocationUtil {

	private static final String BAIDU_APP_KEY = "UAu5QZDVs5exMiS3szrWqXUr";
	
	public static Map<String, String> getJsonData(String query, String region, int page_size, int page_num) {
		try {
			// ����ַת����utf-8��16����
			query = URLEncoder.encode(query, "UTF-8");
			region = URLEncoder.encode(region, "UTF-8");
			
			// ����д���Ҫ���ô���û�����ע��
			// System.setProperty("http.proxyHost","192.168.172.23");
			// System.setProperty("http.proxyPort","3209");

			URL resjson = new URL("http://api.map.baidu.com/place/v2/search?ak="
					+ BAIDU_APP_KEY
					+ "&output=json"
					+ "&query=" + query
					+ "&page_size=" + page_size
					+ "&page_num=" + page_num
					+ "&scope=1"
					+ "&region=" + region);
			System.out.println("url output: " + resjson);
			BufferedReader in = new BufferedReader(new InputStreamReader(
					resjson.openStream()));
			String res;
			StringBuilder sb = new StringBuilder("");
			while ((res = in.readLine()) != null) {
				sb.append(res.trim());
			}
			in.close();
			String str = sb.toString();
			System.out.println("return json:" + str);
			
			
		/*	if(str!=null&&!str.equals("")){
				Map<String, String> map = null;
				int lngStart = str.indexOf("lng\":");
				int lngEnd = str.indexOf(",\"lat");
				int latEnd = str.indexOf("},\"precise");
				if (lngStart > 0 && lngEnd > 0 && latEnd > 0) {
					String lng = str.substring(lngStart + 5, lngEnd);
					String lat = str.substring(lngEnd + 7, latEnd);
					map = new HashMap<String, String>();
					map.put("lng", lng);
					map.put("lat", lat);
					return map;
				}
			} */
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static void main(String args[]) {
		
		Map<String, String> map = LocationUtil.getJsonData("����", "����", 20, 1);
		if (null != map) {
			System.out.println(map.get("lng"));
			System.out.println(map.get("lat"));
		}
	}
}