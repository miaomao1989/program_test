## 10.4 Queueing and transmitting data


在 `tcp_enqueue()`函数格式化


当分片在`unacked`列表中时，它同样准备重传如Section 10.8节中描述的那样。当一个分片被重传的时，原分片的TCP/IP的头部被保存，仅仅需要对TCP的头部做很小的改动。TCP头部`ackno`以及`wnd`字段被设置成当前值，由于在原来分片的发送时刻和现在的重传时刻之间我们接收了一些数据。这仅仅改变了头部两个16-bit字，整个TCP的checksum不需要重新计算因为simple arithmetic能够被用来更新checksum。IP层已经添加IP头部当分片原来被发送的时候，没有必要再改变它。因此，重传不需要对IP头部checksum做任何重新计算。

### 10.4.1 Silly window avidance

SWS是一个TCP现象，会导致非常差的性能。SWS发生当一个TCP接受者通告一个很小的窗口，TCP发送者立即发送数据填满这个窗口。


## 10.5 Receiving segments

### 10.5.1 Demultiplexing

### 10.5.2 Receiving data

The actual processing of incoming segments is made in the function `tcp_receive()`. The acknowledgement number of segmentt is compared with the segments on the `unacked` queue3 of the connection. If the acknowledgement number is higher than the sequence number of a segment on the `unacked` queue, that segment is removed from the queue and hte allocated memory for segment is deallocated.

An incoming segment is out of the sequence if the sequence number of the segment is higher than `rcv_nxt` variable in the PCB. Out of sequence segments are queued on the `ooseq` queue in the PCB. If the sequence number of the incoming segment is equal to `rcv_nxt`, the segment is delivered to the upper layer by calling the `recv` function in the PCB and `rcv_nxt` is increased by the length of the incoming segment.Since the reception of an in-sequence segment might mean that a previously received out of sequence segment now is the next segment expected, the `ooseq` queue is checked. If it constains a segment with sequence nubmer equal to `rcv_nxt`, this segment is delivered to the application by a call to `recv` fucntiuon and `recv_nxt` is updated. This process continues until either the `ooseq` queue is empty or the next segment on `ooseq` is out of sequence.

## 10.6 Accepting new connections

TCP connnecitons that are int the `LISTEN` state, i.e. that are passively open, are ready to accpet new connections from a remote host. For those connections, a new TCP PCBis creaated and must be passed to the application program that opened the initial listening TCP connection. In lwIP, this is done by letting the application register a callback fuction that is to be called when a new connection has been established.

When a connection in the `LISTEN` state receive a TCP segment with the SYN flag set, a new connection is created and a segment wiht the `SYN` and `ACK` flags are sent in response to the `SYN` segment

## 10.7 Fast retransmit

Fast retransmit and fast recovery is implemented in lwIP by keeping track of the last sequence number acknowledged. If another acknowledgement for the same sequence nubmer is received, the `dupakcs` counter in the TCP PCB is increased. When `dupacks` reaches three, the first segment on the `unack` queue is retransmitted and fast recovery is initialized. The implementation of fast recovery follows the stop

## 10.8 Timers

As in the BSD TCP implementation, lwIP uses two periodical timers that goes off 200ms and 500ms. Those two timers are then used to implement more complex logical timers such as the retransmission timers, the `TIME_WAIT` timer and the delayed `ACK` timer.

The fine grained timer, `tcp_timer_fine()` goes through every TCP PCB checking if there are any delayed ACKs that should be sent, as indicated by the `flag` field in the `tcp_pcb` structure. If the delayed ACK flag is set, an empty TCP acknowledgement segment is send and the flag is cleared.

The coarse grained timer, implemented in `tcp_timer_coarse()`, also scans the PCB list. For every PCB, the list of unacknowledged segments (the `unacked` pointer in the `tcp_seg` structure in Fig 11.), is traversed, and the `rtime` variable is increased. If `rtime` becomes larger than the current retransmission time-out as given by the `rto` variable in the PCB, the segment

## 10.9 Round-trip time estimation


## 10.10 Congestion control

# 11 Interfacing the stack

There are two ways for using the sevices provided by the TCP/IP stack; either by calling the functions in the TCP and UDP module direcly, or to use the lwIP API presented in the next section.

