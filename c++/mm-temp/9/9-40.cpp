#include <iostream>
#include <string>
using namespace std;

int
main()
{
	string q1("When lilacs last in the dooryard bloom'd");
	string q2("The child is father of the man");
	string setence;

	setence.assign(q2.begin(), q2.begin() + 13);
	setence.append(q1.substr(q1.find("in"), 15));

	cout << setence << endl;

	return 0;
}
