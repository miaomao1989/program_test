#include <stdio.h>
#include <stdlib.h>

void
main(void)
{
	int ch;
	int line_num = 1;
	int at_beginning = 1;

	while( (ch=getchar()) != EOF )
	{
		if(at_beginning)
			printf("Line Num %d : ", line_num );

		if( ch != '\n') {
			at_beginning = 0;
			printf("%c", ch);
		}
		else {
			at_beginning = 1;
			printf("\n");
			line_num++;
		}
	}	
}
