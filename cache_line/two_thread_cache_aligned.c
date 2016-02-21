#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>

#define CACHE_ALIGN 64
#define THREAD_NUM 2

typedef struct data {
	unsigned long long_data;
	//use this padding to align
	char padding[CACHE_ALIGN-sizeof(unsigned long)];
}data;

unsigned long iteration = 20000000000/THREAD_NUM;  
data *data_array;
pthread_t *thread_array;

void *iterate(void *int_ptr);

int main(){
	//data_array=(unsigned long*)malloc(sizeof(unsigned long)*THREAD_NUM);
	
	//use this instead of malloc to align the start address
	void *start_address;
	if( posix_memalign(&start_address, sizeof(data), THREAD_NUM*sizeof(data)) )
		exit(1);

	data_array = (data*)start_address;

	thread_array=(pthread_t *)malloc(sizeof(pthread_t *)*THREAD_NUM);
	int i;
	int res;
	for(i=0; i < THREAD_NUM; i++)
		(data_array+i)->long_data = 0;

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
	data *temp_ptr = (data *)int_ptr;
	while(temp_ptr->long_data < iteration)
		(temp_ptr->long_data)++;
}

