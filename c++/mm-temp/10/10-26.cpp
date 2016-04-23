#include <iostream>
#include <string>
#include <map>

using namespace std;

int main(){
  multimap< string, string > authors;
  string author, work, searchItem;

  //建立作者以及他们作品的multimap容器
  do {
    cout << "Enter author name (Ctrl-D to end): " << endl;
    cin >> author;

    if (!cin)
      break;
    cout << "Enter author's works (Ctrl-D to end): " << endl;
    while (cin >> work)
      authors.insert(make_pair(author, work));
    cin.clear();
  } while (cin);
  cin.clear();

  //读入要找的作者
  cout << "Who is the author that you want to erase: " << endl;
  cin >> searchItem;

  //找到该作者对应的第一个元素
  multimap< string, string >::iterator iter = authors.find(searchItem);
  if (iter != authors.end())
    authors.erase(searchItem);
  else
    cout << "Can not find this author!" << endl;

  //输出multimap对象
  cout << "author \t\t work: " << endl;
  for (iter = authors.begin(); iter != authors.end(); ++iter)
    cout << iter->first << "\t\t" << iter->second << endl;

  return 0;
}
