#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main(void)
{
	char IPdotdec[20];	//store the decimal IP addr
	struct in_addr s;	//IPv4 structure
	//input IP addr
	printf("Please input IP addr:");
	scanf("%s", &IPdotdec);
	//convert
	inet_pton(AF_INET, IPdotdec, (void *)&s);
	printf("inet_pton: 0x%x\n", s.s_addr);	//note

	//reverse convert
	inet_ntop(AF_INET, (void *)&s, IPdotdec, INET_ADDRSTRLEN);
	printf("inet_ntop: %s\n", IPdotdec);
}
