# C++ Primer 4th Edition


## CH7 函数

应该将不需要修改的引用形参定义为const引用。普通的非const引用形参在使用时不太灵活。这样的形参既不能用const对象初始化，也不能用字面值或产生右值的表达式实参初始化。


处理数组的函数通常通过操纵指向数组中的元素的指针来处理数组。

和其他类型一样，数组形参可声明为数组的引用。如果形参是数组的引用，编译器不会将数组实参转化为指针，而是传递数组的引用本身。在这种情况下，数组大小成为形参和实参类型的一部分。编译器将检查实参的大小与形参的大小是否匹配。

在无法列举出传递给函数的所有实参的类型和数目时,可以使用省略符形参.省略符暂停了类型检查机制.

大部分带有省略符形参的函数都利用显式声明的参数中的一些信息,来获取函数调用中提供的其他可选实参的类型和数目.因此带有省略符的第一种形式的函数声明是最常用的.

`void foo(parm_list, ...)`


在返回类型为`void`的函数中,`return`返回语句不是必须的,隐式的`return`发生在函数的最后一个语句完成时.

在含有`return`语句的循环后没有提供`return`语句是很危险的,因为大部分的编译器不能检测出这个漏洞,运行时会出现什么问题是不确定的.

理解返回引用至关重要的一点是:千万不能返回局部变量的引用.当函数执行完毕时,将释放分配给局部对象的存储空间.因此,对局部对象的引用就会指向不确定的内存.

确保返回引用安全的一个好方法是,请自问:这个引用指向哪一个在此前存在的对象?
返回引用的函数返回一个左值.因此,这样的函数可用于任何要求使用左值的地方.

主main函数不能调用自身.

与变量的定义类似,函数的声明也可以和函数的定义分离;一个函数只能定义一次,但是可以声明多次.

函数原型为定义函数的程序员和使用函数的程序员之间提供了借口.在使用函数时,程序员只对函数原型编程即可.

定义函数的源文件应包含声明该函数的头文件.

程序员可以为一个或者多个形参定义默认值.但是,如果有一个形参具有默认实参,那么,它后面所有的形参都必须有默认实参.

函数调用的实参按位置解析,默认实参只能用来替换函数调用缺少的尾部实参.例如,如果要给background提供实参,那么也必须给height和width提供实参. 
设计带有默认实参的函数,其中部分工作就是排列形参,使最少使用默认实参的形参排在最前,最可能使用默认实参的形参排在最后.

通常,应在函数声明中指定默认实参,并将该声明放在合适的头文件中.
如果在函数定义的形参表中提供默认实参,那么只有在包含该函数定义的源文件中调用该函数时,默认实参才是有效的.

### 局部变量

`static`局部对象确保不迟于在程序执行流程第一次经过该对象的定义语句时进行初始化.这种对象一旦被创建,在程序结束前都不会被撤销.当定义静态局部对象的函数结束时,静态局部对象不会撤销.在该函数被对此调用的过程中,静态局部对象会持续存在并保持它的值.

### 内联函数

调用函数比求解等价表达式要慢得多.在大多数机器上,调用函数都要做很多工作:调用前要先保存寄存器,并在返回时恢复;复制实参;程序还必须转向一个新位置执行.

内联说明对于编译器来说只是个建议,编译器科一选择忽略这个建议.

一般来说,内联机制用于优化小的,只有几行的而且经常被调用的函数.大多数编译器都不支持递归函数的内联.

内联函数应该在头文件中**定义**,这一点不同于其他函数.

### 类的成员函数

函数原型必须在类中定义.但是,函数体既可以在类中也可以在类外定义.

类的所有成员都必须在类定义的花括号里面声明.伺候,就不能再为类增加任何成员.类的成员函数必须如声明的一般定义. 类的成员函数既可以在类内定义也可以在类外定义. 编译器隐式地将在类内定义的成员函数当做内联函数.


类的成员函数可以访问该类的`private`成员

`const` 改变了隐含的`this`形参的类型. 在调用`total.same_isbn(trans)`时,隐含的`this`形参将是一个指向`total`对象的`const Sales_Item *`类型的指针. 用这种方式使用`const`的函数称为**常量成员函数**. 由于`this`是指向`const`对象的指针,**`const`成员函数不能修改调用该函数的对象**.

由于`this`指针是隐式定义的,因此不需要在函数的形参表中包含`this`指针. 实际上,这样做也是非法的. 但是,在函数体中可以显示地使用`this`指针.

#### 编写Sales_item类的构造函数

**构造函数**是特殊的成员函数,与其他成员函数不同,**构造函数和类同名,而且没有返回类型**. 而与其他成员函数相同的是,构造函数也有形参表(可能为空)和函数体. **一个类可以有多个构造函数,每个构造函数必须有与其他构造函数不同数目或类型的形参**.

