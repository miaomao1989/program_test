# CH-10 关联容器

关联容器和顺序容器的本质差别在于: 关联容器通过键(`key`)存储和读取元素, 而顺序容器则通过元素在容器中的位置顺序存储和访问元素.

虽然关联容器的大部分行为与顺序容器相同,但其独特之处在于支持键的使用.

`set`和`map`类型的对象所包含的元素都具有不同的键, 不允许为同一个键添加第二个元素.如果一个键必须对应多个实例,则需使用`multimap`或`multiset`类型,这两种类型允许多个元素拥有相同的键.

`pair`类型的使用相当繁琐, 因此, 如果需要定义多个相同的`pair`类型对象, 可考虑使用`typedef`简化其声明.

**`容器元素根据键的次序排列`这个事实就是一个重要的结论: 在迭代遍历关联容器时,我们可确保按键的顺序访问元素, 而与元素在容器中的存放位置完全无关.**

*在实际应用中,键类型必须定义`<`操作符, 而且该操作符应该能"正常地工作", 这一点很重要. 对于键类型,唯一的约束就是必须支持`<`操作符, 至于是否支持其他的关系或相关运算,则不做要求.*

*在学习`map`的接时,需谨记`value_type`是`pair`类型, 它的值成员可以修改,但键成员不能修改.*

```
//get an iterator to an element in word_count
map< string, int >::iterator map_it = word_count.begin();
//*map_it is a reference to a pair< const string, int >object
cout << map_it->first;						//prints the key for this element
cout << " " << map_it->second;		// prints the value of the element
map_it->first = "new key";				// error: key is const
++map_it->second;
```
对迭代器进行解引用将获得一个`pair`对象，它的`first`成员存放键，为`const`，而`second`成员则存放值。

使用下标访问`map`与使用下标访问数组或`vector`的行为截然不同: 使用下标访问不存在的元素将导致在`map`容器中添加一个新的元素, 它的键值即为该下标的值.

有别于`vector`或`string`类型，`map`下标操作符返回的类型于对`map`迭代器进行解引用获得的类型不同。`map`迭代器返回的`value_type`类型的值--包含`const key_type`和`mapped_type`类型成员的`pair`对象; 下标操作符则返回一个`mapped_type`类型的值.

对于`map`容器, 如果下标所表示的键在容器中不存在, 则添加新元素, 这一特性可以使程序惊人地简练:
```c
// count number of times each word occurs in the input
map< string, int > word_count;		//empty map from string to int
string word;
while (cin >> word)
	++word_count[word];
```
其中最有趣的是,在单词第一次出现时,会在`word_count`中创建并插入一个以该单词为索引的新元素, 同时将它的值初始化为0, 然后其值立即+1,所以每次在`map`中添加新元素时,所统计的出现此处正好从1开始.

```python
word_count.insert(map<string, int>::value_type("Anna", 1));

word_count.insert(make_pair("Anna", 1));

typedef map<string, int>::value_type valType;
word_count.insert(valType("Anna", 1));
```

```
// count number of times each word occurs in the input
map< string, int > word_count;		// empty map from string to int
string word;
while (cin >> word) {
	// inserts element with key equal to word and value 1
	// if word already in word_count, insert does nothing
	pair< map < string, int > >::iterator, bool > ret = word_count.insert(make_pair(word, 1));
	if (!ret.second)						// word already in word_count
		++ret.first->second;			// increment counter
}
```

使用下标操作的程序更加简洁,更容易编写和阅读, 而`insert`函数的返回值的使用比较复杂. 但使用`insert`函数可以避免使用下标操作带来的副作用, 即避免对新插入元素的不必要的值的初始化, 而且可以显式表示元素的插入(下标操作是隐式表示元素的插入),有其优点.

### 10.3.6 查找并读取`map`中的元素

`map`容器提供了两个操作：`count`和`find`，用于检查某个键是否存在而不会插入该键。

```
int occurs = 0;
if (word_count.count("foobar"))
	occurs.word_count["foobar"];
```
```
int occurs = 0;
map< string, int >::iterator it = word_count.find("foobar");
if ( it != word_count.end())
	occurs = it->second;
```

如果希望当具有指定键的元素存在时, 就获取该元素的引用,否则就不在容器中创建新的元素, 那么应该使用`find`.

这个单词统计程序依据字典顺序输出单词. 在使用迭代器遍历`map`容器时, 迭代器指向的元素按键的升序排列.

