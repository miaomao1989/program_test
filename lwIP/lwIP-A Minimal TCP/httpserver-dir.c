/* A simple HTTP/1.0 server directly interfacing the stack */

#include "tcp.h"

/* This is the data for the acutal web page */
static char indexdata[] =
"HTTP/1.0 200 OK\r\n\
Content-type: text/html\r\n\
\r\n\
<html> \
<head><title>A test page</title></head>
<body> \
This is a small test page. \
</body> \
</html>";

/* This is the callback function that is called
 * when a TCP segment has arrived in the connection */
static void
http_recv(void *arg, struct tcp_pcb *pcb, struct pbuf *p)
{
	char *rq;

	/* If we got a NULL pbuf in p, the remote end has closed the connection */
	if ( p!= NULL ) {
		
		/* The payload pointer in the pbuf contains the data
		 * in the TCP segment */
		rq = p->payload;

		/* check if the request was an HTTP Get*/
		if(rq[0] == 'G' && rq[1] == 'E' &&
		   rq[2] == 'T' && rq[3] == ' ' &&
		   rq[4] == '/' && rq[5] == '\r' &&
		   rq[6] == '\n' ) {
		/* Send the web page to the remote host. A zero in the last argument means that the data should not be copied into internal buffers */
			tcp_write(pcb, indexdata, sizeof(indexdata), 0);
		}

		/* Free the pbuf */
		pbuf_free(p);
	}

	/* Close the connection */
	tcp_close(pcb);
}

/* This is the callback function that is called when a
 * connection has been accepted */
static void
http_accept(void *arg, struct tcp_pcb *pcb)
{
	/* set up the function http_recv() to be called when data arrives*/
	tcp_recv(pcb, http_recv, NULL);
}

/* The initialization function */
void 
http_init(void)
{
	struct tcp_pcb *pcb;

	/* Create a new TCP PCB */
	pcb = tcp_pcb_new();

	/* Bind the PCB to TCP port 80 */
	tcp_bind(pcb, NULL, 80);

	/* Change TCP state to LISTEN */
	tcp_listen(pcb);

	/* Set up http_accept() function to be called
	 * when a new connection arrives */
	tcp_accept(pcb, http_accept, NULL);
}

