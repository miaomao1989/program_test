#include <iostream>
#include <list>
#include <vector>
#include <algorithm>

using namespace std;

int main()
{
  int ia[] = {1, 2, 3, 4, 100, 5, 100};
  list< int > ilst(ia, ia+7);
  vector< int > ivec;

  vector< int >::iterator end_unique = unique_copy(ilst.begin(), ilst.end(), back_inserter(ivec));

  // 输出vector容器
  cout << "vector: " << endl;
  for (vector< int >::iterator iter = ivec.begin(); iter != end_unique; ++iter)
    cout << *iter << " ";
  cout << endl;

  return 0;
}
