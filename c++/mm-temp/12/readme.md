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
}

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
在类外部定义的成员函数必须指明它们是在类的作用域中。`Sales_item::avg_price`的定义域
