#include <iostream>
#include <vector>
#include <set>
#include <string>
#include <cstdlib>
#include <ctime>

using namespace std;

int main()
{
  vector< string > bookList2Read;
  set< string > bookListDone;
  string bookName;

  cout << "Enter the names of book that you prepare to read in the future six month (Ctrl-D to end): " << endl;
  while ( cin >> bookName )
    bookList2Read.push_back(bookName);
  cin.clear();

  bool timeOver = false;
  string answer;

  srand((unsigned)time(NULL));

  while (!timeOver && !bookList2Read.empty()){
    cout << "Would you like to read a book (yes/no) " << endl;
    cin >> answer;
    cin.clear();

    if ( answer[0] == 'y' || answer[0] == 'Y' ) {
      // 在vector中随机选择一本书
      int i = rand() % bookList2Read.size();       // 产生一个伪随机数
      bookName = bookList2Read[i];

      cout << "You can read this book: " << bookName << endl;

      bookListDone.insert(bookName);                      // 将该书放入已读的集合
      bookList2Read.erase(bookList2Read.begin() + i);     // 从`vector`对象中删除该书

      cout << "Did you read it ? (yes/no): " << endl;
      cin >> answer;
      cin.clear();
      if (answer[0] == 'n' || answer[0] == 'N') {
        // 没有读这本书
        bookListDone.erase(bookName);     // 从已读集合中删除该书
        bookList2Read.push_back(bookName);   // 将该书重新放入vector中
      }
    }

    cout << "Timer over (yes/no) " << endl;
    cin >> answer;
    cin.clear();

    if (answer[0] == 'y' || answer[0] == 'Y') {
      timeOver = true;
    }
  }

  if (timeOver) {
    cout << "book read:" << endl;
    for ( set< string >::iterator sit = bookListDone.begin();
          sit != bookListDone.end(); ++sit )
          cout << *sit << endl;

    cout << "books not read: " << endl;
    for ( vector<string>::iterator vit = bookList2Read.begin();
          vit != bookList2Read.end(); ++vit )
          cout << *vit << endl;
  }
  else
    cout <<  "Congratulations ! You have read all these books." << endl;

  return 0;
}
