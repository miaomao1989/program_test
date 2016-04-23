#include <iostream>
#include <string>
#include <set>

using namespace std;

int main()
{
  set< string > excluded;

  // 建立单词的排除集
  excluded.insert("success");
  excluded.insert("class");

  //。。。//科一在此处继续插入其他以s结尾的单词

  string word;
  cout << "Enter a word (ctrl-D to end) " << endl;
  // 读入单词并根据排除集合生成该单词的非复数版本
  while (cin >> word) {
    if (!excluded.cout(word))                   // 该单词未在排除集合中出现
      word.resize(word.size() - 1);             // 去掉该单词末尾的‘s’

    cout << "non-plural version:" << word << endl;
    cout << "Enter a word (ctrl-D to end) " << endl;
  }

  return 0;
}
