#include <iostream>
#include <map>
#include <string>
#include <vector>

using namespace std;

int main()
{
  map< string, vector<string> > children;
  string surname, childName;

  do {
    cout << "Enter surname (ctrl-z to end): " << endl;
    cin >> surname;
    if (!cin)
      break;

    vector< string > chd;
    pair< map< string, vector< string > >::iterator, bool> ret =
      children.insert(make_pair(surname, chd));

    if (!ret.second) {
      cout << "repeated surname: " << surname << endl;
      continue;
    }

    cout << "Enter children's name (ctrl-z to end): " << endl;
    while ( cin >> childName)
      ret.first->second.push_back(childName);
    cin.clear();
  }while(cin);

  cin.clear();

  cout << "Enter a surname to search: " << endl;
  cin >> surname;

  map< string, vector< string > >::iterator iter =
    children.find(surname);

  if ( iter == children.end() )
    cout << "no this surname: " << surname << endl;
  else {
    cout << "children: " << endl;
    vector< string >::iterator it = iter->second.begin();
    while (it != iter->second.end())
      cout << *it++ << endl;
  }

  return 0;
}
