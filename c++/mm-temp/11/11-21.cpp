#include <iostream>
#include <algorithm>
#include <list>

using namespace std;

int main()
{
  int ia[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
  list< int > ilst(ia, ia+10);
  list< int >::reverse_iterator riter;

  riter = find(ilst.begin(), ilst.end(), 0);

  // 输出结果
  if (riter != ilst.rend())
    cout << "element after the last 0: "
         << *(--riter) << endl;
  else
    cout << "no element 0" << endl;
  return 0;
}
