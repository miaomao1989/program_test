# 类和数据抽象
设计良好的类类型可以像内置类型一样容易使用。

类定义了数据成员和函数成员：数据成员用于存储该类类型的对象关联的状态，而函数成员则负责执行赋予数据意义的操作。通过类我们能够将实现和接口分离，用接口指定类所支持的操作，而实现的细节只需类的实现者了解或者关心。这种分离可以减少使编程冗长乏味和容易出错的那些繁琐的工作。

类类型常被称为`抽象数据类型`。抽象数据类型将数据（即状态）和作用于状态的操作视为一个单元。抽象数据类型是面向对象编程和泛型编程的基础。

`C++`中的类能够控制在初始化，复制，赋值和销毁对象时发生的操作。在此方面，`C++`不同于许多其他语言，它们大多数没有赋予类设计者控制这些操作的能力。

# 类

## 12.1 类的定义和声明
```
class Sales_item {
public:
  // operations on Sales_item objects
  double avg_price() const;
  bool same_isbn(const Sales_item &rhs) const
  { return isbn == rhs.isbn;}

  // default constructor needed to initialize members of built-in type
  Sales_item(): units_sold(0), revenue(0.0) { }

private:
  std::string isbn;
  unsigned units_sold;
  double revenue;
};

double Sales_item::avg_price() const
{
  if (units_sold)
    return revenue/units_sold;
  else
    return 0;
}
```

> 简单来说，类就是定义了一个新的类型和一个新的作用域

1. 类成员

每个类可以没有成员，也可以定义多个成员，成员可以是数据/函数或类型别名。
一个类科一包含若干个公有的，私有的和受保护的部分。在`public`部分定义的成员可以被使用该类型的所有代码访问；在`private`部分定义的成员可被其他的 类成员 访问（注意是同一个类的其他类成员）。

所有成员必须在类的内部声明，一旦类定义完成后，就没有任何方式可以增加成员了。

2. 构造函数
创建一个类类型的对象时，编译器会自动使用构造函数来初始化该对象。构造函数是一个特殊的，与类型同名的成员函数，用于给每个数据成员设置适当的初始值。

```
// default constructor needed to initialize members of built-in type
Sales_item(): units_sold(0), revenue(0.0) { }
```
构造函数初始化列表由成员名和带括号的初始值组成，跟在构造函数的形参列表之后，并以冒号开头。

3. 成员函数
在类内部，声明成员函数是必须的，而定义成员函数则是可选的。在类内部定义的函数默认为`inline`。
在类外部定义的成员函数必须指明它们是在类的作用域中。`Sales_item::avg_price`的定义使用作用域操作符来指明这是`Sales_item`类中`avg_price`函数的定义。

成员函数有一个附加的隐含实参，将函数绑定到调用函数的对象--我们编写下面的函数时：
`trans.avg_price()`就是在调用名为`trans`的对象的`avg_price`函数。如果`trans`是一个`Sales_item`对象，则在`avg_price`函数内部对`Sales_item`类成员的引用就是对`trans`成员的引用。

将关键字`const`加在形参表之后，就可以将成员函数声明为常量：
```
double avg_price() const;
```
`const`成员不能改变其所操作的对象的数据成员。**`const`必须同时出现在声明和定义中，若只出现在其中一处，就会出现一个编译时错误**。

#### 12.1.2 数据抽象和封装

类背后蕴含的基本意思是**数据抽象**和**封装**.

数据抽象是一种依赖于接口和实现分离的编程（和设计）技术。类设计者必须关心类是如何实现的，但使用类的程序员不必了解这些细节。相反，使用一个类型的程序员仅需要了解类型的接口，它们可以抽象地考虑该类型做什么，而不比具体地考虑该类型如何做工作。

