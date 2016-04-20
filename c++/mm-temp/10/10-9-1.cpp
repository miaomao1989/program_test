#include <iostream>
#include <string>
#include <map>

using namespace std;

int main()
{
  string word;
  map< string, int > word_dic;

  // count number of times each word occurs in the input
  while ( cin >> word )
    ++word_dic[word];

  map< string, int >::iterator iter = word_dic.begin();
  while ( iter != word_dic.end() ) {
    cout << "The key: " << iter->first << "; " << "value: " << iter->second << endl;
    ++iter;
  }

  return 0;
}
