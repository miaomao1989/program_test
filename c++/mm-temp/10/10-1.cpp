#include <iostream>
#include <utility>
#include <vector>
#include <string>

using namespace std;

int
main()
{
	pair<string, int> sipair;
	string str;
	int in;
	vector< pair<string, int> > pvector;

	cout << "Enter a string and an integer (Ctrl-D to end): " << endl;

	while ( cin >> str >> in ) {
		sipair = make_pair(str, in);
		pvector.push_back(sipair);
	}

	vector< pair<string, int> >::iterator iter;
	for ( iter = pvector.begin();
			iter != pvector.end(); ++iter ) {
		cout << iter->first << " " << iter->second << endl;
	}

	return 0;
}
