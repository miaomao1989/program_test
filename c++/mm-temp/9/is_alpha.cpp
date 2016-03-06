#include <iostream>
#include <string>

using namespace std;

int
main()
{
	string s1("ab2c3d7R4E6");
	string num("0123456789");

	string::size_type pos = 0;
	while ( (pos = s1.find_first_of(num, pos)) != string::npos ) {
		cout << " found number at index : " << pos
			 << " element is " << s1[pos] << endl;
		++pos;
	}

	pos = 0;
	while ( (pos = s1.find_first_not_of(num, pos)) != string::npos ) {
		cout << " found alpha at index : " << pos 
			 << " element is " << s1[pos] << endl;
		++pos;
	}

	return 0;
}
