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

  // 确定该作者对应的multimap元素范围
  typedef multimap< string, string >::iterator itType;
  pair< itType, itType > pos = authors.equal_range(searchItem);

  if (pos.first != pos.second)
  //删除该作者的所有产品
    authors.erase(pos.first, pos.second);
  else
    cout << "Can not find this author!" << endl;

  // 输出multimap对象
  cout << "author\t\twork: " << endl;
  for( itType iter = authors.begin();
       iter != authors.end(); ++iter)
       cout << iter->first << "\t\t" << iter->second << endl;

  return 0;
}
