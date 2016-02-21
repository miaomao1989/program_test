#include <stdio.h>

#define MAX_ARRAY_LEN 1000

void
main(void)
{
	int quantity, price;
	char department[MAX_ARRAY_LEN];

	scanf("%d", &quantity);
	scanf("%d", &price);
	scanf("%s", department);

	printf("%d %d %s", quantity, price, department);

}
