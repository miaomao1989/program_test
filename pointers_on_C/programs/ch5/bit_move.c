#include <stdio.h>


void pirnt2(int);

void 
main()
{
	int biNum = 0;
	int b2move = 0;
	printf("Input number to move: ");
	scanf("%d", &biNum);
	printf("The input number in binary is : ");
	print2(biNum);
	printf("\n");

	printf("Input bit number for moving: ");
	scanf("%d", &b2move);
	printf("The result: ");
	print2(biNum >> b2move);
	printf("\n");
}

void print2(int biNum)
{
	int i;
	int size = sizeof(biNum);
	for( i = 0; i < size; i++)
	{
		if( biNum & ( 1 << (size - i - 1) ) )
			printf("1");
		else
			printf("0");
	}

}
