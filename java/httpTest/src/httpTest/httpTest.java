package httpTest;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.Net;
using System.Web;

namespace httpTest
{
    class Program
    {
        static void Main(String[] args)
        {
            //������.net2.0�µ�system.web.dll�У�������Ӹ����ã�����������£�
            //http://www.cftea.com/c/2011/06/QYUVGI4I8GTWSQBP.asp

            String strChinese = HttpUtility.UrlEncode("����");//�����utf-8 16������ʽ�ĺ���

            //Console.WriteLine(strChinese);

            string strURL = "http://api.map.baidu.com/place/search?&query=" + strChinese + "&bounds=39.915,116.404,39.975,116.414&output=xml&key=8cb976834235d8cbcde2dce4835ae191";

            WebClient _client = new WebClient();

            System.IO.Stream objStream = _client.OpenRead(strURL);
            System.IO.StreamReader _read = new System.IO.StreamReader(objStream, System.Text.Encoding.UTF8);

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(_read);

            XmlNode statusNode = xmlDoc.SelectSingleNode("/PlaceSearchResponse/status");
            int count = 0;
            if (statusNode.InnerText == "OK")
            {
                XmlNode results = xmlDoc.SelectSingleNode("/PlaceSearchResponse/results");

                foreach (XmlNode result in results)
                {
                    Console.WriteLine(result.InnerText);
                    count++;
                }
            }

            Console.WriteLine("\n\r");
            Console.WriteLine("����:" + count + "����¼!");

            Console.Read();

        }
    }
}

