#include <iostream>
#include <fstream>
#include <map>
#include <string>
#include <vector>

using namespace std;

void restricted_wc(ifstream &removeFile, map< string, int > &wordCount){
  vector< string > excluded;
  string removeWord;
  while ( removeFile >> removeWord )
    excluded.push_back(removeWord);

  // 读入文本，并对不在排除集合中的单词进行出现次数的统计
  cout << "Enter text (Ctrl-D) to end: " << endl;
  string word;
  while ( cin >> word ){
    bool find = false;

    // 确定该单词是否在排除集合中
    vector< string >::iterator iter = excluded.begin();
    while ( iter != excluded.end() ) {
      if (*iter == word){
        find = true;
        break;
      }
      ++iter;
    }

    //如果单词不在排除集中，则进行计数
    if (!find)
      ++wordCount[word];
  }
}


int main()
{
  map< string, int > wordCount;
  string fileName;

  //读入包含单词排除集的文件的名字并打开相应的文件
  cout << "Enter filename: " << endl;
  cin >> fileName;
  ifstream exFile(fileName.c_str());
  if(!exFile) {
    cout << "error: can not open file: " << fileName << endl;
    return -1;
  }

  // 调用restricted_wc函数，
  // 对输入文本中不在排除集合中的单词进行出现次数的统计
  restricted_wc(exFile, wordCount);

  //输出结果
  cout << "word\t\t" << "times" << endl;
  map< string, int >::iterator iter = wordCount.begin();
  while (iter != wordCount.end()){
    cout << iter->first << "\t\t" << iter->second << endl;
    ++iter;
  }
  return 0;
}
