#include <iostream>
#include <deque>
#include <string>

using namespace std;

int 
main()
{
	deque<string> sdq;
	string str;

	//read in deque object
	cout << "Enter some strings (Ctrl-D to end): " << endl;
	while ( cin >> str )
		sdq.push_back(str);
	cin.clear();

	cout << "Enter a string that you want to search: " << endl;
	cin >> str;

	for ( deque<string>::iterator iter = sdq.begin();
			iter != sdq.end(); ++iter ) {
		if ( *iter == str ) {
			iter = sdq.erase(iter);
			--iter;
		}
	}
	
	return 0;
}
