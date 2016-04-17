#include <iostream>
#include <stack>

using namespace std;

int main()
{
  const stack<int>::size_type stk_size = 10;
  stack<int> intStack;    //empty stack
  // fill up the stack
  int ix = 0;
  while (intStack.size() != stk_size)
  intStack.push(ix++);

  int err_cnt = 0;
  // look at each value and pop it off the stack
  while (intStack.empty() == false) {
    int value = intStack.top();
    // read the top element of the stack
    if (value != --ix){
      cerr << "oops! expected " << ix
      << " received " << value << endl;
      ++err_cnt;
    }
    intStack.pop();   //pop the element, and repeat
  }
  cout << "Our program ran with "
  << err_cnt << " errors!" << endl;
}
