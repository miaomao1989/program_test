#include <stdio.h>

typedef int (*PF)(const char*, const char*);

int AFun(char *m, char *n)
{
	printf("AFun: %s, %s\n", m, n);
}

int BFun(char *x, char *y)
{
	printf("BFun: %s, %s\n", x, y);
}


PF Register(PF pf)
{
	pf;
	return &BFun;
}

int main()
{
	PF returnValue;
	
	returnValue=Register(AFun("hello", "world"));
	returnValue("miao", "mao");

	return 0;
}
