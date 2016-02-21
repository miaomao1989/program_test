# Linux等待队列wait_queue_head_t和wait_queue_t

August 18, 2015 7:46 PM

【整理自】http://blog.csdn.net/luoqindong/article/details/17840095

[TOC]

等待队列在Linux内核中有着举足轻重的作用，很多Linux驱动程序或多或少都涉及到了等待队列。因此，对于Linux内核驱动程序来说，掌握等待队列是必须课之一。 Linux内核的等待队列是以双循环链表为基础数据结构。与进程调度机制紧密接合，能够用于实现核心的异步事件通知机制。它有两种数据结构： 等待队列头 `wait_queue_head_t)`和等待队列项 `wait_queue_t`。等待队列头和等待队列项中都包含一个 `list_head` 类型的域作为“连接件”。它通过一个双链表把等待task的头和等待的进程列表链接起来。下面具体介绍。

## 定义

头文件： `/include/linux/wait.h`

```c++
struct __wait_queue_head {
	spinlock_t lock;
	struct list_head task_list;
};
typedef struct __wait_queue_head wait_queue_head_t;
```

## 作用

在内核里面，等待队列是有很多用处的，尤其是在中断处理、进程同步、定时等场合。可以使用等待队列实现阻塞进程的唤醒。它以队列为基础数据结构，与进程调度机制紧密结合，能够用于实现内核中的异步事件通知机制，同步对系统资源的访问等。

## 字段详解

1. spinlock_t lock;
在对`task_list`与操作的过程中，使用该锁实现对等待队列的互斥访问。

2. struct list_head task_list;
双向循环链表，存放等待的进程。

## 操作

### 1. 定义并初始化

(1)
```c++
wait_queue_head_t my_queue;
init_waitqueue_head(&my_queue);
```
直接定义并初始化。`init_waitqueue_head()`函数会将自旋锁初始化为未锁，等待队列初始化为空的双向循环链表。

(2)
```c++
DECLARE_WAIT_QUEUE_HEAD(my_queue);
```
定义并初始化，相当于(1)。

(3)定义等待队列：

```
DECLARE_WAITQUEUE(name,tsk);
```

注意此处是定义一个wait_queue_t类型的变量name，并将其private设置为tsk。wait_queue_t类型定义如下：

```c++
struct __wait_queue {
	unsigned int flags;
#define WQ_FLAG_EXCLUSIVE	0x01
	struct task_struct * task;
	wait_queue_func_t func;
	struct list_head task_list;
};

typedef struct __wait_queue wait_queue_t;
```

其中`flags`域指明该等待的进程是互斥进程还是非互斥进程。其中0是非互斥进程，`WQ_FLAG_EXCLUSIVE(0×01)`是互斥进程。等待队列 `wait_queue_t` 和等待对列头`wait_queue_head_t`的区别是等待队列是等待队列头的成员。也就是说等待队列头的`task_list`域链接的成员就是等待队列类型的`wait_queue_t`。


