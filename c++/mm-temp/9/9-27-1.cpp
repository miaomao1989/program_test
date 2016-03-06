#include <iostream>
#include <list>
#include <string>

using namespace std;

int
main()
{
	list<string> slst;
	string str;

	// read in list object
	cout << "Enter some strings(Ctrl-D to end): " << endl;
	while ( cin >> str )
		slst.push_back(str);
	cin.clear();

	cout << "Enter a string that you want to search: " << endl;
	cin >> str;

	for ( list<string>::iterator iter = slst.begin();
			iter != slst.end(); ++iter ) {
		if ( *iter == str ) {
			iter = slst.erase(iter);
			--iter;
		}
	}
	return 0;
}
