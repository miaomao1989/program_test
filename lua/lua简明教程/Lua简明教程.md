# Lua 简明教程

## 控制语句

### while循环

```lua
sum = 0
num = 1
while num <= 100 do
	sum = sum + num
    num = num + 1
end
print("sum =", sum)
```

if-else分支

```lua
if age == 40 and sex == "Male" then
	print("男人四十一枝花")
elseif age > 60 and sex ~= "Female" then
	print("Old man without country!")
elseif age < 20 then
	io.write("too young, too naive!\n")
else
	local age = io.read()
    print("Your age is "..age)
end
```

### for循环

```lua
sum = 0
for i = 1, 100 do
	sum = sum + i
end
```

```lua
sum = 0
for i = 1, 100, 2 do
	sum = sum + i
end
```

```lua
sum = 0
for i = 100, i, -2 do
	sum = sum + i
end
```

### until循环

```lua
sum = 2
repeat
	sum = sum ^ 2 --幂操作
    print(sum)
until sum > 1000
```

## 函数

Lua的函数和JavaScript的很像

### 递归

```lua
function fib(n)
	if n < 2 then return 1 end
    return fib(n - 2) + fib(n - 1)
end
```

### 闭包

同样, JavaScript附体!

示例一

```lua
function newCounter()
	local i = 0
    return function()
    	i = i + 1
        return i
    end
end
```

示例二

```lua
function myPower(x)
	return function(y)
    	return y^x
    end
end

power2 = myPower(2)
power3 = myPower(3)

print(power2(4))	--4的2次方
print(power3(5))	--5的3次方
```

### 函数的返回值

可以一条语句上赋多个值, 如:

`name, age, bGay = "haoel", 37, false, "haoel@hotmail.com"`

上面的代码中, 因为只有3个变量, 所以第四个值被丢弃.

函数也可以返回多个值

```lua
function getUserInfo(id)
	print(id)
	return "haoel", 37, "haoel@hotmail.com", "http://coolshell.cn"
end

name, age, email, website, bGay = getUserInfo()
```

注意: 上面的示例中, 因为没有传id, 所以函数中的id输出为nil, 因为没有返回bGay, 所以bGay也是nil

### 局部函数

```lua
function foo(x)
	return x^2
end

foo = function(x)
	return x^2
end
```

## Table

```lua
haoel = {name="ChenHao", age=37, handsome=True}
```

下面是table的CRUD操作:

```lua
haoel.website="http://coolshell.cn/"
local age = haoel.age
haoel.handsome = false
haoel.name=nil
```

```lua
t = {[20]=100, ['name']="ChenHao", [3.14]="PI"}
```

这样就更像Key Value了。于是你可以这样访问：`t[20]`，`t['name']`, `t[3.14]`。

我们再来看看数组

```lua
arr = {10,20,30,40,50}
```

这样看上去就更像数组了, 但其实其等价于

```lua
arr = {[1]=10, [2]=20, [3]=30, [4]=40, [5]=50}
```

所以, 你也可以定义成不同的类型的数组, 比如:

```lua
arr = {"string", 100, "haoel", function() print("coolshell.cn") end}
```

注: 其中的函数可以这样调用: `arr[4]()`

我们可以看到Lua的下表不是从0开始的,是从1开始的

```lua
for i=1, #arr do
	print(arr[i])
end
```

我们可以通过如下的方式来访问一个全局变量(假设我们这个全局变量名叫globalVar)

```lua
_G.globalVar
_G["globalVar"]
```

我们可以通过下面的方式来遍历一个Table

```lua
for k, v in pairs(t) do
	print(k, v)
end
```

## MetaTable和MetaMethod

MetaTable和MetaMethod是Lua中重要的语法, MetaTable主要是用来做一些类似于C++操作符重载的功能.

比如, 我们有两个分数:

```lua
fraction_a = {numeration=2, denominator=3}
fraction_b = {numerator=4, denominator=7}
```

我们想实现分数间的相加：2/3 + 4/7，我们如果要执行： fraction_a + fraction_b，会报错的。

所以，我们可以动用MetaTable，如下所示：

