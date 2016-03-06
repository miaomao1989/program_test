#include <iostream>
#include <string>
#include <vector>

using namespace std;

int
main()
{
	string line1 = "We were her pride of 10 she named us: ";
	string line2 = "Benjamin, Phoenix, the Prodigal";
	string line3 = "and perspicacious pacific Suzanne";
	string sentence = line1 + ' ' + line2 + ' ' + line3;
	string separators(" \t:,\v\r\n\f");
	string word;

	string::size_type maxLen, minLen, wordLen, count = 0;
	vector<string> longestWords, shortestWords;
	string::size_type startPos = 0, endPos = 0;

	while ( (startPos = sentence.find_first_not_of(separators, endPos))
			!= string::npos ) {
		++count;

		endPos = sentence.find_first_of(separators, startPos);

		if (endPos == string::npos) {
			// the word is the last word
			wordLen = sentence.size() - startPos;
		}
		else {
			wordLen = endPos - startPos;
		}

		word.assign(sentence.begin() + startPos,
				sentence.begin() + startPos + wordLen);		// get the word

		// set the next starting position
	//	startPos = sentence.find_first_not_of(separators, endPos);

		if (count == 1) {	// the first word
			maxLen = minLen = wordLen;
			longestWords.push_back(word);
			shortestWords.push_back(word);
		} else {
			if ( wordLen > maxLen ) {
				maxLen = wordLen;
				longestWords.clear();
				longestWords.push_back(word);
			} else if ( wordLen == maxLen ) 
				longestWords.push_back(word);

			if ( wordLen < minLen ) {
				minLen = wordLen;
				shortestWords.clear();
				shortestWords.push_back(word);
			} else if ( wordLen == minLen )
				shortestWords.push_back(word);
		}
	}
	
	// word count
	cout << "word amount: " << count << endl;
	vector<string>::iterator iter;

	// the max len word
	cout << "longest word(s): " << endl;
	iter = longestWords.begin();
	while ( iter != longestWords.end() )
		cout << *iter++ << endl;

	cout << "shortest word(s): " << endl;
	iter = shortestWords.begin();
	while ( iter != shortestWords.end() )
		cout << *iter++ << endl;

	return 0;

}
