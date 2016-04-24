#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main()
{
  int ival, searchValue;
  vector< int > ivec;

  // 读入int型数据病存储到vector对象中，知道遇到文件结束符
  cout << "Enter some integers(Ctrl-D to end) : " << endl;
  while (cin >> ival)
    ivec.push_back(ival);

  cin.clear();

  cout << "Enter the integer you want to search: " << endl;
  cin >> searchValue;

  // 使用count函数统计该值出现的次数并输出结果
  cout << count(ivec.begin(), ivec.end(), searchValue)
       << " elements in the vector have value "
       << searchValue << endl;
  return 0;
}