构造函数的形参指定了创建该对象时使用的初始化式. 通常,这些初始化式会用于初始化新创建对象的数据成员. 构造函数通常应确保其每个数据成员都完成了初始化.

和其他成员函数一样,构造函数也必须在类中声明, 但是可以在类中或者类外定义. 注意到构造函数是放在类的`public`部分的.

没有形参的**默认构造函数**. 默认构造函数说明当定义对象没有为它提供(显式的)初始化式时应该怎么办. 形参表为空是因为正在定义的构造函数是默认调用的,无需提供任何初值.

在冒号和花括号之间的代码称为**构造函数的初始化列表**. 构造函数的初始化列表为类的一个或者多个数据成员指定初始值.

具有类类型的成员皆被其默认的构造函数自动初始化.

合成的默认构造函数一般适用于仅包含类类型成员的类.而对于含有内置类型或者复合类型成员的类,则通常应该定义他们自己的默认构造函数初始化这些成员.

### 重载函数

出现在相同作用域中的两个函数,如果具有相同的名字而形参不同,则称为**重载函数**.

任何程序都仅有一个`main`函数的实例.`main`函数不能重载.

函数不能仅仅基于不同的返回类型而实现重载.

形参与`const`形参的等价性仅适用于非引用形参.有`const`引用形参的函数与有非`const`引用形参的函数是不同的. 类似地,如果函数带有指向`const`类型的指针形参,则与带有指向相同类型的非`const`对象的指针形参的函数不同.

一般来说,局部地声明函数是一种不明智的选择.函数的声明应放在头文件宏,但为了解释作用域与重载的相互作用,我们将违反上述规则而使用局部函数声明.

在`C++`中,名字查找发生在类型检查之前.

无法将整型值传递给枚举类型的形参,但可以将枚举值传递给整形形参.

在使用有枚举类型形参的重载函数时,请记住:由于不同枚举类型的枚举常量值不想同,在函数重载确定过程中,不同的枚举类型会具有完全不相同的行为.其枚举成员确定了它们提升的类型,而所提升的类型依赖于机器.

仅当形参是引用或者指针时,形参是否为`const`才有影响.

如果传递的是非`const`对象,则上述任意一种函数皆可行.非`const`对象既可用于初始化`const`引用,也可以用于初始化非`const`引用.但是, 将`const`引用初始化为非`const`对象,则需通过转换来实现,而非`const`形参的初始化则是精确匹配.

注意不能基于指针本身是否为`const`来实现函数的重载.

### 7.9 指向函数的指针

用`typedef`简化函数指针的定义
`typedef bool (*cmpFcn)(const string &, const string &);`

在引用函数名但又没有调用该函数时,函数名将被自动解释为指向函数的指针.此时,直接引用函数名等效于在函数名上应用取地址操作符.

函数指针只能通过同类新的函数或函数指针或0值常量表达式进行初始化或赋值. 指向不同函数类型的指针之间不存在转换.

指向函数的指针可以用于调用它所指向的函数.可以不需要使用解引用操作符,直接通过指针调用函数.

函数的形参可以是指向函数的指针.这种形参可以用一下两种形式编写.

**函数科一返回指向函数的指针,但是,正确写出这种返回类型相当不容易:**
```
// ff is a function taking an int and returning a function pointer
// the function pointed to returns an int and takes an int * and an int
int (* ff(int))(int *, int)
```

**阅读函数指针声明的最佳方法是从声明的名字开始由里而外理解.**

要理解该声明的定义,首先观察:`ff(int)`,将`ff`声明为一个函数,它带有一个`int`型的形参.该函数返回: `int (*) (int *, int);` 它是一个指向函数的指正, 所指向的函数返回`int`型并带有两个分别是`int *`型和`int`型的形参.

使用`typedef`可以使该定义更简明易懂:
```//PF is a pinter to a function returning an int, taking an int * and an int
typedef int (*PF)(int *, int)
PF ff(int);
```

允许将形参定义为函数类型, 但函数的返回类型则必须是指向函数的指针,而不能是函数.

具有函数类型的形参所对应的形参将被自动转换为指向相应函数类型的指针.但是,当返回的是函数时,同样的转换操作则无法实现.

```
//func is a function type, not a pointer to function!
typedef int func(int *, int)
void f1(func);		//ok: f1 has a parameter of function type
func f2(int);		//error: f2 has a return type of function type
func *f3(int);		//ok: f3 returns a pointer to function type

6. 指向重载函数的指针
C++ 语言允许使用函数指针指向重载的函数:
```
extern void ff(vector<double>);
extern void ff(unsigned int);

// which function does pf1 refer to?
void (*pf1)(unsigned int) = &ff;	// ff(unsigned)
```

指针的类型必须与重载函数的一个版本精确匹配.如果没有精确匹配的函数,则对该指针的初始化或赋值都讲导致编译错误.

















