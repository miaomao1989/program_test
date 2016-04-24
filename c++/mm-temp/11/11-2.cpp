#include <iostream>
#include <list>
#include <string>
#include <algorithm>

using namespace std;

int main()
{
  string sval, searchValue;
  list< string > slst;

  //读入string型数据并存储到list对象中，直至遇到文件结束符
  cout << "Enter some strings (Ctrl-D to end): " << endl;
  while (cin >> sval)
    slst.push_back(sval);

  cin.clear();

  // 读入欲统计其出现次数的stirng值
  cout << "Enter a string you want to search: " << endl;
  cin >> searchValue;


  //使用count函数统计该值出现的次数并输出结果
  cout << count(slst.begin(), slst.end(), searchValue)
       << " elements in the list are \""
       << searchValue << "\"" << endl;

  return 0;
}
