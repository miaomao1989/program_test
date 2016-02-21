#include <stdio.h>

//函数指针的格式为: int (*ptr)(char *p) 
//既：返回值（指针名）（参数列表）
typedef int (*CallBackFun)(char *p);


//方法 Afun， 格式符合CallBackFun的格式，因此可以看做是一个CallBackFun
int Afun(char *p)
{
	printf("Afun 回调函数打印字符：%s!\n", p);
	return 0;
}


//方法 Cfun，格式符合CallBackFun的格式，因此可以看做是一个CallBackFun
int Cfun(char *p)
{
	printf("Cfun 回调函数打印字符：%s, Nice to meet you!\n", p);
	return 0;
}

//execute the callback function, 
//method1: through naming, pCallBack equals to the alias of CallBackFun
int call(CallBackFun pCallBack, char *p)
{
	printf("call print out directly %s!\n", p);
	pCallBack(p);
	return 0;
}



//method2: through fucntion pointer
int call2( char *p, int (*ptr)() ) //or int call2(char *p, int (*ptr)(char *))
{
	printf("===============================\n");
	(*ptr)(p);
}

int main()
{
	char *p = "hello world";
	call(Afun, p);
	call(Cfun, p);
	call2(p, Afun);
	call2(p, Cfun);
	return 0;
}