封装是一项将低层次的元素组合起来形成新的/高层次实体的技术。函数是封装的一种形式：函数所执行的细节行为被封装在函数本身这个更大的实体中。被封装的元素影藏了它们实现的细节--可以调用一个函数但不能访问它所执行的语句。同样的，类也是一个封装的实体：它代表了若干成员的聚集，大多数（设计良好的）类类型影藏了实现该类型的成员。

标准库类型`vector`同时具备数据抽象和封装的特性。在使用方面它是抽象的，只需要考虑它的借口，即她能执行的操作。它又是封装的，因为我们既无法了解该类型如何表示的细节，也无法访问其任意的实现制品。另一方面，数组在概念上类似于`vector`，但它既不时抽象的，也不是封装的。刻意通过访问数组的内存来直接操纵数组。

1. 访问标号实施抽象和封装

可以在任意的访问标号出现之前定义类成员。在类的左花括号之后，第一个访问标号之前定义成员的访问级别，其值依赖于类是如何定义的。如果类是用`struct`关键字定义的，则在第一个访问标号之前的成员是公有的；如果类是用`class`关键字定义的，则这些成员是私有的。

2. 编程角色的不同类别
成功的应用程序的创建者会很好地理解和实现用户的需求。同样的，良好设计的，实用的类，其设计也要贴近类用户的需求。

另一方面，类的设计者与实现者之间的区别，也反映了应用程序的用户和与设计和实现者之间的区别。用户只关心应用程序能否以合理的费用满足他们的需求。同样地，类的使用者只关心它的接口。好的类设计者会定义直观和易用的类接口，而使用者只关心类中影响他们使用的那部分的实现。如果类的实现速度太慢或者给类的使用者加上复旦，则必然引起使用者的关注。在良好设计的类中，只有类的设计者会关心实现。

在简单的应用程序中，类的使用者和设计者也许是同一个人。即使在这种情况下，保持角色的区分也是有益的。**设计类的接口时，设计者应该考虑的是如何方便类的使用；使用类的时候，设计者就不应该考虑类如何工作。**

> 注意， `C++`程序员经常会将应用程序的用户和类的使用着都成为“用户”


> 关键概念：数据抽象和封装的好处
> 数据抽象和封装提供了两个重要的优点：
> - 避免类内部出现无意的/可能破外对象状态的用户级错误；
> - 随时间的推移科一根据需求改变或缺陷（bug）报告来完善类的实现，而无须改变用户级代码
> 仅在类的私有部分定义数据成员，类的设计者就可以自由地修改数据。如果实现改变了，那么只需检查类的代码来了解此变化可能曹成的影响。如果数据为公有的，则任何直接访问原有数据成员的函数都可能遭到破外。在程序可重新使用之前，有必要定位和重写依赖原有表示的那部分代码。
> 同样地，如果类的内部状态是私有的，则数据成员你的改变只能在有限的地方发生。避免数据中出现用户可能引入的错误。如果有缺陷会破外对象的状态，就在局部位置搜索缺陷：如果数据是私有的，那么只有成员函数可能对该错误负责。对错误的搜寻是有限的，从而大大方便了程序的维护和修正；
> 如果数据是私有的并且没有改变成员函数的接口，则操纵类对象的用户函数无须改变。

_改变头文件中的类定义可有效地改变包含该头文件的每个源文件的程序文本，所以，当类发生改变时候，使用该类的代码必须重新编译_

#### 12.1.3 关于类定义的更多内容

1. 同一类型的多个数据成员
2. 使用类型别名来简化类

