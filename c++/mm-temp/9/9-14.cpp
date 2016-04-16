#include <iostream>
#include <string>
#include <vector>

using namespace std;

int
main()
{
	vector< string > svec;
	string str;

	cout << "Enter some strings (Ctrl+z to end):" << endl;

	while ( cin >> str )
		svec.push_back(str);

	for ( vector< string >::iterator iter = svec.begin();
			iter != svec.end(); ++iter )
		cout << *iter << endl;

	return 0;
}
