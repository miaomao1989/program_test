#include <stdio.h>
#include <unistd.h>
#include <getopt.h>

char * l_opt_arg;
char * const short_options = "myl:";
//char * const short_options = "nbl:";

struct option long_options[] = {
	{"name",	0,	NULL,	'm'},
	{"yourname",0,	NULL,	'y'},
	{"love",	1,	NULL,	'l'},
	{0,			0,	0,		0},
};

int
main(int argc, char *argv[])
{
	int c, i;
	printf("before:\n");
	for( i = 1; i < argc; i++)
		printf("arg:%d	: %s\n", i, argv[i]);
	printf("\n");
	while((c = getopt_long(argc, argv, short_options, long_options, NULL)) != -1)
	{
		switch(c)
		{
			case 'm':
				printf("My name is A.\n");
				break;
			case 'y':
				printf("His name is B.\n");
				break;
			case 'l':
				l_opt_arg = optarg;
				printf("Our love is %s!\n", l_opt_arg);
				break;
		}
	}
	
	printf("optind: %d\n", optind);

	printf("after:\n");
	for(i=1; i<argc; i++)
		printf("arg:%d : %s\n", i, argv[i]);
	return 0;
}
