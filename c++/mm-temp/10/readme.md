# CH-10 关联容器

关联容器和顺序容器的本质差别在于: 关联容器通过键(`key`)存储和读取元素, 而顺序容器则通过元素在容器中的位置顺序存储和访问元素.

虽然关联容器的大部分行为与顺序容器相同,但其独特之处在于支持键的使用.

`set`和`map`类型的对象所包含的元素都具有不同的键, 不允许为同一个键添加第二个元素.如果一个键必须对应多个实例,则需使用`multimap`或`multiset`类型,这两种类型允许多个元素拥有相同的键.

`pair`类型的使用相当繁琐, 因此, 如果需要定义多个相同的`pair`类型对象, 可考虑使用`typedef`简化其声明.

`容器元素根据键的次序排列`这个事实就是一个重要的结论: 在迭代遍历关联容器时,我们可确保按键的顺序访问元素, 而与元素在容器中的存放位置完全无关.

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