```lua
fraction_op={}
function fraction_op.__add(f1, f2)
	ret = {}
   	ret.numerator = f1.numerator * f2.denominator + f2.numerator * f1.denominator
   	ret.denominator = f1.denominator * f2.denominator
    return ret
end
```

为之前定义的两个table设置MetaTable: (其中的setmetatable是库函数)

```lua
setmetatable(fraction_a, fraction_op)
setmetatable(fraction_b, fraction_op)
```

于是你就可以这样干了, （调用的是`fraction_op.__add()`函数）

```lua
fraction_s = fraction_a + fraction_b
```

至于`__add`这是`MetaMethod`，这是`Lua`内建约定的，其它的还有如下的`MetaMethod`：

| MetaMethod | 对应操作 |
|--------|--------|
|   `__add(a, b)`       |    对应表达式 `a + b`     |
| `__sub(a, b) ` | 对应表达式 `a - b` |
| `__mul(a, b) ` | 对应表达式 `a * b` |
| `__div(a, b) ` | 对应表达式 `a / b` |
| `__mod(a, b) ` | 对应表达式 `a % b` |
| `__pow(a, b) ` | 对应表达式 `a ^ b` |
| `__unm(a) `	 | 对应表达式 `-a`	 |
| `__concat(a, b)`| 对应表达式 `a .. b` |
| `__len(a)`	 | 对应表达式`#a` |
| `__eq(a, b)` | 对应表达式`a == b` |
| `__lt(q, b)` | 对应表达式 `a < b` |
| `__le(a, b)` | 对应表达式 `a <= b` |
| `__index(a, b)` | 对应表达式 `a.b` |
| `__newindex(a, b, c)` | 对应表达式 `a.b = c` |
| `__call(a, ...)` | 对应表达式 `a(...)` |

## "面向对象"

上面我们看到有`__index`这个重载，这个东西主要是重载了find key的操作。这操作可以让Lua变得有点面向对象的感觉，让其有点像Javascript的prototype.

所谓`__index`, 说的明确一点, 如果我们有两个对象a和b, 我们想让b作为a的prototype只需要:

```lua
setmetatable(a, {__index = b})
```

例如下面的示例：你可以用一个Window_Prototype的模板加上`__index`的MetaMethod来创建另一个实例：

```lua
Window_Prototype = {x=0, y=0, width=100, height=100}
MyWin = {title="Hello"}
setmetatable(MyWin, {__index = Window_Prototype})
```

于是：MyWin中就可以访问`x, y, width, height`的东东了。（注：当表要索引一个值时如`table[key]`, Lua会首先在`table`本身中查找key的值, 如果没有并且这个`table`存在一个带有`__index`属性的Metatable, 则Lua会按照_`_index`所定义的函数逻辑查找）

有了以上的基础, 我们可以来说说所谓的Lua的面向对象

```lua
Person = {}

function Person : new(p)
	local obj = p
    if (obj == nil) then
    	obj = {name="ChenHao", age=37, handsome=true}
    end
    self.__index = self
    return setmetatable(obj, self)
end

function Person:toString()
	return self.name .." : ".. self.age .." : " .. (self.handsome and "handsome" or "ugly")
```

上面我们可以看到有一个`new`方法和一个`toString`的方法。其中：

1) `self` 就是 `Person`，`Person:new(p)`，相当于`Person.new(self, p)`;
2) `new`方法的`self.__index = self` 的意图是怕`self`被扩展后改写，所以，让其保持原样;
3) setmetatable这个函数返回的是第一个参数的值;

于是：我们可以这样调用：

```lua
me = Person:new()
print(me:toString())
 
kf = Person:new{name="King's fucking", age=70, handsome=false}
print(kf:toString()
```

继承如下，我就不多说了，Lua和Javascript很相似，都是在Prototype的实例上改过来改过去的。

```lua
Student = Person:new()
 
function Student:new()
    newObj = {year = 2013}
    self.__index = self
    return setmetatable(newObj, self)
end
 
function Student:toString()
    return "Student : ".. self.year.." : " .. self.name
end
```


















