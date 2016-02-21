#include <stdio.h>
#include <stdlib.h>


#define TEST_HELLO 

#ifdef TEST_HELLO
#define HELLO	"hello world\n"
#endif



int main()
{
	FILE *fp;
	char ch;

	if( (fp = fopen("/dev/shm/tmp", "w")) == NULL)
	{
		printf("Can't open file /dev/shm/tmp !\n");
		exit(0);
	}

#ifdef TEST_HELLO
	printf("%s\n", HELLO);
#endif

	while( (ch = fgetc(stdin)) != EOF )
		fputc(ch, fp);


	fclose(fp);
	return 0;
}
