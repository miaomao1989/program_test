#include <iostream>
#include <string>

using namespace std;

int
main()
{
	char * cp = "Hiya";
	string s6(cp+2, 2);
	
	cout << s6 << endl;
}
