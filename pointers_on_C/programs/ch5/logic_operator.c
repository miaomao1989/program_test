#include <stdio.h>

void
main()
{
	int i = 0;
	int a[10];
	for(i; i < 10; i++)
	{
		a[i] = i;
	}
	printf("Input arrary index:");
	scanf("%d", &i);
	if( (i > -1) && (i < 10) && a[i] == i)
		printf("Array[%d] is %d\n", i, a[i]);
}
