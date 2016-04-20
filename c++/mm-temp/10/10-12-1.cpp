#include <iostream>
#include <string>
#include <map>

using namespace std;

int main()
{
  string word;
  map< string, int > word_dic;

  while ( cin >> word ) {
    // inserts element with key equal to word and value1 1;
    // if word already in word_count, insert does nothing
    pair< map< string, int >::iterator, bool > ret = word_dic.insert(make_pair(word, 1));
    if (!ret.second)                // word already in word_count
      ++ret.first->second;          // increment counter
  }

  map< string, int >::iterator iter = word_dic.begin();
  while ( iter != word_dic.end() ) {
    cout << "string: " << iter->first << "; apprears: " << iter->second << " times " << endl;
    ++iter;
  }

  return 0;
}
