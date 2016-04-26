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

`sort`和`stable_sort`都是重载函数。其中一个版本使用元素类型提供的小于(<)操作符实现比较。在查找重复元素之前，我们就是用这个`sort`版本对元素排序。第二个重载版本带有第三个形参：比较元素所使用的谓词函数的名字。这个谓词函数必须接受两个实参，实参的类型必须与元素类型相同，并返回一个可用做条件检测的值。下面将比较元素的`isShoter`函数作为实参，调用第二个版本的排序函数：

```
// comparison function to be used to sort by word length
bool isShoter(const string &s1, const string &s2)
{
  return s1.size() < s2.size();
}

// determine whether a length of a given word is 6 or more
bool GT6(const string &s)
{
  return s.size() > 6;
}

/ *
  * // sort words by size, but maintain alphabetic order for words of the same size
  *  stable_sort(words.begin(), words.end(), isShoter);
  *
  * vector< string >::size_type wc = count_if(words.begin(), words.end(), GT6);
  */

int main()
{
  vector< string > words;
  // copy contents of each book into a single vector
  string next_word;
  while (cin >> next_word)
    words.push_back(next_word);

  // sort words alphabetically so we can find the duplicates
  sort(words.begin(), words.end());

  / * eliminate duplicate words:
    * unique reorders words so that each word appears once in the
    * front portion of words and returns an iterator one past the unique range;
    * erase use a vector operation to remove the nonunique elements
    */
  vector< string >::iterator end_unique = unique(words.begin(), words.end());
  words.erase(end_unique, words.end());

  // sort words by size, but maintain alphabetic order for words of the same size
  stable_sort(words.begin(), words.end(), isShoter);
  vector< string >::size_type wc = count_if(words.begin(), words.end(), GT6);
  cout << wc << " " << make_plural(wc, "word", "s")
       << " 6 characters or longer" << endl;
  return 0;
}
```

### 11.3 再谈迭代器
11.2.2节已经强调标准库定义的迭代器不依赖于特定的容器。事实上，`C++`还提供了另外三种迭代器：
1. 插入迭代器(insert iterator): 这类迭代器与容器绑定在一起，实现在容器中插入元素的功能；
2. `iostream`迭代器(iostream iterator): 这类迭代器可与输入或输出流绑定在一起，用于迭代遍历所关联的IO流；
3. 反向迭代器(reverse iterator): 这类迭代器实现向后遍历，而不是向前遍历。所有容器类型都定义了自己的`reverse_iterator`类型，由`rbegin`和`rend`成员函数返回；

上述迭代器类型都在`iterator`头文件中定义。

通过插入迭代器赋值时，迭代器将会插入一个新的元素。`C++`提供了三种产褥期，其差别在于插入元素的位置不同。
1. `back_inserter`，创建使用`push_back`实现插入的迭代器；
2. `front_inserter`,使用`push_front`实现插入；
3. `inserter`，使用`insert`实现插入操作。除了所关联的容器外，`inserter`还带有第二个实参：指向插入起始位置的迭代器；

**`front_inserter`需要使用`push_front`**
> 只有当容器提供`push_front`操作时，才能使用`front_inserter`。在`vector`或其他没有`push_front`运算的容器上使用`push_inserter`，将产生错误。
**`inserter`将产生在指定位置实现插入的迭代器**
`inserter`适配器提供更普通的插入形式。这种适配器带有两个实参：所关联的容器和指示起始插入位置的迭代器。

```
// position an iterator into ilst
list< int >::iterator it = find(ilst.begin(), ilst.end(), 42);

// insert replaced copies of ivec at that point in ilst
replace_copy(ivec.begin(), ivec.end(), inserter(ilst, it), 100, 0);
```

首先用`find`定位`ilst`中的某个元素。使用`inserter`作为实参调用`replace_copy`,`inserter`将会在`ilst`中由`find`返回的迭代器所指向的元素前面插入新元素。而调用`replace_copy`的效果是从`ivec`中复制元素，并将其中为100的元素替换为0值。`ilst`的新元素在`it`所表明的元素前面插入。

> 在创建`inserter`时，应指明新元素在何处插入。`inserter`函数总是在它的迭代器实参所表明的位置前面插入新元素。

```
list< int > ilst, ilst2, ilst3;           // empty lists
// after this loop ilst contains: 3 2 1 0
for (list< int >::size_type i = 0; i != 4; ++i)
  ilst.push_front(i);
// after copy ilst2 contains: 0 1 2 3   此处ilst2每次都在ilst2.begin()前面插入
copy(ilst.begin(), ilst.end(), front_inserter(ilst2));
// after copy, ilst3 contains: 3 2 1 0  说白了，此处ilst3.begin()指针没有更新，指向了固定的一块地方
copy(ilst.begin(), ilst.end(), inserter(ilst3, ilst3.begin()));
```