### 10.4 `set`类型

<<<<<<< HEAD
`map`容器是键-值对的集合，好比以人名为键的地址和电话号码。相反地，`set`容器只是单纯的键的集合。
`set`不支持下表操作符，而且没有定义`mapped_type类型。在`set`容器中，`value_type`不是`pair`类型，而是与`key_type`相同的类型。他们指的都是`set`中存储的元素类型。这一差别也体现了`set`存储的元素仅仅是键，二没有所关联的值。与`map`一样，`set`容器存储的键也必须唯一，而且不能修改。

```
// define a vector with 20 elements, holding two copies of each number from 0 to 9
vector< int > ivec;
for (vector< int >::size_type i = 0; i != 10; ++i) {
	ivec.push_back(i);
	ivec.push_back(i);			// duplicate copies of each number
}
// iset holds unique elements from ivec
set< int > iset(ivec.begin(), ivec.end());
cout << ivec.size() << endl;					// prints 20
cout << iset.size() << endl;					// prints 10
=======
`set`容器不提供下标操作，为了通过键从`set`中获取元素，可以使用`find`运算。如果只需简单地判断某个元素是否存在，同样可以使用`count`运算，返回`set`中该键对应的元素个数。
正如不能修改`map`中元素的键部分一样，`set`中的键也为`const`。在获得指向`set`中某元素的迭代器之后，只能对其做读操作，而不能做写操作。

```
// set_it refers to the element with key == 1
set< int >::iterator set_it = iset.find(1);
*set_it = 11;										// error: keys in a set are read-only
cout << *set_it << endl;				// ok: can read the key
```

```
void restricted_wc(ifstream &remove_file, map< string, int > &word_count){
	set< string > exclude;				// set to hodl words we'll ignore
	string remove_word;
	while (remove_file >> remove_word)
		excluded.insert(remove_word);

	// read input and keep a count for words that aren't in the exclusion set
	string word;
	while ( cin >> word )
		// increment counter only if the word is not in excluded
		if (!excluded.count(word))
			++word_count[word];
}

```

### 10.5 `multimap`和`multiset`类型

`map`和`set`容器中，一个键只能对应一个实例。而`multiset`和`multimap`类型则允许一个键对应多个实例。例如，在电话簿中，每个人可能有单独的电话号码列表。在作者的文集中，每位作者可能有单独的文章标题列表。`multimap`和`multiset`类型与相应的单元素八本具有相同的头文件定义：分别是`map`和`set`头文件。

`multimap`和`mulset`所支持的操作分别与`map`和`set`的操作相同，只有一个例外： `multimap`不支持下标运算。不能对`multimap`对象使用下标操作，因为在这类容器中，某个键可能对应多个值。为了顺应一个键科一对应多个值这一性质，`map`和`multimap`，或`set`和`multiset`中相同的操作都以不同的方式做出了一定的修改。在使用`multimap`和`multiset`时，对于某个键，必须做好处理多个值的准备，而非只有单一的值。

由于键不要求是唯一的，因此每次调用`insert`总会添加一个元素。例如，可如下定义一个`multimap`容器对象将作者映射到他们所写的书上。这样的映射可为一个作者存储多个条目：
```
// adds first element with key Barth
authors.insert(make_pair(
	string("Barth, John"),
	string("Sot-Weed Factor")
	));

authors.insert(make_pair(
	string("Barth, John"),
	string("Lost in the Funhouse")
	));
```

带有一个键参数的`erase`版本将删除拥有该键的`所有`元素，并返回删除元素的个数。而带有一个或一对迭代器参数的版本只删除指定的元素，并返回`void`类型。

```
multimap< string, string > authors;
string search_item("Kazuo Ishiguro");
// erase all elements with this key; returns number of elements remove_word
multimap< stirng, string >::size_type cnt = authors.erase(search_item);
```

> 迭代遍历`multimap`或`multiset`容器时，科一保证一次返回特定键所关联的所有元素。

```
// author we'll look for
string search_item("Alain de Bottom");
// how many entries are there for this author
typedef multimap< string, string >::size_type sz_type;
sz_type entries = authors.cout(search_item);
// get iterator to the first entry for this author
multimap< string, string >::iterator iter = authors.find(search_item);
// loop through the number of entries there are for this authors
for (sz_type cnt = 0; cnt != entries; ++cnt, ++iter)
	cout << iter->second << endl;			// print each title
```

