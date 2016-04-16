#include <sys/socket.h>
#include <sys/epoll.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>
#include <errno.h>
#include <string.h>
#include <stdlib.h>
#include <map>
#include <string>
#include <singal.h>

using namespace std;

bool output_log = true;

#define exit_if(r, ...) if(r) { printf(__VA_ARGS__); printf("%s:%d error no: %d err msg %s\n", __FILE__, __LINE__, errno, strerror
