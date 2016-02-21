#define __USE_GNU
#define _GNU_SOURCE

#include <stdio.h>
#include <unistd.h>
#include <pthread.h>
#include <stdint.h>


#include <assert.h>

#include<stdlib.h> 
#include<sys/types.h> 
#include<sys/sysinfo.h> 

#include<sched.h> 
#include<ctype.h> 
#include<string.h>


long get_tsc(){
    unsigned cycles_low, cycles_high;
    unsigned cyc_nums;

    asm volatile (
                "CPUID\n\t"
                "RDTSC\n\t"
                "mov %%edx, %0\n\t"
                "mov %%eax, %1\n\t": "=r" (cycles_high), "=r"
                (cycles_low):: "%rax", "%rbx", "%rcx", "%rdx");

    cyc_nums = ( ((uint64_t)cycles_high << 32) | cycles_low );

    return cyc_nums;
}


long get_end_tsc() {
    asm("rdtscp");
}


long get_rdtsc() {
    asm("rdtsc");
}



long before_return_cycles() {
    unsigned cycles_low, cycles_high;

    unsigned cyc_nums;

    asm volatile ("CPUID\n\t"
        "RDTSC\n\t"
        "mov %%edx, %0\n\t"
        "mov %%eax, %1\n\t": "=r" (cycles_high), "=r" (cycles_low)::
        "%rax", "%rbx", "%rcx", "%rdx");

    asm volatile ("CPUID\n\t"
        "RDTSC\n\t"
        "CPUID\n\t"
        "RDTSC\n\t"
        "mov %%edx, %0\n\t"
        "mov %%eax, %1\n\t": "=r" (cycles_high), "=r" (cycles_low)::
        "%rax", "%rbx", "%rcx", "%rdx");

    asm volatile ("CPUID\n\t"
        "RDTSC\n\t"::: "%rax", "%rbx", "%rcx", "%rdx");


    cyc_nums = ( ((uint64_t)cycles_high << 32) | cycles_low );

    return cyc_nums;

}




void thread_1(){
    printf("Thread 1 OK\n");
}

int main() {
    int i;
    long t1, t2;
    int cpu_nums;

    int ret;

    pthread_t thread_id, thread_id1;
    cpu_set_t cpuset;
    pid_t pid;

    pid = getpid();
    thread_id = pthread_self();

//    pthread_create(&thread_id1, NULL, thread_1, NULL);


    printf("porgram pid:%u, the function1 pthread id is %lu\n",pid, thread_id);

    cpu_nums = sysconf(_SC_NPROCESSORS_CONF);

#if 0
    ret = sched_getaffinity(pid, sizeof(cpu_set_t), &cpuset);
    assert(ret == 0);


    for (i = 0; i < cpu_nums; ++i){
        if (CPU_ISSET(i, &cpuset)){
            printf("The core %d is bind to process %u\n", i, pid);
        }

    }
#endif
    printf ("\n");

    printf ("cpu_nums = %d\n", cpu_nums);


    int core;

    core = 1 % cpu_nums;
    CPU_ZERO(&cpuset);  
    CPU_SET(core, &cpuset);

    ret = sched_setaffinity(pid, sizeof(cpu_set_t), &cpuset);  
    assert(ret == 0);

#if 1 
    ret = pthread_setaffinity_np(thread_id, sizeof(cpu_set_t), &cpuset);  
    assert(ret == 0);
#endif

#if 1
    ret = pthread_getaffinity_np(thread_id, sizeof(cpu_set_t), &cpuset);
    assert(ret == 0);
#endif

    printf("After set affinity\n");
    for (i = 0; i < cpu_nums; ++i){
        if (CPU_ISSET(i, &cpuset)){
            printf("The core %d is bind to thread\n", i);
        }
    }


    printf("\n\n");

    for(i=0;i < 10;i++) {
        t1 = get_tsc();

        do{
            t2 = get_tsc();
        }while (t2 - t1 < 300);

        printf("t2 - t1 = %ld ", t2 - t1);
    }
    printf("\n");
}
