#include <sys/time.h>
#include <unistd.h>

void 
main()
{
	struct timeval tv;
	struct timezone tz;
	gettimeofday(&tv, &tz);
	printf("tv_sec: %ld\n", tv.tv_sec);
	printf("tv_usec: %ld\n", tv.tv_usec);
	printf("tz_minutes west: %d\n", tz.tz_minuteswest);
	printf("tz_dsttime, %d\n", tz.tz_dsttime);
}
