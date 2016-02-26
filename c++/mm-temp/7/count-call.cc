#include <iostream>

using namespace std;

size_t count_calls()
{
	static size_t ctr = 0;	// value will persist accross calls
	return ++ctr;
}

int main()
{
	for(size_t i = 0; i != 10; ++i)
		cout << count_calls() << endl;
//	cout << ctr << endl; //ctr is not defined here 
	return 0;
}