```
class Screen {
public:
  // interface member functions
  typedef std::string::size_type index;
private:
  std::string contents;
  index cursor;
  index height, width;
};
```
类所定义的类型名遵循任何其他成员的标准访问控制。将`index`的定义放在类的`public`部分，是因为希望用户使用这个名字。`Screen`类的使用者不必了解用`string`实现的底层细节。定义`index`来影藏`Screen`的实现细节。将这个类型设为`public`，就允许用户使用这个名字。
3. 成员函数可被重载
这些类之所以简单，另一个方面也是因为它们只定义了几个成员函数。特别的，这些类都不需要定义其任意成员函数的重载版本。然而，像非成员函数一样，成员函数也可以被重载。
重载操作符有特殊的规则，是个例外，成员函数只能重载本类的其他成员函数。类的成员函数与普通的非成员函数以及在其他类中声明的成员函数不相关，也不能重载它们。重载的成员函数和普通函数应用相同的规则：两个重载成员的形参数量和类型不能完全相同。调用非成员重载函数所用到的函数匹配过程也应用与重载成员函数的调用。
4. 定义重载成员函数
```
class Screen {
public:
  typedef std::string::size_type index;
  // return character at the cursor or at a given position
  char get() const { return contents[cursor]; }
  char get(index ht, index wd) const;
  // remaining members
private:
  std::string contents;
  index cursor;
  index height, width;
};

Screen myscreen;
char ch = myscreen.get();     // calls Screen::get()
ch = myscreen.get(0,0);       // calls Screen::get(index, index)
```

5. 显式指定`inline`成员函数
在**类内部定义**的成员函数，例如不接受实参的`get`成员，将自动作为`inline`处理。也就是说，当他们被调用时，编译器将试图在同一行内拓展该函数。也可以显式地将成员函数声明为`inline`：
```
class Screen{
public:
  typedef std::string::size_type index;
  //implicitly inline when defined inside the class declaration
  char get() const { return contents[cursor]; }
  // explicitly declares as inline; will be defined outside the class declaration
  inline char get(index ht, index wd) const;

  // inline not specified in class declaration, but can be defined inline later
  index get_cursor() const;
  // ...
};

// inline declared in the class declaration; no need to repeat on the definition
char Screen::get(index r, index c)const
{
  index row = r * width;            // compute the row location
  return contents[row + c];         // offset by c to fetch specified character
}

// not declared as inline in the class declaration, but ok to make inline in definition
inline Screen::index Screen::get_cursor() const
{
  return cursor;
}
```
可以在类定义体内部指定一个成员为`inline`，作为其声明的一部分。或者，也科一在类定义替外部的函数定义上指定`inline`。在声明和定义出指定`inline`都是合法的。在类的外部定义`inline`的一个好处是使得类比较容易阅读

> 像其他`inline`一样，`inline`成员函数的定义必须在调用该函数的每个源文件中都是课件的。**不在类定义体内定义的`inline`成员函数，其定义通常应该放在有类定义的同一头文件中**。

#### 12.1.4 类声明与类定义
将类定义放在头文件中，科一保证在每个使用类的文件中以同样的方式定义类。使用头文件保护符（header guard），来保证即使头文件在同一文件中被包含多次，类定义也只出现一次。
可以声明一个类而不定义它：
```
class Screen;     // declaration of the Screen class
```
这个声明，有时成为**前向声明**，在程序中引入了类类型的`Screen`。在声明之后，定义之前，类`Screen`是一个不完全类型，即已知`Screen`是一个类型，但不知道它包含了哪些成员

> 不完全类型只能以有限方式使用。不能定义该类型的对象。不完全类型只能用于定义指向该类型的指针及引用，或者用于声明（而不是定义）使用该类型使用该类型作为形参类型或返回类型的函数。

在创建类的对象之前，必须完整地定义该类。这样，编译器就会给该类的对象预定相应的存储空间。同样地，在使用引用或指针访问类的成员之前，必须已经定义类。

因为只有当类定义体完成后才能定义类，因此类不能具有自身类型的数据成员。然而，只要类名一出现就可以认为该类已经声明。因此，类的数据成员可以是指向自身类型的指针或引用：
```
class LinkScreen {
  Screen window;
  LinkScreen *next;
  LinkScreen *prev;
};
```
> 类的前向声明一般用来编写相互依赖的类。在`13.4`节中，我们将看到这种用法的一个例子

类声明由关键字`class`和类名字构成，类定义关键字`class`，类名字以及由一对花括号扩朱的类定义体构成。

