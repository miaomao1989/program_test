#include <stdio.h>

void 
main()
{
	int ch;
	int flag = 0;
	while((ch = getchar()) != EOF)
	{
		if(ch == '{')
			flag += 1;
		if( ch == '}')
			flag -= 1;
	}
	if(flag)
		printf("error, braces is not pairing!\n");
}
