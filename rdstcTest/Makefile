CC = gcc  
XX = g++  
#CFLAGS = -Wall -g -lpthread
CFLAGS = -lpthread
TARGET = rdstc  
  
SOURCES = $(wildcard *.c *.cpp)  
OBJS = $(patsubst %.cpp, %.o, $(SOURCES))  
  
$(TARGET):$(OBJS)  
#	$(CC) $(CFLAGS) $(OBJS) -o $(TARGET)
	$(CC) rdstcTest.c -lpthread -o rdstc
	chmod a+x $(TARGET)  
  
clean:  
	rm -rf *.o rdstc