类声明给出了一个不完全类型，只能用于定义指向该类型的指针及引用，或者用于声明使用该类型作为形参类型或返回值类型的函数。例

如果要创建类的对象以及使用引用或者指针访问类的成员，必须事先给出类的定义，否则，编译器无法确定应该分配多少内存。

#### 12.1.5 类对象

```
class Sales_item {
public:
  // operations on Sales_item objects

private:
  std::string isbn;
  unsigned units_sold;
  double revenue;
};
```
定义了一个新的类型，但没有进行存储分配。当我们定义了一个对象：
`Sales_item item;`
时，编译器分配了足以容纳一个`Sales_item`对象的存储空间。`item`指的就是那个存储空间。每个对象具有自己的类数据成员的副本。修改`item`的数据成员不会改变任何其他`Sales_item`对象的数据成员。

1. 定义类类型的对象
定义了一个类类型之后，可以按一下两种方式使用：
- 将类的名字直接用作类型名；
- 指定关键字`class`或`struct`，后面跟着类的名字：
```
Sales_item item1;                   // default initialized object of type Sales_item
class Sales_item item1;             // equivalent definition of item1
```
这两种类类型的方法是等价的。第二种方法是从`C`继承而来的，在`C++`中仍然有效。第一种更为简练，由`C++`语言引入，是得类类型更加容易使用。

2. 为什么类的定义以分号结束

```
class Sales_item {/* ... */ };
class Sales_item {/* ... */ } accum, trans;
```

> 通常，将对象定义成类定义的一部分是个坏主意。这样做，会使所发生的操作难以理解。对读者而言，将两个不同的实体（类和变量）组合在一个语句中，也会令人迷惑不解。

### 12.2 隐含的`this`指针
成员函数具有一个附加的隐含形参，即指向该类对象的一个指针。这个隐含形参命名为`this`，与调用成员函数的对象绑定在一起。成员函数不能定义`this`形参，而是由编译器隐含地定义。成员函数的函数体可以显式使用`this`指针，但不是必须这么做。如果对类成员的引用没有限定，编译器会将这种引用处理成通过`this`指针的引用。

1. 何时使用`this`指针
尽管在成员函数内部显式引用`this`通常是不必要的，但有一种情况下必须这样做：**当我们需要将一个对象作为整体引用而不是引用对象的一个成员时**。最常见的情况是在这样的函数中使用`this`：该函数返回对调用该函数的对象的引用。

理想情况下，希望用户能够将这些操作序列连接成一个单独的表达式：
```
// move cursor to given position, and set that character
myScreen.move(4,0).set('#');
```

2. 返回`*this`

在单个表达式中调用`move`和`set`操作时，每个操作必须返回一个引用，该引用指向执行操作的那个对象：

```
class Screen {
public:
  // interface member functions
  Screen & move(index r, index c);
  Screen & set(char);
  Screen & set(index, index, char);
  // other members as before
};
```
注意，这些函数的返回类型是`Screen &`，指明该成员函数返回对其自身类类型的对象的引用。每个函数否返回调用自己的那个对象。使用`this`指针来访问该对象。
```
Screen & Screen::set(char c)
{
  contents[cursor] = c;
  return *this;
}

Screen & Screen::move(index r, index c)
{
  index row = r *width;     // row location
  cursor = row + c;
  return *this;
}
```

3. 从`const`成员函数返回`*this`

在普通的非`const`成员函数中，`this`的类型是一个指向类类型的`const`指针。可以改变`this`指针所指向的值，但不能改变`this`所保存的地址。在`const`成员函数中，`this`的类型是一个指向`const`类类型对象的`const`指针。既不能改变`this`所指向的对象，也不能改变`this`所保存的地址。

> 不能从`const`成员函数返回指向类对象的普通引用。`const`成员函数只能返回`*this`作为一个`const`引用。

