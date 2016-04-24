# 泛型算法

标准容器定义的操作非常少。标准库没有给容器添加大量的功能函数，而是选择提供一组算法，这些算法大都不依赖特定的容器类型，是“泛型”的，可作用在不同类型的容器和不同类型的元素上。

大多数算法是通过遍历由两个迭代器标记的一段元素来实现其功能。典型情况下，算法在遍历一段元素范围时，操纵其中的每一个元素。算法通过迭代器访问元素，这些迭代器标记了要遍历的元素范围。

```
// call find to look through elements in a list
list< int >::const_iterator result = find(lst.begin(), lst.end(), search_value);

cout << "The value " << search_value
     << (result == lst.end() ? " is not present" ? " is present")
     << endl;
```

类似的，由于指针的行为与作用在内置数组的迭代器一样，因此也可以使用`find`来搜索数组：

```
int ia[6] = {27, 210, 12, 47, 109, 83};
int search_value = 83;
int *result = find(ia, ia+6, search_value);
cout << "The value " << search_value
     << (result == ia+6 ? " is not present" : " is present")
     << endl;
```

这种算法，正如我们前面指出的，与容器的类型无关：在前面的描述中，没有任何内容依赖于容器类型算法。这种算法只在一点上隐式地以来元素类型：必须能够对元素做比较运算。该算法的明确要求如下：
1. 需要某种遍历集合的方式：能够从一个元素向前移到下一个元素；
2. 必须能够知道是否到达了集合的末尾；
3. 必须能够对容器中的每一个元素与被查找的元素进行比较；
4. 需要一个类型来指出元素在容器中的位置，或者表示找不到该元素；

泛型算法用迭代器来解决顶一个要求：遍历容器。
第三个要求--元素值的比较，有两种解决方法。默认情况下，`find`操作要求元素类型定义了相等操作符，算法使用这个操作符比较元素。如果元素类型不支持相等操作符，或者打算用不同的测试方法来比较元素，则可使用第二个版本的。

> 用于制定累加起始值的第三个实参是必要的，因为`accumulate`对将要累加元素的类型一无所知，因此，除此之外，没有别的办法创建合适的初始值或者关联的类型。

```
// sum the elements in vec starting the summation with the value 42
int sum = accumulate(vec.begin(), vec.end(), 42);

// concatenate elements from v and store in sum
string sum = accumulate(v.begin()， v.end(), stirng(""));
```
注意：程序显示的创建了一个`string`对象，用作该函数调用的第三个实参。传递一个字符串字面值，将会导致编译时错误。因为此时，累加和的类型将是`const char *`，而`string`的加法操作符所使用的操作数则分别是`string`和`const char *`类型，加法的结果将是一个`string`对象，而不是`const char *`指针。

`find_first_of`的使用

```
// program for illustration purposes only:
// there are much faster ways to solve this prolem
size_t cnt = 0;
list< string >::iterator it = roster1.begin();
// look in roster1 for any name also in roster2
while ((it = find_first_of(it, roster1.end(),
            roster2.begin(), roster2.end())) != roster1.end())
{
  ++cnt;
  // we got a match, increment it to look in the rest of roster1
  ++it;
}
cout << "Found " << cnt
     << " names on both rosters" << endl;
```

> 有些算法，例如`find_first_of`，带有两对迭代器参数。每对迭代器中，两个实参的类型必须精确匹配，但不要求两对之间的类型匹配。特别是，元素可存储在不同类型的序列中，只要这两个序列的元素可以比较即可。

#### 11.2.2 写容器元素的算法

一些算法写入元素值。在使用这些算法写元素时要当心，必须确保算法所写的序列至少足以存储要写入的元素。
有些算法直接将数据写入到输入序列，另外一些则带有一个额外的迭代器参数指定写入目标。这类算法将目标迭代器用作输出的位置。还有第三种算法将指定数目的元素写入到某个序列。

`fill_n`函数假定对指定数量的元素做写操作是安全的。初学者常犯的错误是：在没有元素的空容器上调用`fill_n`函数（或者类似的写元素的算法）。

> 对指定数目的元素做写入运算，或者写到目标迭代器的算法，都不检查目标的大小是否足以存储要写入的元素是很危险的！。