![wait_queue](http://velep.com/wp-content/uploads/%E7%AD%89%E5%BE%85%E9%98%9F%E5%88%97.jpg)

### 2. (从等待队列头中)添加／移出等待队列：

(1) `add_wait_queue()`函数

```c++
void fastcall add_wait_queue(wait_queue_head_t *q, wait_queue_t *wait)
{
	unsigned long flags;

	wait->flags &= ~WQ_FLAG_EXCLUSIVE;
	spin_lock_irqsave(&q->lock, flags);
	__add_wait_queue(q, wait);
	spin_unlock_irqrestore(&q->lock, flags);
}
EXPORT_SYMBOL(add_wait_queue);
```

设置等待的进程为非互斥进程，并将其添加进等待队列头(q)的队头中:

```c++
void fastcall add_wait_queue_exclusive(wait_queue_head_t *q, wait_queue_t *wait)
{
	unsigned long flags;

	wait->flags |= WQ_FLAG_EXCLUSIVE;
	spin_lock_irqsave(&q->lock, flags);
	__add_wait_queue_tail(q, wait);
	spin_unlock_irqrestore(&q->lock, flags);
}
EXPORT_SYMBOL(add_wait_queue_exclusive);
```

该函数也和add_wait_queue()函数功能基本一样，只不过它是将等待的进程(wait)设置为互斥进程。

(2)`remove_wait_queue()`函数：
```c++
void fastcall remove_wait_queue(wait_queue_head_t *q, wait_queue_t *wait)
{
	unsigned long flags;

	spin_lock_irqsave(&q->lock, flags);
	__remove_wait_queue(q, wait);
	spin_unlock_irqrestore(&q->lock, flags);
}
EXPORT_SYMBOL(remove_wait_queue);
```

### 3. 等待事件

(1) wait_event()宏：

```c++
#define wait_event(wq, condition) 					\
do {									\
	if (condition)	 						\
		break;							\
	__wait_event(wq, condition);					\
} while (0)


#define __wait_event(wq, condition) 					\
do {									\
	DEFINE_WAIT(__wait);						\
									\
	for (;;) {							\
		prepare_to_wait(&wq, &__wait, TASK_UNINTERRUPTIBLE);	\
		if (condition)						\
			break;						\
		schedule();						\
	}								\
	finish_wait(&wq, &__wait);					\
} while (0)
```


(2)`wait_event_interruptible()`函数:

和`wait_event()`的区别是调用该宏在等待的过程中当前进程会被设置为`TASK_INTERRUPTIBLE`状态.在每次被唤醒的时候,首先检查`condition`是否为真,如果为真则返回,否则检查如果进程是被信号唤醒,会返回`-ERESTARTSYS`错误码. 如果是`condition`为真, 则返回0.

(3)`wait_event_timeout()`宏:

也与`wait_event()`类似.不过如果所给的睡眠时间为负数则立即返回.如果在睡眠期间被唤醒,且`condition`为真则返回剩余的睡眠时间,否则继续睡眠直到到达或超过给定的睡眠时间,然后返回0.

(4)`wait_event_interruptible_timeout()`宏:

与`wait_event_timeout()`类似,不过如果在睡眠期间被信号打断则返回`ERESTARTSYS`错误码.

(5)`wait_event_interruptible_exclusive()`宏

同样和`wait_event_interruptible()`一样,不过该睡眠的进程是一个互斥进程.

### 4. 唤醒队列:

(1)wake_up()函数:

```c++
#define wake_up(x)			__wake_up(x, TASK_UNINTERRUPTIBLE | TASK_INTERRUPTIBLE, 1, NULL)

/**
 * __wake_up - wake up threads blocked on a waitqueue.
 * @q: the waitqueue
 * @mode: which threads
 * @nr_exclusive: how many wake-one or wake-many threads to wake up
 */
void fastcall __wake_up(wait_queue_head_t *q, unsigned int mode,
				int nr_exclusive, void *key)
{
	unsigned long flags;

	spin_lock_irqsave(&q->lock, flags);
	__wake_up_common(q, mode, nr_exclusive, 0, key);
	spin_unlock_irqrestore(&q->lock, flags);
}
```

唤醒等待队列. 可唤醒处于`TASK_INTERRUPTIBLE`和`TASK_UNINTERUPTIBLE`状态的进程,和`wait_event/wait_event_timeout`成对使用.

(2)`wake_up_interruptible()`函数:

```c++
#define wake_up_interruptible(x)	__wake_up(x, TASK_INTERRUPTIBLE, 1, NULL)
```

和wake_up()唯一的区别是它只能唤醒TASK_INTERRUPTIBLE状态的进程. 与`wait_event_interruptible/wait_event_interruptible_timeout/ wait_event_interruptible_exclusive`成对使用.

(3)

```c++
#define wake_up_all(x)			__wake_up(x, TASK_UNINTERRUPTIBLE | TASK_INTERRUPTIBLE, 0, NULL)

#define wake_up_interruptible(x)	__wake_up(x, TASK_INTERRUPTIBLE, 1, NULL)

#define wake_up_interruptible_nr(x, nr)	__wake_up(x, TASK_INTERRUPTIBLE, nr, NULL)

```

这些也基本都和`wake_up/wake_up_interruptible`一样.

### 5. 在等待队列上睡眠：

(1) sleep_on()函数:

```c++
void fastcall __sched sleep_on(wait_queue_head_t *q)
{
	SLEEP_ON_VAR

	current->state = TASK_UNINTERRUPTIBLE;

	SLEEP_ON_HEAD
	schedule();
	SLEEP_ON_TAIL
}

EXPORT_SYMBOL(sleep_on);


#define	SLEEP_ON_VAR					\
	unsigned long flags;				\
	wait_queue_t wait;				\
	init_waitqueue_entry(&wait, current);
    
    
#define SLEEP_ON_HEAD					\
	spin_lock_irqsave(&q->lock,flags);		\
	__add_wait_queue(q, &wait);			\
	spin_unlock(&q->lock);

#define	SLEEP_ON_TAIL					\
	spin_lock_irq(&q->lock);			\
	__remove_wait_queue(q, &wait);			\
	spin_unlock_irqrestore(&q->lock, flags);
```

该函数的作用是定义一个等待队列`wait`，并将当前进程添加到等待队列中`wait`，然后将当前进程的状态置为`TASK_UNINTERRUPTIBLE`，并将等待队列`wait`添加到等待队列头`q`中。之后就被挂起直到资源可以获取，才被从等待队列头`q`中唤醒，从等待队列头中移出。在被挂起等待资源期间，该进程不能被信号唤醒。

(2)`sleep_on_timeout()`函数：

```c++
long fastcall __sched sleep_on_timeout(wait_queue_head_t *q, long timeout)
{
	SLEEP_ON_VAR

	current->state = TASK_UNINTERRUPTIBLE;

	SLEEP_ON_HEAD
	timeout = schedule_timeout(timeout);
	SLEEP_ON_TAIL

	return timeout;
}
```

(3)`interruptible_sleep_on()`函数：

```c++
void fastcall __sched interruptible_sleep_on(wait_queue_head_t *q)
{
	SLEEP_ON_VAR

	current->state = TASK_INTERRUPTIBLE;

	SLEEP_ON_HEAD
	schedule();
	SLEEP_ON_TAIL
}
```

该函数和`sleep_on()`函数唯一的区别是将当前进程的状态置为`TASK_INTERRUPTINLE`，这意味在睡眠如果该进程收到信号则会被唤醒。

(4)`interruptible_sleep_on_timeout()`函数：

```c++
long fastcall __sched sleep_on_timeout(wait_queue_head_t *q, long timeout)
{
	SLEEP_ON_VAR

	current->state = TASK_UNINTERRUPTIBLE;

	SLEEP_ON_HEAD
	timeout = schedule_timeout(timeout);
	SLEEP_ON_TAIL

	return timeout;
}
```

类似于`sleep_on_timeout()`函数。进程在睡眠中可能在等待的时间没有到达就被信号打断而被唤醒，也可能是等待的时间到达而被唤醒。


以上四个函数都是让进程在等待队列上睡眠，不过是小有诧异而已。在实际用的过程中，根据需要选择合适的函数使用就是了。例如在对软驱数据的读写中，如果设备没有就绪则调用`sleep_on()`函数睡眠直到数据可读(可写)，在打开串口的时候，如果串口端口处于关闭状态则调用`interruptible_sleep_on()`函数尝试等待其打开。在声卡驱动中，读取声音数据时，如果没有数据可读，就会等待足够常的时间直到可读取。









