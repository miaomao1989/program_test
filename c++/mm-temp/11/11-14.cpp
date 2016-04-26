#include <iostream>
#include <list>
#include <vector>
#include <algorithm>

using namespace std;

int main()
{
  int ia[] = {1, 2, 3, 4, 100, 5, 100};
  vector< int > ivec(ia, ia+7);
  list<int> ilst;

//  replace_copy(ivec.begin(), ivec.end(), inserter(ilst, ilst.begin()), 100, 0);

//  replace_copy(ivec.begin(), ivec.end(), back_inserter(ilst), 100, 0);

  replace_copy(ivec.begin(), ivec.end(), front_inserter(ilst), 100, 0);

  cout << "list: " << endl;
  for (list< int >::iterator iter = ilst.begin(); iter != ilst.end(); ++iter)
    cout << *iter << " ";
  cout << endl;

  return 0;
}
