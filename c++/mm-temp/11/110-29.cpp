#include <iostream>
#include <list>
#include <fstream>
#include <algorithm>
#include <string>

using namespace std;

int main(int argc, char ** argv)
{
  if (argc < 2) {
    cerr << "No input file " << endl;
    return EXIT_FAILURE;
  }

  ifstream inFile;
  inFile.open(argv[1]);
  if(!inFile) {
    cerr << "Can not open input file !" << endl;
    return EXIT_FAILURE;
  }

  list< string > words;
  string word;

  while (inFile >> word)
    words.push_back(word);

  words.sort();

  words.unique();

  cout << "unique words: " << endl;
  for (list< string >::iterator iter = words.begin(); iter != words.end(); ++iter)
    cout << *iter << " ";
  cout << endl;

  return 0;
}
