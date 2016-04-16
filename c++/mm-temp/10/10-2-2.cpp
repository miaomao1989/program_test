#include <iostream>
#include <string>
#include <utility>
#include <vector>

using namespace std;

int
main()
{
	pair<string,int> sipr;
	string str;
	int ival;
	vector< pair<string, int> > pvec;

	cout << "Enter a string and an integer (Ctrl-D) to end: "
		<< endl;

	while (cin >> str >> ival) {
		sipr.first = str;
		sipr.second = ival;
		pvec.push_back(sipr);
	}
	return 0;
}