The TCP and UDP modules provide a rudimentary interface to the networking services. The interface is based on callbacks and an application program that uses the interface can therefore not operate in a sequential manner.

Further more, an application program that interfaces the TCP and UDP modules directly has to (at least partially) reside in the same process as the TCP/IP stack. This is due to the face that a callback function cannot be called across a process boundary. This has both advantages and disadvantages. One advantage is that since the application program and the TCP/IP stack are in the same process, no context switching will be made when sending or receiving packets. The main disadvantage is that the application program cannot involve itself in any long running computations since TCP/IP processing cannot occur in parallel with the computation, thus degrading communication performance. This can be overcome by splitting the application into two parts, one part dealing with the communication and one part dealing with the computation. The part doing the communication would the reside in the TCP/IP process and the computation. The part doing the communication would then reside in the TCP/IP process and the computationally heavy part would be a separate process. The lwIP API presented in the next section provides a structured way to divide the application in such a way.

# 12 Application Program Interface

## 12.1 Basic concept

From the applcaiton's point of view, data handling in the BSD socket API is done in continuous memory regions. This is convenient for the application programmer since manipulation of data in application programs is usually done in such continuous memory chunks. Using this type of mechanism with lwIP would not be advantageous, since lwIP usually handles data in buffers where the data is partitioned into smaller chunks of memory. Thus the data would have to be copied into a continuous memory area before being passed to the application. This would wast both processing time and memory size. Therefore, the lwIP API allows the application program to manipulate data directly in the partitioned buffer in order to avoid the extra copy.

The lwIP API uses a connection abstraction similar to that of the BSD socket API. There are very noticeable differences. Therefore, the lwIP API allows the application program to manipuulate data directly in the partitioned buffers in order to avoid the extra copy.

Network data is received in the form of buffers where the data is partitioned into smaller chunks of memory. Since many applications wants to manipulate data in a continuous memory region, a convience function of copying the data from a fragmented buffer to continuous memory exists.

Sending data is done differently depeding on whether the data should be sent over a TCP connection or as UDP datagrams. For TCP, data is sent by passing the output function a pointer to a continuous memory region. The TCP/IP stack will partition the data into appropriately  sized packets and queue them for transmission.When sending UDP datagrams, the application program will to explicitly allocate a buffer and fill it with data.

## 12.2 Implementation of the API

The implementation of the API is divided into two parts, dueto the process model of the TCP/IP stack. As shown
The current implementation uses the following three IPC mechanism:
- shared memory,
- message passing, and
- semaphore

While these IPC types are supported by the operating system layer, they need not be directly supported by the underlying operating system. For operating systems that do not natively support them, the operating system emulation layer emulates them.

The general design principle used is to let as much work as possible be done within the application process rather than in the TCP/IP process. This is important since all processes use the TCP/IP process for their TCP/IP implementation. Keeping down the code footprint of the part of the API that is linked with the applications is not as important. This code can be shared among the processed, and even if shared libraries are not supported by the operation system, the code is stored in ROM. Embedded systems usually carry fairly large amounts of ROM, whereas processing power is scarce.

The buffer management is located in the library part of the API implementation. Buffers are created, copied and deallocated in the application process. Shared memory is used to pass the buffers between the application process and the TCP/IP process. The buffer data type used in communication with the application program is an abstraction of the pbuf data type.

Buffers carrying referenced memory, as opposed to allcoated memory, is also passed using shared memory. For this to work, is has to be possible to share the referenced memory between the processes. The operating systems used in embeded systems for which lwIP is intended usually do not implement any form of memory protection.

The functions that handle network connections are implemented in the part of the API implementation that resides in the TCP/IP process. The API functions in the part of the API that runs in the application process will pass a message using a simple communication protocol to the API implementation in the TCP/IP process. The message include the type of operations that should be carried out and any arguments for the operations. The operation is carried out by the API implementation in the TCP/IP process and the return value is sent to the application process by message passing.

# 13 Statistical code analysis

This section analyzes the code of lwIP with respect to compiled object code size and number of lines in the source code. The code has been compiled for two processor architecutres:

- The Intel Pentium III processor, henceforth referred to as the Intel x86 processor. The code was complied with gcc 2.95.2 under FreeBSD 4.1 with compiler optimizations turned on.

- The 6502 processor.

The Intel x86 has seven 32-bit registers and uses 32-bit pointers.

