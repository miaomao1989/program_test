## 4. Ring Library

### 4.2 Lockless Ring Buffer in Linux*

以下连接描述了[Linux Lockless Ring Buffer Design](http://lwn.net/Articles/340400/)

### 4.3 Additional Features

#### 4.3.1 Name

`ring`由一个`unique name`确认，不可能创建两个相同`name`的`ring`(`rte_ring_create()`将会返回`NULL`如果这样做的话)。

#### 4.3.2 Water Marking
`ring`可以有一个比较高的`water mark`。一旦`enqueue`操作达到了高水位，`producer`就被通知，如果`water mark`被配置的话。

这个机制能够被用来，例如，在I/O上发挥一个反压来通知`LAN to PAUSE`。

#### 4.3.3 Debug

当`debug`被设置的时候(`CONFIG_RTE_LIBRTE_RING_DEBUG`被设置)，库存储每个`ring`的静态`counter`关于`enqueue/dequeue`数量的。这些统计数据是`per-core`的，以免并发访问或这原子操作。

### 4.4 Use Cases

`Ring Lib`的用例包括：

  - 在`DPDK`的应用之间用于通信；
  - 被`memory pool allocator`使用；


### Anatomy of a Ring Buffer

The ring structure is composed of two head and tail couples; one is used by producers and one is used by the consumers.

#### 4.5.1 Single Producer enqueue
This section explains what occurs when a producer adds an object to the ring. In this example, only the producer head and tail (prod_head and prod_tail) are modified, and there is only one producer.

The initial state is to have a prod_head and prod_tail pointing at the same location.

##### 4.5.1.1 Enqueue First Step

First, `ring->prod_head` and `ring->cons_tail` are copied in local variables. The `prod_next` local variable points to the next element of the table, or several elements after in case of bulk enqueue.

If there is not enough room in the ring (this is detected by checking `cons_tail`), it returns an error.

[Enqueue first step](http://dpdk.org/doc/guides/_images/ring-enqueue1.svg)

##### 4.5.1.2 Enqueue Second Step

The second step is to modify `ring->prod_head` in ring structure to point to the same location as `prod_next`.

A pointer to the added object is copied in the ring (obj4).

[Enqueue second step](http://dpdk.org/doc/guides/_images/ring-enqueue2.svg)

##### 4.5.1.3 Enqueue Last Step

Once the object is added in the ring, `ring->prod_tail` in the ring structure is modified to point to the same location as `ring->prod_head`. The enqueue operation is finished.

[Enqueue last step](http://dpdk.org/doc/guides/_images/ring-enqueue3.svg)

#### Single Consumer Dequeue

This section explains what occurs when a consumer dequeues an object from the ring. In this example, only the consumer head and tail (cons_head and cons_tail) are modified and there is only one consumer.

The initial state is to have a `cons_head` and `cons_tail`  pointing at the same location.

##### 4.5.2.1 Dequeue First Step

First, `ring->cons_head` and `ring->prod_tail` are copied in local variables. The `cons_next` local variable points to the next element of the table, or several elements after in the case of bulk dequeue.

If there are not enough objects in the ring (this is detected by checking `prod_tail`), it returns an error.

[Dequeue last step](http://dpdk.org/doc/guides/_images/ring-dequeue1.svg)

##### 4.5.2.2 Dequeue Second Step


The second step is to modify `ring->cons_head` in the ring structure to point to the same location as `cons_next`.

The pointer to the dequeued object (obj1) is copied in the pointer given by the user.

[Dequeue second step](http://dpdk.org/doc/guides/_images/ring-dequeue2.svg)

##### 4.5.2.3 Dequeue Last Step

Finally, `ring->cons_tail` in the ring structure is modified to point to the same location as `ring->cons_head`. The dequeue operation is finished.

[Dequeue last step](http://dpdk.org/doc/guides/_images/ring-dequeue3.svg)

#### 4.5.3 Multiple Producers Enqueue

This section explains what occurs when two producers concurrently add an object to the ring. In this example, only the producer head and tail (`prod_head` and `prod_tail`) are modified.

The initial state is to have a `prod_head` and `prod_tail` pointing at the same location.

##### 4.5.3.1 Multiple Consumer Enqueue First Step

On both cores, `ring->prod_head` and `ring->cons_tail` are copied in local variables. `The prod_next` local variable points to the next element of the table, or several elements after in the case of bulk enqueue.

If there is not enough room in the ring (this is detected by checking `cons_tail`), it returns an error.

[Multiple consumer enqueue first step](http://dpdk.org/doc/guides/_images/ring-mp-enqueue1.svg)

##### 4.5.3.2 Multiple Consumer Enqueue Second Step

The second step is to modify `ring->prod_head` in the ring structure to point to the same location as `prod_next`. This operation is done using a `Compare And Swap (CAS)` instruction, which does the following operations atomically:

- If `ring->prod_head` is different to local variable `prod_head`, the CAS operation fails, and the code restarts at first step.
- Otherwise, `ring->prod_head` is set to local `prod_next`, the CAS operation is successful, and processing continues.

In the figure, the operation succeeded on core 1, and step one restarted on core 2.

[ Multiple consumer enqueue second step](http://dpdk.org/doc/guides/_images/ring-mp-enqueue2.svg)

##### 4.5.3.3. Multiple Consumer Enqueue Third Step

The CAS operation is retried on core 2 with success.

The core 1 updates one element of the ring(obj4), and the core 2 updates another one (obj5).

[Multiple consumer enqueue third step](http://dpdk.org/doc/guides/_images/ring-mp-enqueue3.svg)

##### 4.5.3.4 Multiple Consumer Enqueue Fourth Step

Each core now wants to update `ring->prod_tail`. A core can only update it if `ring->prod_tail` is equal to the `prod_head` local variable. This is only true on core 1. The operation is finished on core 1.

[Multiple consumer enqueue fourth step](http://dpdk.org/doc/guides/_images/ring-mp-enqueue4.svg)


##### 4.5.3.5 Multiple Consumer Enqueue Last Step

Once `ring->prod_tail` is updated by core 1, core 2 is allowed to update it too. The operation is also finished on core 2.

[Multiple consumer enqueue last step](http://dpdk.org/doc/guides/_images/ring-mp-enqueue5.svg)

#### 4.5.4 Modulo 32-bit Indexes

In the preceding figures, the `prod_head`, `prod_tail`, `cons_head` and `cons_tail` indexes are represented by arrows. In the actual implementation, these values are not between 0 and size(ring)-1 as would be assumed. The indexes are between 0 and 2^32 -1, and we mask their value when we access the pointer table (the ring itself). 32-bit modulo also implies that operations on indexes (such as, add/subtract) will automatically do 2^32 modulo if the result overflows the 32-bit number range.

The following are two examples that help to explain how indexes are used in a ring.

> To simplify the explanation, operations with modulo 16-bit are used instead of modulo 32-bit. In addition, the four indexes are defined as unsigned 16-bit integers, as opposed to unsigned 32-bit integers in the more realistic case.

[ Modulo 32-bit indexes - Example 1](http://dpdk.org/doc/guides/_images/ring-modulo1.svg)

This ring contains 11000 entries.

[ Modulo 32-bit indexes - Example 2](http://dpdk.org/doc/guides/_images/ring-modulo2.svg)

This ring contains 12536 entries.

> For ease of understanding, we use modulo 65536 operations in the above examples. In real execution cases, this is redundant for low efficiency, but is done automatically when the result overflows.

The code always maintains a distance between producer and consumer between 0 and size(ring)-1. Thanks to this property, we can do subtractions between 2 index values in a modulo-32bit base: that’s why the overflow of the indexes is not a problem.

At any time, entries and free_entries are between 0 and size(ring)-1, even if only the first term of subtraction has overflowed:

```
uint32_t entries = (prod_tail - cons_head);
uint32_t free_entries = (mask + cons_tail -prod_head);
```
