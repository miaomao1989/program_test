#include <stdio.h>
#include <stdlib.h>

#define MAX_CHAR 1000


int 
main()
{
	char input[MAX_CHAR];
	char checksum = -1;
	int col = 0;

	while( (fgets(input, MAX_CHAR, stdin)) != NULL ){
		do {
			checksum += input[col];
			col += 1;
		}while(input[col] != '\n');
		col = 0;
		printf("The checksum for %s is %d\n", input, checksum);
	}
	
	return EXIT_SUCCESS;
}
