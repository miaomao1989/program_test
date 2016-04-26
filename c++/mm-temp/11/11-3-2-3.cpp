#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

using namespace std;

int main()
{
  istream_iterator< int > cin_it(cin), end_of_stream;

  // initialize vec from the standard input:
  vector< int > vec(cin_it, end_of_stream);
  sort(vec.begin(), vec.end());

  // writes ints to cout using " " as the delimiter
  ostream_iterator< int > output(cout, " ");
  // write only the unique elements in vec to the standard output
  unique_copy(vec.begin(), vec.end(), output);

  return 0;
}
