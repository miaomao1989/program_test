#include <iostream>
#include <string>
#include <vector>
#include <map>

using namespace std;

int main()
{
  map< string, vector< pair<string, string> > > children;
  string surname, childName, birthday;

  do {
    cout << "Enter surname (ctrl-z to end): " << endl;
    cin >> surname;
    if (!cin)
      break;

    vector< pair<string, string> > chd;
    pair< map< string, vector< pair<string, string> > >::iterator, bool> ret =
      children.insert(make_pair(surname, chd));

    if (!ret.second) {
      cout << "repeated surname: " << surname << endl;
      continue;
    }

    cout << "Enter children's name and birthday (ctrl-z to end): " << endl;
    while ( cin >> childName >> birthday)
      ret.first->second.push_back(make_pair(childName, birthday));
    cin.clear();

  }while(cin);

  cin.clear();

  cout << "Enter a surname to search: " << endl;
  cin >> surname;

  map< string, vector< pair<string, string> > >::iterator iter =
    children.find(surname);

  if ( iter == children.end() )
    cout << "no this surname: " << surname << endl;
  else {
    vector< pair<string, string> >::iterator it = iter->second.begin();
    while (it != iter->second.end()){
      cout << "children name: " << it->first <<"; "<< "birthday: " << it->second << endl;
      ++it;
    }
  }

  return 0;
}
