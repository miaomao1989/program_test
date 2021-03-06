package CrawlerJsonAnalysis;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;


import net.sf.json.*;

public class CrawlerJsonAnalysis {
	private static final String UIDS_FILE_PATH = "F:/programming_practise/maxiaoxucrawl/uid_list.txt";
	private static final String JSON_USER_INFO_PATH = "F:/programming_practise/maxiaoxucrawl/";
	private static final String JSON_MESSAGE_DATA_PATH = "F:/programming_practise/maxiaoxucrawl/3000jasonarraydemo.txt";
	private static int forwardCommentLikeArrayItem = 6;
	private static final String COMMENTARRAY_FILE_OUTPUT = "F:/programming_practise/maxiaoxucrawl/commentArray_output.txt";
	private static final String FORWARDCOMMENTLIKEARRAY_FILE_OUTPUT = "F:/programming_practise/maxiaoxucrawl/forwardCommentLikeArray_output.txt";
	
	public static List<String> uidList = new ArrayList<String>();
	public static int commentArray[][];
	public static int forwardCommentLikeArray[][];
	public static int followArray[][];
	
    
	//从保存所有搜索的UIDs文件中读取所有的uids存放在ArrayList uidList中，同时初始化结果数组commentArray, forwardCommentLikeArray, followArray
	public static void getAllUids(String uidsFilePath)
	{
		File file = new File(uidsFilePath);  
	    if(!file.exists() || !file.isFile()){
	    	System.out.println("Uids_file does not exist!");
	        return;  
	    }
	    try
	    {
	    	 FileInputStream fileInputStream = new FileInputStream(file);  
	         InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream, "GBK");  
	         BufferedReader reader = new BufferedReader(inputStreamReader);  
	         String lineuidList = ""; 
	         while((lineuidList = reader.readLine()) != null){
	        	 uidList.add(lineuidList);
	        	 System.out.println(lineuidList);
	         }
	         fileInputStream.close();
	         inputStreamReader.close();
	         reader.close();
	    	
	    } catch (Exception e) { 
	    	e.printStackTrace();
	    }
	    commentArray = new int[uidList.size()][uidList.size()];
	    for(int i = 0; i < uidList.size(); i++){
	    	for(int j = 0; j < uidList.size(); j++) {
	    		commentArray[i][j] = 0;
	    	}
	    }
	    System.out.println("commentArray size is: " + uidList.size());
	    
