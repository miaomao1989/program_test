#include <iostream>
#include <vector>
#include <list>

using namespace std;

int
main()
{
	int ia[] = {0, 1, 1, 2, 3, 5, 8, 13, 21, 55, 89};
	vector<int> ivec(ia, ia+11);
	list<int> ilst(ia, ia+11);

	for (list<int>::iterator lit = ilst.begin();
			lit != ilst.end(); ++lit) {
		if ( *lit % 2 != 0 ) {
			lit = ilst.erase(lit);
			--lit;
		}
	}

	for (vector<int>::iterator vit = ivec.begin();
			vit != ivec.end(); ++vit) {
		if ( *vit % 2 == 0 ) {
			vit = ivec.erase(vit);
			--vit;
		}
	}
	return 0;
}
