# CH-9	

标准库还提供了三种容器适配器(adaptor).实际上,适配器是根据原始的容器类型所提供的操作,通过定义新的操作借口,来适应基础的容器类型.顺序容器适配器包括`stack`, `queue`和`priority_queue`类型.

接受容器大小做形参的构造函数只适用于顺序容器,而关联容器不支持这种初始化.

在描述容器时,我们应该留意(如果有的话)每个操作对元素类型的约束.

```python
vector< vector<string> > lines;
```

必须用空格隔开两个相邻的`>`符号,以示这是两个分开的符号,否则,系统会认为`>>`是单个符号,为右移操作符,并结果导致编译时的错误.

9.4
```python
list< deque<int> > lst;
```

9.5
因为iostream类型不支持复制或者赋值.因此不能创建存放IO类型对象的容器.

9.6
```python
list<Foo> foolist(10,0);
```

```python
vector<int>::iterator iter = vec.begin() + vec.size()/2
```

9.9
```python
list<int> ilst;
list<int>::iterator iter1 = ilst.begin(),
					iter2 = ilst.end();
                    
while(iter1 != iter2)
	cout << *(--iter2) << endl;
```

迭代器范围这个概念是标准库的基础.

```python
bool findInt(vector<int>::iterator beg,
			 vector<int>::iterator end, int ival)
{
	while(beg != end)
    	if (*beg == ival)
        	break;
        else
        	++beg;
        if(beg != end)
        	return true;
        else
        	return false;
}
```

关键概念: 容器元素都是副本
在容器中添加新元素时,系统是将元素值复制到容器里.类似的,使用一段元素初始化新容器时,新容器存放的是原始元素的副本. 被复制的原始值与新容器中的元素各不相关,此后,容器内的元素值发生变化时,被复制的原值不回收到影响.

任何`insert`或`push`操作都可能导致迭代器失效. 当编写循环将元素插入到`vector`或`deque`容器中时, 程序必须确保迭代器在每次循环后都得到更新. 在`vector`或`deque`容器中添加元素时,可能会导致某些或全部迭代器失效.假设所有迭代器失效是最安全的做法. **这个建议特别适用于由`end`操作返回的迭代器**. 在容器的任何位置插入任何元素都会使该迭代器失效.

```python
vector<int>::iterator first = v.begin(),
						last = v.end();
                        
//disaster: behavior of this loop is undefined
while(first != last){
	// do some processing
    // insert new value and reassign first, which otherwise would be invalid
    first = v.insert(first, 42)
    ++first;
}
```

不要存储`end`操作返回的迭代器. 添加或删除`deque`或者`vector`容器内的元素都会导致存储的迭代器失效.

```python
//safer: recaculate end on each trip whenever the loop adds/erase elements
while(first != v.end()){
	//do some processing
    first = v.insert(first, 42);		//insert new value
    ++first;
}
```

```python
C++语言只允许两个容器做其元素类型定义的关系运算.
```

容器类型提供`resize`操作来改变容器所包含的元素个数.如果当前的容器长度大于新的长度值,则该容器后部的元素会被删除;如果当前的容器长度小于新的长度值,则系统会在该容器后部添加新元素.

`pop_front`和`pop_back`函数之间的返回值并不是删除的元素值,而是`void`.要获取删除的元素值, 则必须在删除元素之间调用`front`或`back`函数.

如同其他操作一样,`erase`操作也不会检查它的函数.程序员必须确保用作参数的迭代器或迭代器范围是有效的.

```python
string searchValue("Quasimodo");
list<string>::iterator iter = 
	find(slist.begin(), slist.end(), searchValue);
if (iter != slist.end())
	slist.erase(iter);
```

```python
// delete range of elements between two values
list<string>::iterator elem1, elem2;
// elem1 refers to val1
elem1 = find(slist.begin(), slist.end(), val1);
// elem2 refers to the first occurrence val2 after val1
elem2 = find(elem1, slist.end(), val2);
// erase range from val1 up to but not including val2
slist.end()(elem1, elem2);
```

由于`assign`操作首先删除容器中原来存储的所有元素,因此,传递给`assign`函数的迭代器不能指向调用该函数的容器内的元素.

