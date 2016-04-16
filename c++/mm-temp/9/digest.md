# 顺序容器
## 顺序容器的操作

### 容器大小的操作

`resize`操作可能会使得迭代器失效。在`vector`或`deque`容器上做`resize`操作有可能会使所有迭代器都失效。
对于所有的容器类型，如果`resize`操作压缩了容器，则指向已删除的元素的迭代器失效。

### 访问元素

```c
//check that there are elements before dereferencing an iterator
// or calling front or back
if (!ilist.empty()){
  // val and val2 refer to the same element
  list< int >::reference val = *ilist.begin();
  list< int >::reference val2 = ilist.front();

  // last and last2 refer to the same element
  list< int >::reference last = *--ilist.end();
  list< int >::reference last2 = ilist.last();
}
```

> 使用越界下标，或调用空容器的`front`或`back`函数，都会导致程序出现严重的错误。

### 删除元素

> 如同其他操作一样，`erase`操作也不会检查它的参数。程序员必须确保用作参数的迭代器或迭代器范围是有效的。

```c
string searchValue("Quasimodo")
list< string >::iterator iter = find(slist.begin(), slist.end(), searchValue);
if (iter != slist.end())
  slist.earse(iter);
```
### 赋值与`swap`
> 赋值和`assign`操作使做操作术容器的所有迭代器失效。`swap`操作则不会使迭代器失效。完成`swap`操作后，尽管被交换的元素已经存放在另一个容器中，但迭代器任然指向相同的元素。

如果在不同（或相同）类型的容器内，元素类型不相同但是互相兼容，则其赋值元素必须使用`assign`函数。

> 由于`assign`操作首先删除容器中原来存储的所有元素，因此，传递给`assign`函数的迭代器不能指向调用该函数的容器内的元素

> 关于`swap`的一个重要问题在于：该操作不会删除或插入任何元素，而且保证在常亮时间内实现交换。由于容器内没有移动任何元素，因此迭代器不会失效。虽然在`swap`运算之后，这些元素已经被存储在不同的容器中了。

## 9.4 `vector`容器的自增长

为了使`vector`容器实现快速的内存分配，其实际分配的内容要比当前所需的空间多一些。`vector`容器预留了这些额外的存储区，用于存放新添加的元素。于是，不必为每个新元素重新分配容器。

> 弄清楚容器的`capacity`（容量）与`size`（长度）的区别非常重要。`size`指容器当前拥有的元素个数；而`capacity`则指容器在必须分配新存储空间之前可以存储的元素总数。

> `vector`的每种实现都可以自由地选择自己的内存分配策略。然而，它们都必须提供`reserve`和`capacity`函数，而且必须是到必要时才分配新的内存空间。分配了多少内存取决于其实现方式，不同的库采用不同的策略实现。

> `vector`的每种实现都可自由地选择自己的内存分配策略。然而，它们都必须提供`reserve`和`capacity`函数，而且必须是要到必要的时候才能分配新的内存空间。分配多少内存取决于其实现方式。不同的库采用不同的策略实现。

## 容器的选用

元素是否连续存储还会显著影响：
- 在容器的中间位置添加或删除元素的代价；
- 执行容器元素的随机访问的代价；

程序使用这些操作的程度将决定应该选择哪种类型的容器。`vector`和`deque`容器提供了对元素的快速随机访问，但付出的代价是在容器的任意位置插入或删除元素，比在容器尾部插入和删除开销大。`list`类型在任何位置都能够快速插入和删除，但付出的代价是元素的随机访问开销比较大。

`deque`容器拥有更加复杂的数据结构，它同时提供了`list`和`vector`的一些性质：
- 与`vector`容器一样，在`deque`容器的中间插入或者删除元素效率比较低；
- 不同于`vector`容器，`deque`容器提供高效地在其首部实现`insert`和`erase`的操作，就像在容器尾部的胃部一样。
- 与`vector`一样而不同于`list`容器的是，`deque`容器支持对所有元素的随机访问。
- 在`deque`容器的首部或尾部插入元素不会使任何迭代器失效，而在首部或者尾部删除元素则只会使指向被删除元素的迭代器失效。在`deque`容器的任何其他位置插入和删除操作将使指向该容器的所有迭代器都失效。

> 通常来说，除非找到选择使用其他容器的更好的理由，否则`vector`容器都是最佳的选择。

选择容器的提示： ...

如果程序既要随机访问又需要在容器的中间位置插入或删除元素，那应该怎么办呢？
此时，选择何种容器取决于两种操作付出的相对代价：随机访问`list`容器元素的代价，以及在`vector`或`deque`容器中插入/删除元素时复制元素的代价。通常来说，应用中占优的操作（程序中更多使用的是访问操作还是插入/删除操作）将决定应该选择什么类型的容器。

> 如果无法确定某种应用应该采取哪种容器，则编写代码时尝试只使用`vector`和`list`容器都提供的操作：使用迭代器，而不是下标，并且避免随机访问元素。这样编写代码，在必要的时候，可很方便地将程序从`vector`容器切换为使用`list`容器。

## 再谈`string`类型
```
string s("Hiya!");
string::iterator iter = s.begin();
while (iter != s.end())
  cout << *iter++ << endl;    //postfix increment: print old value
```

## 再谈`string`类型

### 9.6.3只适用于`string`类型的操作

`string`类型提供了容器类型不支持的其他几种操作
- `sbustr`函数，返回当前`string`对象的字串；
- `append`和`replace`函数，用于修改`string`对象；
- 一些列`find`函数，用于查找`string`对象

`replace`操作用于删除一段指定范围的字符，然后在删除位置插入一组新字符，等效于调用`erase`和`insert`函数。

> 不要求删除的文本长度与插入的相同。

### 9.6.4 `string`类型的查找操作
`string`类提供了6中查找操作，每种函数以不同形式的`find`命名。这些操作全都返回`string::size_type`类型的值，以下标形式标记查找匹配所发生的位置；或者返回一个名为`string::npos`的特殊值，说明查找没有匹配。`string`类将`npos`定义为保证大于任何有效下标的值。

> `find`操作的返回类型是`string::size_type`，请使用该类型的对象存储`find`的返回值。


```
string::size_type pos = 0;
// each trip reset pos to the next instance in name
while ((pos = name.find_first_of(numberics, pos)) != string::npos) {
  cout << "found number at index: " << pos
  << " element is " << name[pos] << endl;
  ++pos;  //move to the next character
}
```
> `pos`的值必须加1，以确保下一次循环从刚找到的数字后面开始查找下一个数字。

```
string numbers("0123456789");
string dept("03714p3");
// return 5, which is the index to the character 'p'
string::size_type pos = dept.find_first_not_of(numbers);
```

### 9.6.5 `string`对象的比较
