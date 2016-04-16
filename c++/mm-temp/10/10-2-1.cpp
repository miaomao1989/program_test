#include <iostream>
#include <utility>
#include <vector>
#include <string>

using namespace std;

int
main()
{
	string str;
	int ival;
	vector< pair<string, int> > pvec;

	cout << "Enter a string and an integer (Ctrl-D to end) : "
		<< endl;

	while ( cin >> str >> ival ) {
		pair<string, int> sipr(str, ival);
		pvec.push_back(sipr);
	}
	
	return 0;
}