4. 基于`const`的重载
为了解决这个问题，我们必须定义两个`display`操作：一个是`const`，另一个不是`const`。基于成员函数是否为`const`，可以重载一个成员函数；同样地，基于一个指针形参是否指向`const`，可以重载一个函数。`const`对象只能使用`const`成员。非`const`对象可以使用任意成员，但非`const`版本是一个更好的匹配。

在此，我们将定义一个名为`do_display`的`private`成员来打印`Screen`。每个`display`操作都将调用此函数，然后返回调用自己的那个对象：

```
class Screen {
public:
  // interface member functions
  // display overloaded on whether the object is const or not
  Screen & display(std::ostream &os)
  { do_display(os); return *this; }

  const Screen & display(std::ostream &os) const
  { do_display(os); return *this; }

private:
  // single function to do the work of displaying a Screen
  // will be called by the display operations
  void do_display(std::ostream &os) const
  { os << contents; }

  // as before
};
```

5. 可变数据成员

有时（但不是很经常），我们希望类的数据成员（甚至在`const`成员函数内）可以修改。这可以通过他们声明为`mutable`来实现。

**可变数据成员** 永远都不能为`const`，甚至当它是`const`对象的成员时也如此。因此，`const`成员函数可以改变`mutable`成员。要将数据成员声明为可变的，必须将关键字`mutable`放在成员声明之前：

```
class Screen {
public:
  // interface member functions
private:
  mutable size_t access_ctr;      // may change in a const members
  // other data members as before
};
```

```
<<<<<<< HEAD
void Screen::do_display(std::ostream &os) const
{
  ++access_ctr;
  os << contents;
}
=======
void
>>>>>>> origin/master
```

### 12.3 类作用域

> 即使两个类具有完全相同的成员列表，它们也是不同的类型。每个类的成员不同于任何其他类（或任何其他作用域）的成员。

```
// Note: This code is for illustration purposes only and reflects bad practise
// It is a bad idea to use the same name for a parameter and a member
int height;
class Screen {
public:
  void dummy_fcn(index height) {
    cursor = width * height;    // which height ? The parameter
  }

private:
  index cursor;
  index height, width;
};

```


> 尽管类的成员被屏蔽了，但仍然可以通过类名来限定成员或显式使用`this`指针来使用它。


如果我们向覆盖常规的查找规则，应该这样做：

```
// bad practise: Names local to member functions shouldn't hide member Names
void dummy_fcn(index height) {
  cursor = width * this->height;        // member height
  // alternative way to indicate the member
  cursor = width * Screen::height;      // member height
}
```

> 尽管全局对象被屏蔽了，但通过全局作用域确定操作符来限定名字，仍然可以使用它。

```
// bad practise: Don't hide names that are needed from surrounding scopes
void dummy_fcn(index height) {
  cursor = width * ::height;      // which height ? The global one
}
```


### 12.4 构造函数
**构造函数是特殊的成员函数，只要创建类类型的新对象，都要执行构造函数**。构造函数的工作是保证每个对象的数据成员具有合适的初始值。

```
class Sales_item {
public:
  // operations on Sales_item object
  // default constructor needed to initialize members of built-in type
  Sales_item(): units_sold(0), revenue(0.0){ }
private:
  std::string isbn;
  unsigned units_sold;
  double revenue;
}
```

这个构造函数使用构造函数初始化列表类初始化`units_sold`和`revenue`成员。`isbn`成员由`string`的默认构造函数隐式初始化为空。
**构造函数的名字与类的名字相同，并且不能指定返回类型。像其他任何函数一样，它们可以没有形参，也可以定义多个形参。**

1. 构造函数可以被重载

可以为一个类声明的构造函数的数量没有限制，只要每个构造函数的形参表是唯一的。

```
class Sales_item {
//other members as before
public:
  // added constructor to initialize from a string or an istream
  Sales_item(const std::string &);
  Sales_item(std::istream &);
  Sales_item();
};
```

2. 实参决定使用哪个构造函数
3. 构造函数自动执行