#### 11.3.2 `iostream`迭代器

虽然`iostream`类型不是容器，但标准库同样提供了在`iostream`对象上使用的迭代器：`istream_iterator`用于读取输入流，而`ostream_iterator`则用于写输出流。这些迭代器将它们所对应的流视为特定类型的元素序列。使用流迭代器时，可以用泛型算法从流对象中读取数据（或将数据写到流对象中）。

流迭代器只定义了最基本的迭代器操作：自增/解引用和赋值。此外，可比较两个`istream`迭代器是否相等（或者不相等）。而`ostream`迭代器不提供此运算。

1. 流迭代器的定义

流迭代器都是类模板： 任何已定义输入操作符(`>>`操作符)的类型都可以定义`istream_iterator`。类似的，任何已定义输出操作符(`<<`操作符)的类型也科一定义`ostream_iterator`。

在创建流迭代器时，必须指定迭代器所读写的对象类型：

```
istream_iterator< int > cin_it(cin);        // reads int from cin
istream_iterator< int > ends_of_stream;     // end iterator value

// writes Sales_items from the ofstream named outfile
// each element is followed by a space
ofstream outfile;
ofstream_iterator< Sales_item> output(outfile, " ");
```
`ostream_iterator`对象必须与特定的流绑定到一起。在创建`istream_iterator`时，可直接将它绑定到一个流上。另一种方法是在创建时不提供实参，则该迭代器将指向超出末端的位置。`ostream_iterator`不提供超出末端迭代器。

在创建`ostream_iterator`对象时，可提供第二个(可选的)实参，指定将元素写入输出流使用的分隔符。**分隔符必须是C风格字符串**。因为它是C风格字符串，所以必须以空字符结束；否则，其行为是未定义的。

2. `istream_iterator`对象上的操作

构造与流绑定在一起的`istream_iterator`对象时，将对迭代器定位，以便第一次对该迭代器进行解引用时即可从流中读取第一个值。

```
istream_iterator< int > in_iter(cin);     // read int from cin_it
istream_iterator< int > eof;

// read until end of file, storing what was read in vec
while (in_iter != eof)
  // increment advances the stream to the next value
  // dereference reads next value from the istream
  vec.push_back(*in_iter++);
```

其中`eof`迭代器定义为空的`istream_iterator`对象，用作结束迭代器。绑在流上的迭代器在遇到文件结束或某个错误时，将等于结束迭代器的值。

更有趣的是，可以这样重写程序：
```
istream_iterator< int > in_iter(cin);       // read int from cin
istream_iterator< int > eof;                // istream end iterators
vector< int > vec(in_iter, eof);            // cnstruct vec from an iterator range
```
这里，用一对标记元素范围的迭代器来构造`vec`对象。这些迭代器是`istream_iterator`对象，这就意味着这段范围的元素是通过读取所关联的流来获得的。*这个构造函数的效果是读`cin`，直到到达文件结束或输入的不是`int`型数值为止。读取的元素将用于构造`vec`对象*。

3. `ostream_iterator`对象和`ostream_iterator`对象的使用
可以使用`ostream_iterator`对象将一个值序列写入流中，其操作的过程与使用迭代器将一组值逐个赋给容器中的元素相同：

```
// write one string per line to the standard output
ostream_iterator< string > out_iter(cout, "\n");
// read strings from standard input and the end iterators
istream_iterator< string > in_iter(cin), eof;
// read until eof and write what was read to the standard output
while (in_iter != eof)
    // write value of in_iter to standard output
    // and then increment the iterator to get the next value from cin
    *out_iter++ = *in_iter++;
```

4. 在类类型上使用`istream_iterator`

提供了输入操作符(`>>`)的任何类型都可以创建`istream_iterator`对象。
```
istream_iterator< Sales_item > item_iter(cin), eof;
Sales_item sum;               // initially empty Sales_item
sum = *item_iter++;           // read first transaction into sum and get next record
while (item_iter != eof) {
  if (item_iter->same_isbn(sum))
    sum = sum + *iterm_iter;
  else {
    cout << sum << endl;
    sum = *item_iter;
  }
  ++iterm_iter;             // read next transaction
}
cout << sum << endl;        // remember to print last set of records
```

5. 流迭代器的限制

流迭代器有下面几个重要的限制：
- 不可能从`ostream_iterator`对象读入，也不可能写到`istream_iterator`对象中；
- 一旦给`ostream_iterator`对象赋了一个值，写入就提交了。赋值后，没有办法再改变这个值。此外，`ostream_iterator`对象中每个不同的值都只能正好输出一次；
- `ostream_iterator`没有`->`操作符；

6. 与算法一起使用流迭代器

#### 11.3.3 反向迭代器

