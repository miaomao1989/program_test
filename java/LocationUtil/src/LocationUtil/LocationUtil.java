package LocationUtil;



import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;


import net.sf.json.*;

public class LocationUtil {

	private static final String BAIDU_APP_KEY = "UAu5QZDVs5exMiS3szrWqXUr";
	
	public static void getJsonData(String query, String region, int page_size, int page_num, int pages_returned) throws UnsupportedEncodingException {
		
		DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		Calendar calendar = Calendar.getInstance();
		String time = df.format(calendar.getTime());
		
		
		query = URLEncoder.encode(query, "UTF-8");
		region = URLEncoder.encode(region, "UTF-8");
		
		String fileOutput = "D:/result/" + time+".txt";
		try {
            FileOutputStream out = new FileOutputStream(fileOutput);
            PrintStream outputFile = new PrintStream(out);
		
			for(int i = 0; i < pages_returned; i++)
			{
				
				try {
					
					URL resjson = new URL("http://api.map.baidu.com/place/v2/search?ak="
							+ BAIDU_APP_KEY
							+ "&output=json"
							+ "&query=" + query
							+ "&page_size=" + page_size
							+ "&page_num=" + (page_num + i)
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
		
					JSONObject obj = JSONObject.fromObject(str);
					if(obj.has("results")){
						JSONArray resultArray = obj.getJSONArray("results");				
						
						if(resultArray.size() == 0)
							return;
					
							for(int item = 0; item < resultArray.size(); item++) {
								JSONObject objResult = JSONObject.fromObject(resultArray.getString(item));
								System.out.println("name:" + objResult.getString("name"));
								if(objResult.has("location"))
								{
									System.out.println("location");
									JSONObject location = objResult.getJSONObject("location");
									System.out.println("lat:" + location.getString("lat"));
									System.out.println("lng:" + location.getString("lng"));
									
									outputFile.println(objResult.getString("name")+ "\t" + location.getString("lat") + "\t" +location.getString("lng"));
								}
							}

					}								
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
	}

	public static void main(String args[]) throws UnsupportedEncodingException {
		LocationUtil.getJsonData("科技公司", "南京", 10, 1, 100);
		System.out.println("Bingo");
	}
}