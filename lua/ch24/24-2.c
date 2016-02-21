#include <stdio.h>
#include <stddef.h>

int main(int argc, char *argv[]) {
	char str[] = "hello world\n";
	char *pstart = str;
	char *pend = str + strlen(str);
	ptrdiff_t difp = pend - pstart;
	printf("%d\n", difp);
	return 0;
}
