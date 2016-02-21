#include <stdio.h>
#include <stdlib.h>

int
main()
{
	int a;
	char pNum[] = "0xFF";
	a = strtoul(pNum, 0, 0);
	printf("%d\n", a);
	return 0;
}
