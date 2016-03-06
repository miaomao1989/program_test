#include <iostream>
#include <list>
#include <vector>

using namespace std;

bool
isSame(const vector<int> & ivec, const list<int> & ilst)
{
	if (ivec.size() != ilst.size())
		return false;
	else {
		vector<int>::const_iterator vec_itar = ivec.begin();
		list<int>::const_iterator lst_itar = ilst.begin();
		while (vec_itar != ivec.end())
		{
			if (*vec_itar!=*lst_itar)
				return false;
			++vec_itar;
			++lst_itar;
		}
		if (vec_itar == ivec.end())
			return true;
	}
}


int
main()
{
	vector<int> ivec;
	list<int> ilst;
	int ival;

	cout << "Enter some integers for vector (Ctrl-D to end): " << endl;
	while (cin >> ival)
		ivec.push_back(ival);
	cin.clear();		// import ! to reset the state of iostream state

	cout << "Enter some integers for list (Ctrl-D to end): " << endl;
	while (cin >> ival)
		ilst.push_back(ival);

	if (isSame(ivec, ilst))
		cout << "They are same !" << endl;
	else
		cout << "They are different !" << endl;
}