在同一个键上调用`lower_bound`和`upper_bound`，将产生能够一个迭代器范围，指示出该键所关联的所有元素。如果该键在容器中存在，则会获得两个不同的迭代器：`lower_bound`返回的迭代器指向该键关联的第一个实例；而`upper_bound`返回的迭代器则指向最后一个实例的下一个位置。如果该键不在`multimap`中，这两个操作符将返回同一个迭代器，指向依据元素的排列顺序该键应该插入的位置。

```
// definitions of authors and search_item as above
// beg and denote range of elements for this author
typedef multimap< string, string >::iterator authors_iter;
authors_iter beg = authors.lower_bound(search_item);
authors_iter end = authors.upper_bound(search_item);

//loop through the number of entries there are for this authors_iter
while ( beg != end ) {
	cout << beg->second << endl;			// print each title
	++beg;
}
```

> 这两个操作不会说明键是否存在，其关键之处在于返回值给出了迭代器的范围。

```
// definitions of authors and search_item as above
// pos holds iterators that denote range of elements for this key
typedef multimap< string, string >::iterators authors_iter;
pair< authors_iter, author_iter > pos = authors.equal_range(search_item);

// loop through the number of entries there are for this author
while (pos.first != pos.second){
	cout << pos.first->second << endl;
	++pos.first;
}
```

这个程序段与前面使用`upper_bound`和`lower_bound`的程序基本上是相同的。本程序不用局部变量`beg`和`end`.

**设计程序的一个良好习惯是首先将程序所涉及的操作列出来。明确需要提供的操作有助于建立需要的数据结构和实现这些行为。**
从需求出发，我们的程序需要支持如下任务：
1. 他必须允许用户指明要处理的文件名字。程序将存储该文件的内容，以便输出每个单词所在的原始行；
2. 它必须将每一行分解为各个单词，并记录每个单词所在的所有行。在输出行号时，应该保证以升序输出，并且不重复；
3. 对特定单词的查询将返回出现该单词的所有行的行号；
4. 输出某单词所在的行文本时，程序必须能根据给定的行号从输入文件中获取相应的行；

将这四个任务映射为类的成员函数，则类的借口需要提供一下三个`public`函数：
- `read_file`成员函数，其形参为一个`ifstream &`类型对象。该函数每次从文件中读入一行，并将它保存在`vector`容器中，输入完毕后，`read_file`将创建关联每个单词以及其所在行号的`map`容器。
- `run_query`成员函数，其形参为一个`string`类型对象，返回一个`set`对象，该`set`对象包含出现该`string`对象的所有行的行号；
- `text_line`成员函数，其形参为一个行号，返回输入文本中该行号对应的文本行。

为了实现`read_file`功能，还需要定义两个`private`函数来读取输入文本和创建`map`容器：
- `store_file`函数读入文件，并将文件内容存储在`vector`容器对象中；
- `build_map`函数将每一行分解为各个单词，创建`map`容器对象，同时记录每个单词出现的行号；

#### `TextQuery`类

经过前面的设计之后，现在可以编写`TextQuery`类了：

## 小结

**关联容器的元素按键排序和访问**。关联容器支持通过键高效地查找和读取元素。**键的使用，使关联容器区别于顺序容器**， 顺序容器的元素是根据位置访问的。

`map`和`multimap`类型存储的元素是键-值对，它们使用在`utility`头文件中定义的标准库`pair`类，来表示这些键-值对元素。对`map`或`multimap`迭代器进行解引用将获得`pair`类型的值。`pair`对象的`first`成员是一个`const`键，而`second`成员则是该键所关联的值。`set`和`multiset`类型则专门用于存储键。在`map`和`set`类型中，一个键只能关联一个元素。而`multimap`和`multiset`类型则允许多个元素拥有相同的键。

关联容器共享了顺序容器的许多操作。除此之外，关联容器还定义了一些新的操作，并对某些顺序容器同样提供的操作重新定义了其含义或返回类型，这些操作的差别体现了关联容器中键的使用。

关联容器的元素可以使用迭代器访问。标准库保证迭代器按照键的次序访问元素。`begin`操作将获得拥有最小键的元素，对此迭代器做自增运算则可以按非降序依次访问各个元素。

http://www.cnblogs.com/dyllove98/p/3214898.html
讲的很好
