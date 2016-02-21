#include <stdio.h>

//typedef int (*PF)(const char *str1, const char *str2);
typedef int PF(const char *str1, const char *str2);

int Default(const char *str1, const char *str2)
{
	printf("%s()\n", __func__);
	return 1;
}

int Func1(const char *str1, const char *str2)
{
	printf("%s()	%s, %s\n", __func__, str1, str2);
	return 2;
}

int Func2(const char *str1, const char *str2)
{
	printf("%s()	%s, %s\n", __func__, str1, str2);
	return 3;
}

int Func3(const char *str1, const char *str2)
{
	printf("%s()	%s, %s\n", __func__, str1, str2);
	return 4;
}

PF *Register (PF *pf)
{
	int ret = (*pf)("Hello", "world");
	if(ret == 1) {
		return Func1;
	} else if (ret == 2) {
		return Func2;
	} else if (ret == 3) {
		return Func3;
	}
	printf("ret = %d\n", ret);
	return Default;
}

int 
main()
{
	PF *f = Register(Func1);
	(*f)("aa", "bb");
	return 0;
}

