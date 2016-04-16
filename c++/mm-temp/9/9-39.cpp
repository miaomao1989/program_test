#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main()
{
  string line1 = "We were her pride of 10 she named us:";
  string line2 = "Benjamin, Phoenix, the Prodigal";
  string line3 = "and perspicacious pacific Suzanne";
  string sentence = line1 + ' ' + line2 + ' ' + line3;
  string separators(" \t:,.\v\r\n\f");

  string word;

  //sentence中最长，最短单词以及下一单词的长度，单词的数目
  string::size_type maxLen, minLen, wordLen, count = 0;
  // 存放最长及最短单词的vector容器
  vector<string> longestWords, shortestWords;
  // 单词的起始位置和结束位置
  string::size_type startPos = 0, endPos = 0;

  // 每次循环处理sentence中的一个单词
  while ((startPos = sentence.find_first_not_of(separators, endPos)) != string::npos)
  {
    // 找到下一个单词的起始位置
    ++count;

    // 找到下一个单词的的结束位置
    endPos = sentence.find_first_of(separators, startPos);

    if (endPos == string::npos) {
      // 找不到下一个出现分隔符的位置，即该单词是最后一个单词
      wordLen = sentence.size() - startPos;
    }
    else {
      //找到了下一个出现分割符的位置
      wordLen = endPos - startPos;
    }

    word.assign(sentence.begin() + startPos, sentence.begin() + startPos + wordLen); //获取该单词

    //设置下次查找的起始位置
    startPos = sentence.find_first_not_of(separators, endPos);

    if (count == 1) {
      //找到的是第一个单词
      maxLen = minLen = wordLen;
      longestWords.push_back(word);
      shortestWords.push_back(word);
    }
    else {
      if (wordLen > maxLen) { //当前单词比目前最长的单词还要长
        maxLen = wordLen;
        longestWords.clear(); //清空存放最长单词的容器
        longestWords.push_back(word);
      }
      else if (wordLen == maxLen)
      longestWords.push_back(word);

      if (wordLen < minLen) { // 当前单词比目前最长的单词更短
        minLen = wordLen;
        shortestWords.clear();  //清空存放最短单词的容器
        shortestWords.push_back(word);
      }
      else if(wordLen == minLen)
      shortestWords.push_back(word);
    }
  }

  // 输出单词数目
  cout << "word amount: " << count << endl;
  vector<string>::iterator iter;

  // 输出最长的单词
  cout << "longest word(s):" << endl;
  iter = longestWords.begin();
  while(iter != longestWords.end())
    cout << *iter++ << endl;

  //输出最短单词
  cout << "shortest word(s):" << endl;
  iter = shortestWords.begin();
  while (iter != shortestWords.end())
    cout << *iter++ << endl;

  return 0;
}