所有容器都定义了`begin`和`end`成员，分别返回指向容器首元素和尾元素下一位置的迭代器。容器还定义了`rbegin`和`rend`成员，分别返回指向容器尾元素和首元素前一位置的反向迭代器。与普通迭代器一样，反响迭代器也有常亮`const`和非常量`nonconst`类型。

```
vector< int > vec;
for (vector< int >::size_type i = 0; i != 10; ++i)
  vec.push_back(i);


// reverse interator of vector from back to front
vector< int >:: reverse_iterator r_iter;
for (r_iter = vec.rbegin(); r_iter != vec.rend(); ++r_iter)
  cout << *r_iter << endl;

// sorts vec in "normal" order
sort(vec.begin(), vec.end());

// sorts in reverse; puts smallest element at the end of vec
sort(vec.rbegin(), vec.rend());
```

从一个既支持`--`也支持`++`的迭代器就可以定义方向迭代器，这不用感到吃惊。但是，流迭代器却不然，由于不能反向遍历流，因此流迭代器不能创建反向迭代器。

```
// find first element in a comma-separated list
string::iterator comma = find(line.begin(), line.end(), ',');
cout << string(line.begin(), comma) << endl;


// find last element in a comma-separated list
string::reverse_iterator rcomma = find(line.rbegin(), line.rend(), ',');
// wrong: will generate the word in reverse order
cout << string(line.rbegin(), rcomma) << endl;
```
只需要调用所有反向迭代器类型都提供的成员函数`base`转换`rcomma`即可：
```
// ok : get a forward iterator and read to end of line
cout << string(rcomma.base(), line.end()) << endl;
```

从技术上来说，设计普通迭代器与反向迭代器之间的关系是为了适应左闭合范围这个性质的。

> 反向迭代器用于表示范围，而所表示的范围是不对成的，这个事实可以推导出一个重要的结论：使用普通的迭代器对反响迭代器进行初始化或赋值时，所得到的迭代器并不是指向原迭代器所指向的元素。

`map`/`set`/`list`类型提供双向迭代器，而`string`/`vector`/`deque`容器上定义的迭代器都是随机访问迭代器，用作访问内置数据元素的指针也是随机访问迭代器。`istream_iterator`是输入迭代器，而`ostream_iterator`则是输出迭代器。

> 尽管`map`和`set`类型提供双向迭代器，但关联容器只能使用算法的一个子集。问题在于关联容器的键是`const`对象。因此，关联容器不能使用任何写序列元素的算法。只能使用与关联容器绑在一起的迭代器来提供用于读操作的实参。

_在处理算法时，最好将关联容器上的迭代器视为支持自减运算的输入迭代器，而不是完整的双向迭代器_

对于每一个形参，迭代器必须保证最低功能。将支持更少功能的迭代器传递给函数是错误的；而传递更强功能的迭代器则没有问题。

> 向算法传递无效的迭代器所引起的错误，无法保证会在编译时被捕获到。

1. 输入迭代器：可用于读取容器中的元素，但是不能保证能支持容器的写入操作。输入迭代器必须至少支持下列操作：
  - 相等和不相等操作符（`==`，`！=`），比较两个迭代器；
  - 前置和后置的自增运算（`++`），使迭代器向前递进指向下一个元素；
  - 用于读取元素的解引用操作符（`*`），此操作符只能出现再复制运算的右操作数上；
  - 箭头操作符(`->`)，这是`(*it).member`的同义语，也就是说，对迭代器进行解引用来获取其所关联的对象的成员。
  输入迭代器只能顺序使用，一点输入迭代器自增了，就无法再用它检查之前的元素。要求在这个层次上提供支持的泛型算法包括`find`和`accumulate`。标准库`istream_iterator`类型是输入迭代器。
2. 输出迭代器：可视为与输入迭代器功能互补的迭代器；输出迭代器可用于向容器写入元素，可是不保证能支持读取容器内容，输出迭代器要求：
  - 前置和后置的自增运算（`++`），使迭代器向前递进指向下一个元素；
  - 解引用操作符（`*`），次操作符只能出现在赋值运算的左操作数上。给解引用的输出迭代器复制，将对该迭代器所指向的元素做写入操作；
  输出迭代器科一要求每个迭代器的值必须正好写入一次。使用输出迭代器时，对于指定的迭代器值应该使用一次`*`运算，而且只能使用一次。输出迭代器一般用作算法的第三个实参，标记起始写入的位置。例如，`copy`算法使用一个输出迭代器作为它的第三个实参，将输入范围内的元素复制到输出迭代器指定的位置目标。标准库`ostream_iterator`类型是输出迭代器。
