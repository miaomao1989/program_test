#include "const_member_function.h"

int main()
{
	Screen cs(19);
	Screen cc;
	cout << "the cursor value for cs object is: " << cs.value() << endl;
	cout << "the cursor value for cs object is: " << cs.ok() << endl;
	cout << "the cursor value for cc object is: " << cc.value() << endl;

	return 0;
}