一般而言,使用`list`容器优于`vector`容器.但是,通常出现的反而是一下情况:对于大部分应用,使用`vector`容器是最好的.原因在于,标准库的实现者使用这样的内存分配策略:以最小的代价连续存储数据.由此带来的访问元素的便利弥补了其存储代价.

为了使`vecotr`容器实现快速的存储分配,其实际分配的容量要比当前所需的内存空间多一些.`vector`容器预留了这些额外的存储区,用于存放新添加的元素.于是,不必为每个新元素重新分配容器.

`capacity`操作获取在容器需要分配更多的存储空间之前能够存储的元素总数,而`reserve`操作则告诉`vector`容器应该预留多少个元素的存储空间.

弄清楚容器的`capacity`(容量)与`size`(长度)的区别非常重要.`size`指容器当前拥有的元素个数,而`capacity`则指容器在分配新存储空间之前可以存储的元素总数.

`vector`的每种实现都可以自由地选择自己的内存分配策略. 然而, 他们都必须提供`reserve`和`capacity`函数, 而且必须是到必要时才分配新的内存空间. 分配多少内存空间取决于其实现方式, 不同的库采用不同的策略实现.

元素是否连续存储还会显著地影响:
- 在容器的中间位置添加或删除元素的代价;
- 执行容器元素的随机访问代价;

程序使用这些操作的程度决定了应该选择使用哪种类型的容器. `vector`和`deque`容器提供了对元素的快速随机访问, 但付出的代价是, 在容器的任意位置插入或删除元素, 比在容器胃部插入和删除的开销大. `list`类型在任何位置都能快速插入和删除, 但付出的代价是元素的随机访问开销比较大.

通常来说,除非你找到了选择使用其他容器的更好理由,否则使用`vector`容器都是最佳的选择.
通常来说, 应用中占优势的操作(程序中更多使用的是访问操作还是插入/删除操作)将决定应该选择什么类型的容器.

如果无法确定某种应用应该使用哪种容器, 则编写代码时候尝试只使用`vector`和`list`容器都提供的操作: 使用迭代器,而不是下表,并且避免随机访问元素. 这样编写代码, 在必要时, 可很方便的将程序从使用`vector`容器修改为使用`list`容器.

本质上,适配器是使事物的行为类似于另一事物的行为的一种机制.容器适配器让一种已经存在的容器类型采用另一种个不同的抽象类型的工作方式实现.

所有适配器都定义了两个构造函数: 默认构造函数用于创建空对象,而带一个容器参数的构造函数将容器参数的副本作为其基础值. 例如,假设`deq`是`deq<int>`类型的容器,则可用`deq`初始化一个新的栈,如下所示:

`stack<int> stk(deq);`

默认的`stack`和`queue`都是基于`deque`容器实现的,而`priority_queue`则在`vector`容器上实现. 在创建适配器时,通过将一个顺序容器指定为适配器的第二个类型实参,可覆盖其关联的基础容器类型:

```python
// empty stack implemented on top of vector
stack< string, vector<string> > str_stk;
// str_stk2 is implemented on top of vector and holds a copy of svec
stack < string, vector<string> > str_stk2(svec);
```

对于给定的适配器,其关联的容器必须满足一定的约束条件. `stack`适配器所关联的基础容器可以是任意一种顺序容器类型. 因此`stack`栈可以建立在`vector`, `list`或者`deque`容器之上. 而`queue`适配器要求其关联的基础容器必须提供`push_front`运算,因此只能简历在`list`容器之上,而不能建立在`vector`容器上. `priority_queue`适配器要求提供随机访问的功能,因此可以简历在`vector`或`deque`容器上, 但不能建立在`list`容器上.


所有容器适配器都根据其基础容器类型所支持的操作来定义自己的操作. 默认情况下,栈适配器建立在`deque`容器上,因此采用`deque`提供的操作来实现栈的功能.

`priority_queue`允许用户为队列中存储的元素设置优先级. 这种队列不是直接现将新元素放置在队列胃部,而是放在比它优先级低的元素前面. 标准库默认使用元素类型的`<`操作符来确定它们之间的优先级关系.
