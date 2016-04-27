#include <iostream>
#include <cstdlib>
#include <fstream>
#include <iterator>
#include <algorithm>

using namespace std;

int main()
{
  string fileName;

  cout << "Enter input file name : " << endl;
  cin >> fileName;

  ifstream inFile(fileName.c_str());
  if (!inFile) {
    cout << "Can not open file: " << fileName << endl;
    return EXIT_FAILURE;
  }

  // 使用copy算法将文件的内容写到标准输出中
  ostream_iterator< string > outIter(cout, " ");
  istream_iterator< string > inIter(inFile), eof;
  copy(inIter, eof, outIter);

  inFile.close();

  return 0;
}