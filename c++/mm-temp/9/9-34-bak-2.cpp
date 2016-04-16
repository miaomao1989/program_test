#include <iostream>
#include <string>
#include <cctype>

using namespace std;

int
main()
{
  string str = "This is an example";
  for (string::iterator iter = str.begin();
        iter != str.end(); ++iter){
          if(isupper(*iter)){
            str.earse(iter);
            --iter;
          }
  }
  return 0;

}
