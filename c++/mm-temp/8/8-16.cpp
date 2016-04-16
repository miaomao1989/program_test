#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

using namespace std;

int
fileToVector(string fileName, vector<string> & svec)
{
	ifstream inFile(fileName.c_str());
	if (!inFile)
		return 1;

	//将文件内容读入到string类型的vector容器中
	//每个单词存储为容器对象的一个元素
	
	string s;
	while (inFile >> s)
		svec.push_back(s);
	inFile.close();				// 关闭文件
	if (inFile.eof())
		return 4;
	if (inFile.bad())
		return 2;
	if (inFile.fail())
		return 3;
}

int
main()
{
	vector<string> svec;
	string fileName, s;

	//读入文件名
	cout << "Enter fileName: " << endl;
	cin >> fileName;

	//处理文件
	switch (fileToVector(fileName. svec)) {
		case 1:
			cout << "error: can not open file : "
				 << fileName << endl;
			return -1;
		case 2:
			cout << "error: system failure " << endl;
			return << -1;
		case 3:
			cout << "error: read failure " << endl;
			return -1;
	}

	string word;
	istringstream isstream;
	for (vector<string>::iterator iter = svec.begin();
			iter != svec.end(); ++iter) {
		isstream.str(*iter);
		while (isstream >> word) {
			cout << word << endl;
		}
		isstream.clear();
	}
}
