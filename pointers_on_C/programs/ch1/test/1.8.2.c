#include <stdio.h>

#define MAX_INPUT 10

void
main(void)
{
	char input[MAX_INPUT];

	while(fgets(input, MAX_INPUT, stdin) != NULL)
		printf("The input is %s\n", input);
}
