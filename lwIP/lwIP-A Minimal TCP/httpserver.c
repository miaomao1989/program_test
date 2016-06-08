#include "api.h"

/* This is the data for the actual web page.
 * Most compiler would place this in ROM. */

const static char indexdata[] =
"<html> \
<head><title> A test page</titile></head> \
<body> \
This is a small test page.\
</body> \
</html>";

const static char http_html_hdr[] = 
"Content-type: text/html \r\n\r\n";

/* This function processes an incomming connection */
static void
process_connection(struct netconn *conn)
{
	struct netbuf *inbuf;
	char *rq;
	int len;

	/* Read data from the connection into the netbuf inbuf.
	 * We assume that the full request is in the netbuf. */

	inbuf = netconn_recv(conn);

	/* Get the pointer to the dta in the first netbuf
	 * fragment which we hope contains the request.*/

	netbuf_data(inbuf, &rq, &len);

	/* check if the request was an HTTP "GET"/\r\n". */
	if(rq[0] == 'G' && rq[1] == 'E' &&
	   rq[2] == 'T' && rq[3] == ' ' &&
	   rq[4] == '/' && rq[5] == '\r' &&
	   rq[6] == '\n') {
		
		/* send the header.*/
		netconn_write(conn, http_html_hdr, sizeof(http_html_hdr), NETCONN_NOCOPY);

		/* send the acutal web pages */
		netconn_write(conn, indexdata, size(indexdata), NETCONN_NOCOPY);

		/* Close the connection */
		netconn_close(conn);
	}
}


/* The main() function */
int 
main()
{
	struct netconn *conn, *newconn;

	/* create a new TCP connection handle. */
	conn = netconn_new(NETCONN_TCP);

	/* bind the conneciton to port 80 on any local IP address */
	netconn_bind(conn, NULL, 80);

	/* Put the connection into LISTEN state */
	netconn_listen(conn);

	/* Loop forever*/
	while(1){
		/* Accept a new connection */
		newconn = netconn_accpet(conn);

		/* Process the incoming connection */
		processes_connection(newconn);

		/* Deallocate connection handle.*/
		netconn_delete(newconn);
	}
	return 0;
}
