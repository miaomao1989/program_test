#include <stdio.h>
#include <stdlib.h>

int
main()
{
	int ch;
	int braces;

	braces = 0;

	while ( ( ch = getchar() ) != EOF ) {
		if( ch == '{' )
			braces += 1;

		if( ch == '}' )
			if( braces == 0 )
				printf("Extra closing brace \n");
			else
				braces -= 1;
	}

	if( braces > 0 )
		printf("%d unmatched opening brace(s) \n", braces);

	return EXIT_SUCCESS;
}