只要创建该类型的一个对象，编译器就运行一个构造函数：
```
// constructor that takes a string used to create and initialize variable
Sales_item Primer_2nd_ed("0201548488");
// default constructor used to initialize unnamed object on the heap
Sales_item *p = new Sales_item();
```

2. 实参决定使用哪个构造函数
3. 构造函数自动执行

只要创建该类型的一个对象，编译器就运行一个构造函数：
```
// constructor that takes a string used to create and initialize variable
Sales_item Primer_2nd_ed("0201548488");
// default constructor used to initialize unnamed object on the heap
Sales_item *p = new Sales_item();
```

4. 用于`const`对象的构造函数

构造函数不能声明为`const`：
```
class Sales_item {
public:
  Sales_item() const;   // error
}
```
`const`构造函数是不必要的。创建类类型的`const`对象时，运行一个普通构造函数来初始化该`const`对象。构造函数的工作是初始化对象，不管对象是否为`const`，都用一个构造函数来初始化该对象。

```
class NoName {
public:
  // constructor go here ...
  NoName() {}
  // NoName(std::string *pstr, int iv, double dv): pstring(pstr), ival(iv), dval(dv) { }
  NoName(std::string *pstr, int iv, double dv)
  {
    pstring = pstr;
    ival = iv;
    dval = dv;
  }

private:
  std::string *pstring;
  int       ival;
  double    dval;
};

```

#### 12.4.1 构造函数初始化式

与其他任何函数一样，构造函数具有名字/形参表和函数体。与其他函数不同的是，构造函数也科一包含一个构造函数初始化列表：

```
// recommended way to write constructors using a constructor initializer
Sales_item::Sales_item(const string &book): isbn(book), units_sold(0), revenue(0.0) { }
```

> 构造函数初始化列表是许多相当有经验的`C++`程序员都没有掌握的一个特性。

从概念上来讲，可以认为构造函数 分两个阶段进行：（1）初始化阶段；（2）普通的计算阶段。计算阶段由构造函数函数体中的所有语句组成。

> 不管成员是否在构造函数初始化列表中显式初始化，类类型的数据成员总是在初始化阶段初始化。初始化发生在计算阶段开始之前。

在狗仔函数初始化列表中没有显式提及的每个成员，使用与初始化变量相同的规则来进行初始化。运行该类型的默认构造函数，来初始化类类型的数据成员。内置或符合类型的成员初始值依赖于对象的作用域：在局部作用域中这些成员不被初始化，而在全局作用域中他们被初始化为0.

1. 有时需要构造函数初始化列表

> 有些成员必须在构造函数初始化列表中进行初始化。对于这样的成员，在构造函数函数体中对它们赋值不起作用。**没有默认构造函数的类类型成员，以及`const`或引用类型的成员**，不管是哪种类型，都必须在构造函数初始化列表中进行初始化。

因为内置类型的成员不进行隐式初始化，所以对这些成员是进行初始化还是赋值似乎都无关紧要。除了两个例外，对非类类型的数据成员进行赋值或使用初始化式在结果和性能上都是等价的。

```
class ConstRef {
public:
  ConstRef(int ii);

private:
  int i;
  const int ci;
  int &ri;
};

ConstRef::ConstRef(int ii)
{
  i = ii;     // ok
  ci = ii;    // error: cannot assign to a const
  ri = i;     // assigns to ri which was not bound to an object
}

```

**记住，可以初始化`const`对象或引用类型的对象，但不能对它们赋值。在开始执行构造函数的函数体之前，要完成初始化。初始化`const`或引用类型数据成员的唯一机会是在构造函数初始化列表中。编写该构造函数的正确方式为**

```
//ok: explicitly initialize reference and const members
ConstRef::ConstRef(int ii): i(ii), ci(i), ri(ii) { }
```