	    followArray = new int[uidList.size()][uidList.size()];
	    for(int i = 0; i < uidList.size(); i++) {
	    	for(int j = 0; j < uidList.size(); j++) {
	    		followArray[i][j] = 0;
	    	}
	    }
	    System.out.println("followArray size is" + uidList.size());
	    
	    
	    forwardCommentLikeArray = new int[uidList.size()][forwardCommentLikeArrayItem];
	    for(int i = 0; i < uidList.size(); i++) {
	    	for(int j = 0; j < forwardCommentLikeArrayItem; j++){
	    		forwardCommentLikeArray[i][j] = 0;
	    	}
	    }
	    System.out.println("commentArray size is: " + uidList.size() + " * " + forwardCommentLikeArrayItem);
	    
	}
	
	//读取本地文件中JSON字符串
    private static String getJson(String fileName) {

        StringBuilder stringBuilder = new StringBuilder();
		File file = new File(fileName);  
	    if(!file.exists() || !file.isFile()){
	    	System.out.println("Uids_file does not exist!");
	        return null;  
	    }
	    
        try {
	    	FileInputStream fileInputStream = new FileInputStream(file); 
            BufferedReader bf = new BufferedReader(new InputStreamReader(fileInputStream));
            String line;
            while ((line = bf.readLine()) != null) {
                stringBuilder.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return stringBuilder.toString();
    }
	

    
    //分析forward的数量，统计结果存储在forwardCommentLikeArray中
    private static void parseForwards(String hostUid, JSONArray forwardsArray){
    	if(forwardsArray.size() == 0) {
    		System.out.println("Error Data: Forward size is zero !");
    		return;
    	}
    	for(int forwardsItem = 0; forwardsItem < forwardsArray.size(); forwardsItem++) {
    		JSONObject forwardsObjItem =  JSONObject.fromObject(forwardsArray.getString(forwardsItem));
    		if(uidList.contains(forwardsObjItem.getString("uid"))) {
    			System.out.println("Forward Success, the index is :" + uidList.indexOf(forwardsObjItem.getString("uid")));
    			//转发数+1
    			forwardCommentLikeArray[uidList.indexOf(forwardsObjItem.getString("uid"))][0]++;
    			//被转发数+1
    			forwardCommentLikeArray[uidList.indexOf(hostUid)][1]++;   			
    		}
    	}    	
    }
    
    private static void parseComments(String hostUid, JSONArray commentsArray){
    	if(commentsArray.size() == 0){
    		System.out.println("Error Data: Comment size is zero !");
    		return;
    	}
    	for(int commentsItem = 0; commentsItem < commentsArray.size(); commentsItem++) {
    		JSONObject commentsObjItem = JSONObject.fromObject(commentsArray.getString(commentsItem));
    		if(uidList.contains(commentsObjItem.getString("uid"))) {
    			System.out.println("Comment Success, the index is:" + uidList.indexOf(commentsObjItem.getString("uid")));
    			//评论数+1
    			forwardCommentLikeArray[uidList.indexOf(commentsObjItem.getString("uid"))][2]++;
    			//被评论数+1
    			forwardCommentLikeArray[uidList.indexOf(hostUid)][3]++;
    			//评论矩阵设置
    			commentArray[uidList.indexOf(commentsObjItem.getString("uid"))][uidList.indexOf(hostUid)] = 1;
    			
    		}
    	}
    }
    
    private static void parseLikes(String hostUid, JSONArray likesArray) {
    	if(likesArray.size() == 0)
    	{
    		System.out.println("Error Data: Likes size is zero !");
    		return;
    	}
    	for(int likesItem = 0; likesItem < likesArray.size(); likesItem++) {
    		JSONObject likesObjItem =  JSONObject.fromObject(likesArray.getString(likesItem));
    		if(uidList.contains(likesObjItem.getString("uid"))) {
    			System.out.println("Likes Success, the index is :" + uidList.indexOf(likesObjItem.getString("uid")));
    			//点赞数+1
    			forwardCommentLikeArray[uidList.indexOf(likesObjItem.getString("uid"))][4]++;
    			//被点赞数+1
    			forwardCommentLikeArray[uidList.indexOf(hostUid)][5]++;    			
    		}
    	}
    }
    
	public static void parseMessageJsonData(String jsonDataPath) {
		JSONArray jsonArray = JSONArray.fromObject(getJson(UIDS_FILE_PATH));
		for(int item = 0; item < jsonArray.size(); item++) {
		//for(int item = 0; item < 10; item++) {
			JSONObject jsonObjItem =  JSONObject.fromObject(jsonArray.getString(item));
			//System.out.println("mid:" + jsonObjItem.getInt("mid"));
			
			//处理转发项forward
			if(jsonObjItem.getInt("n_forwards") != 0)
			{
				JSONArray forwardsArray = jsonObjItem.getJSONArray("forwards");
				parseForwards(jsonObjItem.getString("uid"), forwardsArray);
			}
			
			//处理评论项comments
			if(jsonObjItem.getInt("n_comments") != 0)
			{
				JSONArray commentsArray = jsonObjItem.getJSONArray("comments");
				parseComments(jsonObjItem.getString("uid"), commentsArray);
			}
			
			//处理点赞项like
			if(jsonObjItem.getInt("n_likes") != 0)
			{
				JSONArray likesArray = jsonObjItem.getJSONArray("likes");
				parseLikes(jsonObjItem.getString("uid"), likesArray);
			}
		}
		
	}
	
	
	//将需要的结果输出到文件中
	public static void outPutResult(String commentArrayOutputPath, String forwardCommentLikeArrayOutputPath) throws IOException
	{
		//将comment矩阵写入commentArray_output.txt
		File commentArrayFile = new File(commentArrayOutputPath);
		FileWriter commentArrayFileWriter = new FileWriter(commentArrayFile);  
		for(int i = 0; i < commentArray.length; i++) {
			for(int j = 0; j < commentArray[0].length - 1; j++) {
				commentArrayFileWriter.write(Integer.toString(commentArray[i][j]));
				commentArrayFileWriter.write("\t");
				System.out.print(commentArray[i][j] + "\t");
			}
			commentArrayFileWriter.write(Integer.toString(commentArray[i][commentArray[0].length -1]));
			commentArrayFileWriter.write("\n");
			System.out.print(commentArray[i][commentArray[0].length -1] + "\n");
		}
		commentArrayFileWriter.close();
		
		
		//将forwardCommentLikeArray矩阵写入forwardCommentLikeArray_output.txt
		File forwardCommentLikeArrayFile = new File(forwardCommentLikeArrayOutputPath);
		FileWriter forwardCommentLikeArrayWriter = new FileWriter(forwardCommentLikeArrayFile);
		for(int i = 0; i < forwardCommentLikeArray.length; i++) {
			for(int j = 0; j < forwardCommentLikeArrayItem - 1; j++) {
				forwardCommentLikeArrayWriter.write(Integer.toString(forwardCommentLikeArray[i][j]));
				forwardCommentLikeArrayWriter.write("\t");
			}
			forwardCommentLikeArrayWriter.write(Integer.toString(forwardCommentLikeArray[i][forwardCommentLikeArrayItem - 1]));
			forwardCommentLikeArrayWriter.write("\n");
		}
		forwardCommentLikeArrayWriter.close();
		
	}
	
	
	 public static void main(String args[]) throws IOException { 
		CrawlerJsonAnalysis.getAllUids(UIDS_FILE_PATH);
		CrawlerJsonAnalysis.parseMessageJsonData(JSON_MESSAGE_DATA_PATH);
		CrawlerJsonAnalysis.outPutResult(COMMENTARRAY_FILE_OUTPUT, FORWARDCOMMENTLIKEARRAY_FILE_OUTPUT);
		System.out.println("Bingo!");
	}

}
