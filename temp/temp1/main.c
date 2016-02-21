#include <stdio.h>

	
int 
main(void)
{
//	const char clr[] = { 27, '[', '2', 'J', '\0'};
//	const char topLeft = {27, '[', '1', ';', '1', 'H', '\0'};
	const char clr[] = { 27, '[', '2', 'J', '\0' };
	const char topLeft[] = { 27, '[', '1', ';', '1', 'H','\0' };

	printf("%s%s", clr, topLeft);

	return 0;
}