> 建议：使用构造函数初始化列表
> 在许多类中，初始化和赋值严格来讲都是低效率的：数据成员可能已经被直接初始化了，还要对它进行初始化和赋值。比效率问题更重要的是：某些数据成员必须要进行初始化，这是一个事实。
> 当类成员需要使用初始化列表时，通过常规地使用构造函数初始化列表，就可以避免发生编译时错误。

_必须对任何`const`或引用类型成员以及没有默认构造函数的类类型的任何成员使用初始化式_

2. 成员初始化的次序

构造函数初始化列表仅指定用于初始化成员的值，并不指定这些初始化执行的次序。成员被初始化的次序就是定义成员的次序。

> 初始化的次序常常无关紧要。然而，如果一个成员是根据其他成员而初始化，则成员初始化的次序是至关重要的。

> 按照与成员声明一致的次序编写构造函数初始化列表是个好主意。此外，尽可能避免使用成员来初始化其他成员。

3. 初始化式可以是任意表达式
一个初始化式可以是任意复杂的表达式。

4. 类类型的数据成员的初始化式
```
// alternative definition for Sales_item default constructor
Sales_item(): isbn(10, '9'), units_sold(0), revenue(0.0) { }
```

```
class NoName {
public:
  NoName() { }
  NoName():name("DemoClass"), ival(0), pd(0), inFile(file) { }

private:
  const string;
  int ival;
  double *pd;
  ifstream &inFile;
};
```

#### 12.4.2 默认实参与构造函数

```
Sales_item(const std::string &book): isbn(book), units_sold(0), revenue(0.0) { }
Sales_item:units_sold(0), revenue(0.0) { }
```

可以通过为`string`初始化式提供一个默认实参将这些构造函数组合起来：

```
class Sales_item {
public:
  // default argument for book is the empty string
Sales_item(const std:::string & book = ""): isbn(book), units_sold(0),  revenue(0.0) { }
Sales_item(std::istream &is);
  // as before
}
```
> 我们更喜欢使用默认实参，因为它减少代码重复。

#### 12.4.3 默认构造函数

1. 合成的默认构造函数

一个类哪怕制定已了一个构造函数，编译器也不会在生成默认构造函数。这条规则的根据是，如果一个类在某种情况下需要控制对象的初始化，则该类很可能在所有情况下都需要控制。

> 只有当一个类没有定义构造函数时，编译器才会自动生成一个构造函数。

> 如果类包含内置或复合类型的成员，则该类不应该依赖于合成的默认构造函数，它应该定义自己的构造函数来初始化这些成员。

此外，每个构造函数应该为每个内置或复合类型的成员提供初始化式。没有初始化内置或复合类型成员的构造函数，将使那些成员处于未定义的状态。除了作为赋值的目标之外，以任何方式使用一个未定义的成员都是错误的。如果每个构造函数将每个成员设置为明确的已知状态，则成员函数可以区分空对象和具有实际值的对象。

2. 类通常应该定义一个默认构造函数


> 实际上，如果定义了其他构造函数，则提供一个默认构造函数几乎总是对的。通常，在默认构造函数中给成员提供的初始值应该指出该对象是“空”的。

3. 使用默认构造函数

初级`C++`程序员经常犯得一个错误是，采用一下方式声明一个默认构造函数初始化对象：
```
// oops! declares a fucntion, not an object
Sales_item myobj();

if(myobj.same_isbn(Primer_3rd_ed))      // error: myobj is a function
```
编译器会指出不能将访问符号用于一个函数！问题在于`myobj`的定义被编译器解释为一个函数的声明，该函数不接受参数并返回一个`Sales_item`类型的对象--与我们的意图大相径庭！**使用默认构造函数顶一个对象的正确方式是去掉后面的空括号**：
```
// ok: defines a class object ...
Sales_item myobj;
```
另一方面，下面这段代码也是正确的：
```
// ok: create an unnamed, empty Sales_item and use to initialize myobj
Sales_item myobj = Sales_item();
```
在这里，我们创建并初始化一个`Sales_item`对象，然后用它
