#define _GNU_SOURCE
#include <sys/types.h>
#include <sys/wait.h>
#include <stdio.h>
#include <sched.h>
#include <signal.h>
#include <unistd.h>

#define STACK_SIZE (1024*1024)

static char child_stack[STACK_SIZE];
char * const child_args[] = {
	"/bin/bash",
	NULL
};

int child_main(void *args) {
	printf("in child process!\n");
	sethostname("NewNameSpace", 12);
	execv(child_args[0], child_args);
	return 1;
}

int main()
{
	printf("begin: \n");
	int child_pid = clone(child_main, child_stack + STACK_SIZE, CLONE_NEWIPC | CLONE_NEWUTS | SIGCHLD, NULL);
//	int child_pid = clone(child_main, child_stack + STACK_SIZE, SIGCHLD, NULL);
	waitpid(child_pid, NULL, 0);
	printf("already exit\n");
	return 0;
}

