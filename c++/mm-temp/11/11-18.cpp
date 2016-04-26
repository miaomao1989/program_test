#include <iostream>
#include <fstream>
#include <iterator>

using namespace std;

int main()
{
  ofstream oddFile("oddfile.dat");
  ofstream evenFile("evenfile.dat");

  // 打开文件失败
  if (!oddFile || !evenFile) {
    cerr << "Can not open output file!" << endl;
    return EXIT_FAILURE;
  }

  cout << "Enter some integers: (Ctrl-D to end): " << endl;

  istream_iterator< int > inIter(cin), eof;
  ofstream_iterator< int > outOddIter(oddFile, " ");
  ofstream_iterator< int > outEvenIter(evenFile, "\n");

  // 读入证书直至遇到eof， 将读入的数据写入文件流中
  // 并将相应迭代器+1
  while (inIter != eof) {
    if (*inIter % 2) {
      *outEvenIter = *inIter;
      ++outEvenIter;
    }
    else {
      *outOddIter = *inIter;
      ++outOddIter;
    }
    ++inIter;
  }

  oddFile.close();
  evenFile.close();
}
