#include <iostream>
#include <string>
#include <cctype>

using namespace std;

int
main()
{
	string str = "This IS An ExamplE";
	for ( string::iterator iter = str.begin();
			iter != str.end(); ++iter ) {
		if ( isupper(*iter) ) {
			str.erase(iter);
			--iter;
		}
	}

	cout << str << endl;

	return 0;
}
