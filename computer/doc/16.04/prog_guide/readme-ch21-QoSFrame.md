# 21. Quality of Service (QoS) Framework

This chapter describes the DPDK Quality of Service (QoS) framework.

## 21.1. Packet Pipeline with QoS Support

An example of a complex packet processing pipeline with QoS support is shown in the following figure.

This pipeline can be built using reusable DPDK software libraries. The main blocks implementing QoS in this pipeline are: the policer, the dropper and the scheduler. A functional description of each block is provided in the following table.
| # | Block                  | Functional                                                                                                                                                                                                                                                                                                                                                                                                                 |
|:--|:-----------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | Packet I/O RX & TX     | Packet reception/ transmission from/to multiple NIC ports. Poll mode drivers (PMDs) for Intel 1 GbE/10 GbE NICs.                                                                                                                                                                                                                                                                                                           |
| 2 | Pakcet parser          | identify the protocol stack of the input packet. Check the integrity of the packet headers |                                                                                                                  | 3 | Flow classification  | Map the input packet to one of the known traffic flows. Exact match table lookup using configurable hash function (jhash, CRC and son on) and bucket logic to handle collisions |
| 4 | Policer                | Packet metering using TCM (RFC 2697) or TCM (RFC 2698) algorithms                                                                                                                                                                                                                                                                                                                                                          |
| 5 | Load Balancer          | Distribute the input packets to the application workers. Provide uniform load to each worker. Preserve the affinity of traffic flows to workers and the packet order within each flow                                                                                                                                                                                                                                      |
| 6 | Worker threads         | Placeholders for the custom specific application workload (for example, IP stack and so on)                                                                                                                                                                                                                                                                                                                                |
| 7 | Dropper                | Congestion management using the Random Early Detection (RED) algorithm or Weighted RED. Drop packets based on the current scheduler queue load level and packet priority. When congestion is experienced, lower priority packets are dropped first                                                                                                                                                                         |
| 8 | Hierarchical Scheduler | 5-level hierarchical scheduler (levels are: output port, subport, pipe, traffic class and queue) with thousands (typicall 64K) leaf nodes (queues). Implements traffic shaping (for subport and pipe levels), strict priority (for traffic class level) and Weighted Round Robin (WRR) (for queues within each pipe traffic class)                                                                                         |

The infrastructure blocks used throughout the packet processing pipeline are listed in the following table.

| # | Block          | Functional Description                                               |
|:--|:---------------|:---------------------------------------------------------------------|
| 1 | Buffer manager | Support for global buffer pools and private per-thread buffer caches |
| 2 | Queue manager  | Support for message passing between pipeline blocks.                 |
| 3 | Power saving   | Support for power saving during low activity periods                 |

The mapping of pipeline blocks to CPU cores is configurable based on the performance level required by each specific application and the set of features enabled for each block. Some blocks might consume more than one CPU core (with each CPU core running a different instance of the same block on different input packets), while several other blocks could be mapped to the same CPU core.

## 21.2. Hierarchical Scheduler

The hierarchical scheduler block, when present, usually sits on the TX side just before the transmission stage. Its purpose is to prioritize the transmission of packets from different users and different traffic classes according to the policy specified by the Service Level Agreements (SLAs) of each network node.

### 21.2.1. Overview

The hierarchical scheduler block is similar to the traffic manager block used by network processors that typically implement per flow (or per group of flows) packet queuing and scheduling. It typically acts like a buffer that is able to temporarily store a large number of packets just before their transmission (enqueue operation); as the NIC TX is requesting more packets for transmission, these packets are later on removed and handed over to the NIC TX with the packet selection logic observing the predefined SLAs (dequeue operation).

The hierarchical scheduler is optimized for a large number of packet queues. When only a small number of queues are needed, message passing queues should be used instead of this block. See Worst Case Scenarios for Performance for a more detailed discussion.

### 21.2.2. Scheduling Hierarchy

The scheduling hierarchy is shown in Fig. 21.3. The first level of the hierarchy is the Ethernet TX port 1/10/40 GbE, with subsequent hierarchy levels defined as subport, pipe, traffic class and queue.

Typically, each subport represents a predefined group of users, while each pipe represents an individual user/subscriber. Each traffic class is the representation of a different traffic type with specific loss rate, delay and jitter requirements, such as voice, video or data transfers. Each queue hosts packets from one or multiple connections of the same type belonging to the same user.

The functionality of each hierarchical level is detailed in the following table.

| # | Level   | Siblings per Parent      | Functional Description                                                                                                                                                                                                                           |
|:--|:--------|:-------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | Port    | .                        | 1. Output Ethernet port 1/10/40GbE 2. Multiple ports are scheduled in round robin order with all ports having equal priority                                                                                                                     |
| 2 | Subport | Configurable (default:8) | 1. Traffic shaping using token bucket algorithm (one token bucket per subport) 2. Upper limit enforced per Traffic Class (TC) at the subport level 3. Lower priority TCs able to reuse subport bandwidth currently unused by higher priority TCs |
|   |         |                          |                                                                                                                                                                                                                                                  |
|   |         |                          |                                                                                                                                                                                                                                                  |
|   |         |                          |                                                                                                                                                                                                                                                  |


### 21.2.3. Application Programming Interface (API)

#### 21.2.3.1. Port Scheduler Configuration API

The rte_sched.h file contains configuration functions for port, subport and pipe.

#### 21.2.3.2. Port Scheduler Enqueue API

The port scheduler enqueue API is very similar to the API of the DPDK PMD TX function.

```
int rte_sched_port_enqueue(struct rte_sched_port *port, struct rte_mbuf **pkts, uint32_t n_pkts);
```

#### 21.2.3.3. Port Scheduler Dequeue API

The port scheduler dequeue API is very similar to the API of the DPDK PMD RX function.

```
int rte_sched_port_dequeue(struct rte_sched_port *port, struct rte_mbuf **pkts, uint32_t n_pkts);
```

21.2.4.2. Multicore Scaling Strategy

The multicore scaling strategy is:

Running different physical ports on different threads. The enqueue and dequeue of the same port are run by the same thread.
Splitting the same physical port to different threads by running different sets of subports of the same physical port (virtual ports) on different threads. Similarly, a subport can be split into multiple subports that are each run by a different thread. The enqueue and dequeue of the same port are run by the same thread. This is only required if, for performance reasons, it is not possible to handle a full port with a single core.
21.2.4.2.1. Enqueue and Dequeue for the Same Output Port

Running enqueue and dequeue operations for the same output port from different cores is likely to cause significant impact on scheduler’s performance and it is therefore not recommended.

The port enqueue and dequeue operations share access to the following data structures:

Packet descriptors
Queue table
Queue storage area
Bitmap of active queues
The expected drop in performance is due to:

Need to make the queue and bitmap operations thread safe, which requires either using locking primitives for access serialization (for example, spinlocks/ semaphores) or using atomic primitives for lockless access (for example, Test and Set, Compare And Swap, an so on). The impact is much higher in the former case.
Ping-pong of cache lines storing the shared data structures between the cache hierarchies of the two cores (done transparently by the MESI protocol cache coherency CPU hardware).
Therefore, the scheduler enqueue and dequeue operations have to be run from the same thread, which allows the queues and the bitmap operations to be non-thread safe and keeps the scheduler data structures internal to the same core.