## 13.1 Lines of code

The category "Support functions"  include buffer and memory management functions as well as the functions for computing the Internet checksum. The checksumming function are generic C implementation of the algorithm that should be replaced with processor specific implementations when acutually deployed. The category "API" includes both the part of the API that is linked with the applications and the part that is linked with the TCP/IP  stack. The operating system emulation layer is not included in this analysis since its size


# 14 Performance analysis


# 15 API reference

## 15.1 Data types

There are two data types that are used for the lwIP API. These are
- `netbuf`, the network buffer abstraction, and
- `netconn`, the abstraction of a network conneciton.

Each data type is represented as a pointer to a `C struct`. Knowledge of the internal structure of the `structure` should not be used in application programs. Instead, the API provides functions for modifying and extracting necessary fields.

### 15.1.1 Netbuf
`Netbufs` are buffers that are used for sending and receiving data. Internally, a netbuf is associated with a pbu as presented in Section 6.1. Netbuf can, just as pbufs, accomodate both allocated memory and referenced memory. Allocated memory is RAM that is explicitly allocated for holding network data, whereas referenced memory might be either application managed RAM or external ROM. Referenced memory is useful for sending data that is not modified, such as static web pages or images.

The data in a netbuf can be fragmented into differently sized blocks. This means that an application must be prepared to accpet fragmented data. Internally, a netbuf has a pointer to one of the fragments in the netbuf. Two functions, `netbuf_next()` and `netbuf_first()` are used to manipulate this pointer.

Netbufs that have been received from the network also contain the IP address and port number of the originator of the packet. Functions for extracting those values exist.

## 15.2 Buffer Functions

### 15.2.1 `netbuf_new()`

# 16 Network connection Functions

### 16.0.14 `netconn_new()`

# 17 BSD socket library

This section provides a simple implementation of the BSD

## 17.1 The representation of a socket
In BSD, the socket API are represented as ordinary file descriptor. File descriptor are integers that uniquely identifies the file or network connection. In this implementation of the BSD socket API, socket are internally represented by a `netconn` structure. Since BSD sockets are identified by an integer, the `netconn` variables are kept in an array, `sockets[]`, where the BSD socket identifier is the index into the array.

## 17.2 Allocating a sockets

### 17.2.1 The `socket()` call

The `socket()` call allocates a BSD socket. The parameters to `socket()` are used to specify what type of socket that is requested. Since this socket API implementation is concerned only with network stack, these are the only type

### 17.3.1 The `bind()` call

## 17.4 Sending and receiving data

### 17.4.1 The `send()` call

Before a call to `send()`, the receiver of the data must have been set up using `connect()`. For UDP session, the `send()` call resembles the `netconn_send()` function from the lwIP API, but since the lwIP API requires the application to explicitly allocate buffers, a buffer must be allocated and deallocated within the `send()` call. Therefore, a buffer is allocated and the data is copied into the allocated buffer.

The `netconn_send()` function of the lwIP API cannot be used with TCP connection, so this implementation of the `send()` uses `netconn_write()` for TCP connection. In the BSD socket API, the application is allowed to modify the sent data directly after the call to `send()` andd therefore the `NETCONN_COPY` flag is passed to `netconn_write()`, so that the data is copied into internal buffers in the stack.

```
int
send(int s, void *data, int size, unsigned int flags)
{
  struct netconn *conn;
  struct netbuf *buf;

  conn = sockets[s];

  switch(netconn_type(conn)) {
    case NETCONN_UDP:
    /* create a buffer */
    buf = netbuf_new();

    /* make the buffer point to the data that should be sent */
    netbuf_ref(buf, data, size);

    /* send the data */
    netconn_send(sock->conn.udp, buf);

    /* deallocated the buffer */
    netbuf_delete(buf);

    break;

    case NETCONN_TCP:
      netconn_write(conn, data, size, NETCONN_COPY);
      break;
  }

  return size;
}
```

### 17.4.2 The `sendto()` and `sendmsg()` calls

The `sendto()` and `sendmsg()` calls are similar to the `send()` call, but they allow the application program to specify the receiver of the data in the parameters to the call. Also, `sendto()` and `sendmsg()` only can be used for UDP connections. The implementation uses `netconn_connect()` to set the receiver of the datagram and must therefore reset the remote IP address and port number if the socket was previously connected. An implementation of `sendmsg()` is not included.

