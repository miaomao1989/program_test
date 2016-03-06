#include <iostream>
#include <stack>

using namespace std;

int
main()
{
	stack<string> sstack;
	string str;

	cout << "Enter some words (Ctrl-D to end): " << endl;
	while (cin >> str)
		sstack.push(str);

	return 0;
}
