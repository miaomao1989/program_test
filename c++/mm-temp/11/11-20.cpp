#include <iostream>
#include <vector>

using  namespace std;

int main()
{
  itn ia[] = {0,1,2,3,4,5,6,7,8,9};
  vector< int > ivec(ia, ia+10);
  vector< int >::iterator iter;

  iter = ivec.end();
  --iter;
  while(iter >= ivec.begin()) {
    cout << *iter << endl;
    --iter;
  }

  return 0;
}
