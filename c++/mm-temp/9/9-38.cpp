#include <iostream>
#include <string>

using namespace std;

int main()
{
  string src = "ab2c3d7R4E6";
  string num = "0123456789";
  string::size_type pos = 0;

  while ( (pos = src.find_first_of(num, pos)) != string::nops) {
    cout << src[pos] << endl;
    ++pos;
  }
}