3. 前向迭代器用于读写指定的容器。这类迭代器只会以一个方向遍历序列。前向迭代器支持输入迭代器和输出迭代器提供的所有操作，除此之外，还支持对同一个元素的多次读写。可复制前向迭代器来记录序列中的一个位置，以便将来返回此处。需要前向迭代器的泛型算法包括`replace`。
4. 双向迭代器从两个方向读写容器，除了提供前向迭代器的全部操作之外，双向迭代器还提供前置和后置的自减运算（`--`）。需要使用双向迭代器的繁星算法包括`reverse`。所有标准库容器提供的迭代器都至少达到双向迭代器的要求。
5. 随机访问迭代器提供在常量时间内访问容器任意位置的功能。这种迭代器除了支持双向迭代器的所有功能之外，还支持下面的操作：
  - 关系操作符`<``<=``>`和`>=`，比较两个迭代器的相对位置
  - 迭代器与整形数值`n`之间的加法和减法操作符`+``+=``-`和`-=`，结果是迭代器在容器中向前（或退回）`n` 个元素
  - 两个迭代器之间的减法操作符（`-`），得到两个迭代器间的距离
  - 下标操作符`iter[n]`，这是`*(iter + n)`的同义词
  需要随机访问迭代器的泛型算法包括`sort`算法。`vector`，`deque`和`string`迭代器是随机访问迭代器，用作访问内置数组元素的指针也是随机访问迭代器。

### 11.4 泛型算法的结构

算法最基本的性质是需要使用的迭代器种类。所有算法都指定了它的每个迭代器形参可使用的迭代器类型。如果形参必须为随机访问迭代器，则可提供`vector`或`deque`类型的迭代器，或者提供指向数组的指针。而其他容器的迭代器不能用在这类算法上。

#### 11.4.1 算法的形参模式

任何其他的算法分类都含有一组形参规范。理解这些形参规范有利于学习新的算法--只要指导形参的含义，就可以专注于了解算法实现的操作。大多数算法采用下面四种形式之一：
```
alg (beg, end, other params);
alg (beg, end, dest, other params);
alg (beg, end, beg2, other params);
alg (beg, end, beg2, end2, other params);
```
1. 带有单个目标迭代器的算法
`dest`形参是一个迭代器，用于指定存储输出数据的目标对象。算法假定无论需要写入多少个元素都是安全的。

> 调用这些算法时，必须确保输出容器具有足够大的容量存储输出数据，这正是通常要使用插入迭代器或者`ostream_iterator`来调用这些算法的原因。如果使用容器迭代器调用这些算法，算法将假定容器里有足够多个需要的元素。

2. 带第二个输入序列的算法
有一些算法带有一个`beg2`迭代器形参，或者同时带有`beg2`和`end2`迭代形参，来指定它的第二个输入范围。这类算法通常将联合两个输入范围的元素来完成计算功能。算法同时使用`beg2`和`end2`时，这些迭代器用于标记完整的第二个范围。也就是说，此时，算法完整得指定了两个范围。

> 与写入`dest`算法一样，只带有`beg2`的算法也假定以`beg2`开始的序列与`beg`和`end`标记的序列一样大。

#### 11.4.2 算法的命名规范
标准库使用一组相同的命名和重载规范，了解这些规范有助于更容易地学习标准库。他们包括两种模式：第一种模式包括测试输入范围内元素的算法，第二种模式应用于对输入范围内元素重新排序的算法。

### 11.5 容器特有的算法

> 对于`list`对象，应该优先使用`list`容器特有的成员版本，而不是泛型算法

> 与对应的泛型算法不同，`list`容器特有的操作能添加和删除元素

`list`容器特有的算法与其泛型算法版本之间有两个至关重要的差别。其中一个差别是`remove`和`unique`的`list`版本修改了其关联的基础容器；真正删除了指定的元素。

另一个差别是`list`容器提供的`merge`和`splice`运算会破坏它们的实参。使用`merge`的反省算法版本时，合并的序列将写入目标迭代器指向的对象，而它的两个输入序列保持不变。但是，使用`list`容器的`merge`成员函数时候，则会破坏它的实参`list`对象--当实参对象的元素合并到调用`merge`函数的`list`对象时，实参对象的元素被已出并删除。

## 小结

`C++`标准化过程做出的更重要的贡献是：创建和拓展了标准库。容器和算法库是标准库的基础。标准库定义超过了一百多个算法。

算法与类型无关：它们通常在一个元素序列上操作，这些元素可以存储在标准库容器类/内置数据甚至是生成的序列（例如读写流所生成的序列）上。算法基于迭代器操作，从而实现类型无关性。大多数算法使用一对指定元素范围的迭代器作为其头两个实参。其他的迭代器实参包括指定输出目标的输出迭代器，或者用于指定第二个输入序列的另一个或一对迭代器。

算法从不直接改变它所操纵的序列的大小。(如果算法的实参是插入迭代器，则该迭代器会添加新元素，但算法并不直接这么做)。算法可以从一个位置将元素复制到另一个位置，但不能直接添加或删除元素。
