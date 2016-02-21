/*
** Determine whether the argument matches any of the words in
** a list of keywords, and return the index to the one it matches.
** If no match is found, return the value -1.
*/

#include <string.h>


char const *keyword[] = {
	"do",
	"for",
	"if",
	"register",
	"return",
	"switch",
	"while",
	NULL
};


int
lookup_keyword( char const * const desired_word,
    char const *keyword_table[])
{
	char	const **kwp;

	/*
	** For each word in the table ...
	*/
	for( kwp = keyword_table; *kwp != NULL; kwp++ )
		/*
		** If this word matches the one we're looking for,
		** return its position in the table.
		*/
		if( strcmp( desired_word, *kwp ) == 0 )
			return kwp - keyword_table;

	/*
	** Not found.
	*/
	return -1;
}


int 
main(void)
{
	char test[][9] = {
		"do",
		"for",
		"if",
		"register",
		"return",
		"switch",
		"while"
	};

	int i;

	for(i = 0; i < 7; i++)
	{
		printf("offset in keyword table (-1 no match): %d\n", lookup_keyword(&test[i][0], keyword)); 
	}
	return 0;

}
