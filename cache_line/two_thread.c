#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

#define THREAD_NUM 2

unsigned long iteration = 20000000000/THREAD_NUM;  
unsigned long *data_array;
pthread_t *thread_array;

void *iterate(void *int_ptr);

int main(){
	data_array=(unsigned long*)malloc(sizeof(unsigned long)*THREAD_NUM);
	thread_array=(pthread_t *)malloc(sizeof(pthread_t *)*THREAD_NUM);
	int i;
	int res;
	for(i=0; i < THREAD_NUM; i++)
		*(data_array+i) = 0;

	//create thread
	for(i=0; i< THREAD_NUM; i++){
			res = pthread_create(&thread_array[i], NULL, iterate, (void *)(&data_array[i]));
		if(res != 0) {
			perror("Thread creation failed \n");
			exit(EXIT_FAILURE);
		}
	}
	//join thread
	for(i=0; i<THREAD_NUM; i++) {
		res = pthread_join(thread_array[i], NULL);
		if(res != 0){
			perror("Thread jion failed\n");
			exit(EXIT_FAILURE);
		}
	}
	free(thread_array);
	free(data_array);
}

void *iterate(void *int_ptr){
	unsigned long *temp_ptr = (unsigned long*)int_ptr;
	while(*temp_ptr < iteration)
		(*temp_ptr)++;
}

