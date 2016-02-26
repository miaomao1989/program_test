#ifndef _CONST_MEMBER_FUNCTION_H
#define _CONST_MEMBER_FUNCTION_H

#include <iostream>

using namespace std;

class Screen
{
	public:
		Screen(int ival) {_cursor = ival; }
		Screen():
			_cursor(0) { }
		int ok() const { return _cursor;}
		//int error(int ival) const { _cursor = ival;}
		bool equal(int ival) const { return (_cursor == ival);}
		int value() { return _cursor;}

	private:
		int _cursor;
};

#endif
