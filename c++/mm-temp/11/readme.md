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

`back_insert`生成一个绑定在该容器上的插入迭代器。在试图通过这个迭代器给元素赋值的时候，赋值运算将调用`push_back`在容器中添加一个具有指定值的元素。

```
vector< int > vec;    // empty vector
// ok : back_inserter creates an insert iterator that adds elements to vec
fill_n(back_inserter(vec), 10, 0);      // appends 10 elements to vec
```
现在，`fill_n`函数每写入一个值，都会通过`back_inserter`生成的插入迭代器实现。效果相当于在`vec`上调用`push_back`，在`vec`末尾添加10个元素，每个元素都是`0`。

第三类算法向目标迭代器写入未知个数的元素，正如`fill_n`函数一样，目标迭代器指向存放输出数据的序列的第一个元素。


```
vector< int > ivec;       // empty vector
// copy elements from ilst into ivec
copy(ilst.begin(), ilst.end(), back_inserter(ivec));
```

当然，这个例子的效率比较差：通常，如果要以一个已经存在的容器为副本创建新的容器，更好的方法是直接用输入范围作为新的构造容器的初始化式。
```
// better way to copy elements from ilst
vector< int > ivec(ilst.begin(), ilst.end());
```

有些算法提供所谓的“复制(copying)版本”。这些算法对输入序列的元素做出处理，但不修改原来的元素，而是创建一个新的序列存储元素的处理结果。

```
// replace any element with value of 0 by 42
replace(ilst.begin(), ilst.end(), 0, 42);
```
这个调用将所有值为0的实例替换成42.如果不想改变原来的序列，则调用`replace_copy`。这个算法接受第三个迭代器实参，指定保存调整后序列的目标位置。

```
// create empty vector to hold the replacement
vector< int > ivec;
// use back_inserter to grow destination as needed
replace_copy( ilst.begin(), ilst.end(), back_inserter(ivec), 0 ,42);
```

> 算法不直接修改容器的大小。如果需要添加或删除元素，则必须使用容器操作。

```
// sort word alphabetically so we can find the duplicates
sort(words.begin(), words.end());
/ * eliminate duplicate words:
  * unique reorders words so that each word appears once in the front portion of words and returns an iterator one past the unique range;
  * erase uses a vector opeartion to remove the nonunique elements
  */

vector< string >::iterator end_unique = unique(words.begin(), words.end());
words.erase(end_unique, words.end());
```

`stable_sort`保留相等元素的相对位置。通常，对于已排序的序列，我们并不关心其相等元素的相对位置，毕竟，这些元素是相等的。但是，在这个应用中，我们将“相等”定义为“相同的长度”，有着相同长度的元素还能以字典序的不同而区分。调用`stable_sort`之后，对于长度相同的元素，将保留其字典顺序。
