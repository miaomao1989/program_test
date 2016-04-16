#include <iostream>
#include <vector>

using namespace std;

vector<int>::iterator findInt(vector<int>::iterator beg,
		vector<int>::iterator end, int ival)
{
	while (beg != end)
		if (*beg == ival)
			break;
		else
			++beg;
	return beg;
}

int main()
{
	int ia[] = {0,1,2,3,4,5,6};
	vector< int > ivec(ia, ia+7);

	cout << "Enter a integer: " << endl;
	int ival;
	cin >> ival;

	vector< int >::iterator it;
	it = findInt(ivec.begin(), ivec.end(), ival);
	if (it != ivec.end())
		cout << ival << " is a element of the vector. " << endl;
	else 
		cout << ival << " is not an element of the vector. " << endl;

	return 0;
}
