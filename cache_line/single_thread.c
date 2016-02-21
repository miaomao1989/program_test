#include <stdio.h>
#include <stdlib.h>

unsigned long iteration = 20000000000;
unsigned long* data_array;

int main() {
		data_array = (unsigned long*)malloc(sizeof(unsigned long)*1);
			*data_array = 0;
				while (*data_array < iteration)
							(*data_array)++;
					
					free(data_array);
}
