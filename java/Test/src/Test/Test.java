package Test;

import java.io.*;


public class Test {

	public static void main(String[] args) throws Exception
	{
	   FileOutputStream fos=new FileOutputStream("d:\\abc.txt");
	   OutputStreamWriter osw=new OutputStreamWriter(fos);
	   BufferedWriter bw=new BufferedWriter(osw);
	   bw.write("��ֻ��һ����ϰ");
	   bw.newLine();
	   bw.write("ֻ������һ��:)");
	   bw.newLine();
	   bw.close();
	   FileInputStream fis=new FileInputStream("d:\\abc.txt");
	   InputStreamReader isr=new InputStreamReader(fis);
	   BufferedReader br=new BufferedReader(isr);
	   System.out.println(br.readLine());
	   System.out.println(br.readLine());
	   br.close();
	}
}
