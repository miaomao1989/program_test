#ifndef __FILE__
#define __FILE__

#include <fstream>


ifstream & open_file(ifstream &in, const string &file)
{
	in.close();			// close in case it was already open
	in.clear();			// clear any existing errors
	// if the open fails, the stream will be in an invalid state
	in.open(file.c_str());		// open the file we were given
	return in;
}

#endif