```
int
sendto(int s, void *dta, int size, unsigned int flags,
       struct sockaddr *to, int tolen)
{
  struct netconn *conn;
  struct ip_addr *remote_addr, *addr;
  unsigned short remote_port, port;
  int ret;

  conn = sockets[s];

  /* get the peer if currently connected */
  netconn_peer(cons, &addr, &port);

  remote_addr = (struct ip_addr *)to->sin_addr;
  remote_port = to->sin_port;
  netconn_connect(conn, remote_addr, remote_port);

  ret = send(s, data, size, flags);

  /* reset the remote address and port number of the connection */
  netconn_connect(conn, addr, port);
}
```


### 17.4.3 The `write()` call

In the BSD socket API, the `write()` call sends data on a connection and can be used for both UDP and TCP connection. For TCP connections, the maps directly to the lwIP API function `netconn_write()`. For UDP, the BSD socket function `write()` function is equvalent to the `send()` function.

```
int
write(ints, void *data, int size)
{
  struct netconn *conn;

  conn = sockets[s];
  swithc(netconn_type(conn)) {
    case NETCONN_UDP:
      send(s, data, size, 0);
      break;
    case NETCONN_TCP:
      netconn_write(conn, data, size, NETCONN_COPY);
      break;
  }

  return size;
}
```

### 17.4.4 The `recv()` and `read()` calls

In the BSD sockete API, the `recv()` and `read()` calls are used on a connected socket to receive data. They can be used for both

### 17.4.5. The `recvfrom()` and `recvmsg()` calls


```
int
recvfrom(int s, void *mem, int len, unsigned int flags,
         struct sockaddr *from ,int *fromlen)
{
  struct netconn *conn;
  struct netbuf *buf;
  struct ip_addr *addr;
  unsigned short port;
  int buflen;

  conn = sockets[s];
  buf = netconn_recv(conn);
  buflen = netbuf_len(conn);

  /* copy the contents of the received buff into
  the suuplied memory pointer */
  netbuf_copy(buf, mem, len);

  addr = netbuf_fromaddr(buf);
  port = netbuf_fromport(buf);

  from->sin_addr = *addr;
  from->sin_port = port;
  *fromlen = sizeoof(struct sockaddr);
  netbuf_delete(buf);

  /* if the length of the received data is larger than len, this data is discarded and we return len.
  otherwise we return the actual length of the received data */

  if (len > buflen) {
    return buflen;
  } else {
    return len;
  }
}
```

# 18 Code examples

## 18.1 Using the API

This section presents a simple web server written using the lwIP API. The application code is given below. The application implements only the bare bons of an HTTP/1.0 server and is included only to show the principle in using the lwIP API for an actual application.

The application consists of a single process that accept connections form the network, responds to HTTP requests, and close the connection. There are two functions in the application; `main()` which does the necessary initialization and connection setup, and `process_connection()` that implements the small subset of HTTP/1.0. The connection setup procedure is a fairly straightforward example of how connection are initialized using the minimal API. After the connection has been created using `netconn_new()`, the connection is bound to TCP port 80 and put into the `LISTEN` state, in which it waits for connecitons. The call to `netconn_accpet()` will return a `netconn` connection once a remote host has connected. After the connection has been processed by `process_connection()`, the `netconn` must be deallocated using `netconn_delete()`.

In `process_connection()`, a netbuf is received through a call to `netconn_recv()` and a pointer to the actual request data is obtained via `netbuf_data()`. This will return the pointer to the data in the first fragment of the netbuf, and we hope that it will contain the request. Since we only read first seven bytes of the request, this is not an unreasonable assumption. If we would have wanted to read more data, the simplest way would have been to sue `netbuf_copy()` and copy the request into a continuous memory and process it from there.

The simple web server only responds to `HTTP GET` request fro the file "/", and when the request has been checked, the response is sent. We send the HTTP header for HTML data as well as the HTML data with two calls to the function `netconn_write()`. Since we do not modify either the HTTP header or the HTML data, we can use the `NETCONN_COPY` flag with `netconn_write()` thus avoiding any copying.

Finally, the connection is closed and the function `process_connection()` returns. The connection structure is deallocated after the call.


The C code for the application follows.
:
