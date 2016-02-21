#include <stdio.h>
#include <pthread.h>
#include <stdlib.h>
#include <unistd.h>

pthread_mutex_t mutex;
pthread_cond_t cond;

void hander(void *arg)
{
	free(arg);
	(void)pthread_mutex_unlock(&mutex);
}

void * thread1(void *arg)
{
	pthread_cleanup_push(hander, &mutex);
	while(1)
	{
		printf("thread1 is running \n");
		pthread_mutex_lock(&mutex);
		pthread_cond_wait(&cond, &mutex);
		printf("thread1 applied the condition\n");
		pthread_mutex_unlock(&mutex);
		sleep(4);
	}
	pthread_cleanup_pop(0);
}

void * thread2(void *arg)
{
	while(1)
	{
		printf("thread2 is running\n");
		pthread_mutex_lock(&mutex);
		pthread_cond_wait(&cond, &mutex);
		printf("thread2 applied the condition\n");
		pthread_mutex_unlock(&mutex);
		sleep(4);
	}
}

int main()
{
	pthread_t thid1, thid2;
	printf("condition variable study!\n");
	pthread_mutex_init(&mutex, NULL);
	pthread_cond_init(&cond, NULL);
	pthread_create(&thid1, NULL, thread1, NULL);
	pthread_create(&thid2, NULL, thread2, NULL);
	sleep(1);
	do
	{
		pthread_cond_signal(&cond);
	}while(1);
	sleep(20);
	pthread_exit(0);
	return 0;
}
