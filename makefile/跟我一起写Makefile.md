# 跟我一起写Makefile

作者：陈皓
整理：喵星人

[TOC]

## 第一部分：概述

什么是`makefile`？或许，很多的`Windows`程序员都不知道这个东西，因为那些`Windows`的`IDE`都为你做了这个工作，但是我觉得要做一个好的`professional`的程序员，`makefile`还是要懂一些的。这就好像现在有这么多的`HTML`编辑器，但是如果你想成为一个专业人士，你还是要了解`HTML`的标识的含义。特别实在`Unix`下的软件编译，你就不能不自己写`makefile`了，会不会写`makefile`，从一个侧面说明了一个人是否具备完成大型工程的能力。因为，`makefile`关系到了整个工程的编译规则。一个工程中涉及到的源文件不计其数，其按类型/功能/模块又分别被放在若干个目录中，`makefile`定义了一系列的规则来指定，哪些文件需要先编译，哪些文件需要后编译，哪些文件需要重新编译，甚至于进行更加复杂的功能操作，因为`makefile`就像一个`Shell`脚本一样，其中也可以执行操作系统的命令。`makefile`带来的好处就是——“自动化编译”，一旦写好，只需要一个`make`命令，整个工程完全自动编译，极大地提高了软件开发的效率。`make`是一个命令行工具，是一个解释`makefile`中指令的命令工具，一般来说，大多数的`IDE`都有这个命令，比如：`Delphi`的`make`，`Visual C++`的`nmake`，`Linux`下的`GNU make`。可见，`makefile`都成为了一种在工程方面的编译方法。

现在讲述如何编写`makefile`的文章比较少，这也是我想写这篇文章的原因。当然，不同厂商的`make`各不相同，也有不同的语法，但其本质都是在“文件依赖性”上做文章。这里，我仅仅对`GNU make`进行描述，我的环境是`RedHat Linux 8.0`, `make`的版本是`3.80`。毕竟，这个`make`是应用地最为广泛的，也是用得最多的。而且其还是最遵循`IEEE 1003.2-1992`标准的`(POSIX.2)`。

在这篇文档中，将以`C/C++`的源代码作为我们的基础，所以必然涉及到一些关于`C/C++`的编译知识。关于这方面的内容，还请各位查看相关的编译器的文档。这里默认的编译器是`Unix`下的`GCC`和`CC`。

## 第二部分：关于程序的编译和链接

在此，我想多说一些关于程序的编译的一些规范和方法。一般来说，无论是`C`，`C++`还是`Pas`，首先要把源文件编译成中间代码文件，在`Windows`下也就是`.obj`文件，`Unix`下是`.o`文件，即`Object File`，这个动作叫做编译`compile`。然后把大量的`Object File`合成执行文件，这个动作叫作链接 `link`。编译时，编译器需要的是语法正确，函数和变量的声明正确。对于后者，通常是你需要告诉编译器头文件所在的位置 (头文件中应该只是声明，而定义应该放在`C/C++`文件中)。只要所有的语法正确，编译器就可以编译出中间目标文件。一般来说，每个源文件都应该对应于一个中间目标文件(`.o`文件或者是`.obj`文件)。链接时，主要是链接函数和全局变量。所以，我们可以使用这些中间目标文件(`.o`文件或是`.obj`文件)来链接我们的应用程序。连接器并不管还是所在的源文件，只管函数的中间目标文件`Object File`。在大多数时候，由于源文件太多，编译生成的中间目标文件太多，而在链接时需要明显地指出中间目标文件名，这对于编译很不方便。所以，我们需要给中间文件打个包，在`Windows`下这种包就叫做库文件`Library File`，也就是`.lib`文件；在`Unix`下，就是`Archive File`，也就是`.a`文件。

总结一下，源文件首先会生成中间目标文件，再由中间目标文件生成执行文件。在编译时，编译器只检测程序语法，和函数/变量是否声明。如果函数未被声明，编译器会给出一个警告，但可以生成`Object File`。在链接程序时，连接器会在所有的`Object File`中寻找函数的实现，如果找不到，那就会报链接错误`Linker Error`。在`VC`下，这种错误一般是：`Link 2001`错误，意思是说，链接器未能找到函数的实现，你需要指定函数的`Object File`。

## 第三部分：`Makefile`介绍

`make`命令在执行时，需要一个`Makefile`文件，以告诉`make`命令需要怎么样去编译和链接程序。

首先，我们用一个示例来说明`Makefile`的书写规则，以便给大家一个感性的认识。这个示例来源于`GNU`的`make`使用手册，在这个示例中，我们的工程有8个`.c`文件，和3个`.h`文件，我们要写一个`Makefile`来告诉`make`命令如何编译和链接这几个文件。我们的规则是：

1. 如果这个工程还没有编译过，那么我们的所有`.c`文件都要编译并被链接；
2. 如果这个工程的某几个`.c`文件被修改，那么我们只编译被修改的`.c`文件，并且链接目标程序。
3. 如果这个工程的头文件被改变了，那么我们需要编译引用了这几个头文件的`.c`文件，并链接目标程序。

只要我们的`Makefile`写得够好，所有这一切，我们只需要用一个`make`命令就可以完成。`make`命令会自动智能地根据当前的文件修改的情况来确定那些文件需要重编译，从而自己编译所需要的文件和链接目标程序。

### 3.1： `Makefile`的规则

在讲述这个`Makefile`之前，还是让我们先来粗略看一看`Makefile`的规则：

```
target ... : prerequisites ...
        command
        ...
        ...
```

`target`可以是一个`object file`（目标文件），也可以是一个执行文件，还可以是一个标签`label`。对于标签这种特性，在后续的`伪目标`章节中会有叙述；

`prerequisite`就是，要生成的那个`target`所需要的文件或是目标；
`command`也就是`make`需要执行的命令。（任意的`shell`命令）

这是一个文件的依赖关系，也就是说，`target`这一个或多个的目标文件依赖于`prerequisite`中的文件，其生成规则定义在`command`中。说白一点，就是说，`prerequisites`中如果有一个以上的文件比`target`文件要新的话，`command`所定义的命令就会被执行。这就是`makefile`的规则，也是`makefile`中最核心的内容。

说到底，`makefile`的东西就是这样一点，好像我的这篇文档也该结束了。呵呵。还不尽然，这是`makefile`的主线和核心，但要写好一个`makefile`还不够，我会以后面一点一点地结合我的工作经验给你慢慢道来。内容还多着呢。：）

### 3.2： 一个示例

正如前面所说的，如果一个工程有3个`.h`头文件，和8个`.c`文件，我们为了完成前面所述的那三个规则，我们的`makefile`应该是下面这个样子的。

```
edit: main.o kbd.o command.o display.o \
      insert.o search.o files.o utils.o /* 注释:如果后面这些.o文件比edit可执行文件新,那么才会去执行下面这句命令*/
      cc -o edit main.o kbd.o command.o display.o \
                  insert.o search.o files.o utils.o

main.o : main.c defs.h
        cc -c main.c
kbd.o : kbd.c defs.h command.h
        cc -c kbd.code
command.o : command.c defs.h command.h
        cc -c command.c
display.o : display.c defs.h buffer.h
        cc -c display.c
insert.o : insert.c defs.h buffer.h
        cc -c insert.c
search.o : search.c defs.h buffer.h
        cc -c search.c
files.o : files.c defs.h buffer.h command.h
        cc -c files.c
utils.o : utils.c defs.h
        cc -c utils.c

clean :
        rm edit main.o kbd.o command.o display.o \
        insert.o search.o files.o utils.o
```

反斜杠（`\`）是换行符的意思。这样比较便于`makefile`的易读。我们可以把这个内容保存在名字为`makefile`或`Makefile` 的文件中，然后在该目录下直接输入命令`make`就可以生成执行文件`edit`。如果要删除执行文件和所有的中间目标文件，那么，只要简单地执行一下 `make clean` 就可以了。

在这个`makefile`中，目标文件（`target`）包含：执行文件`edit`和中间目标文件（`*.o`），依赖文件（`prerequisites`）就是冒号后面的那些 `.c` 文件和 `.h` 文件。每一个 `.o` 文件都有一组依赖文件，而这些 `.o` 文件又是执行文件 `edit` 的依赖文件。依赖关系的实质上就是说明了目标文件是由哪些文件生成的，换言之，目标文件是哪些文件更新的。

在定义好依赖关系后，**后续的那一行定义了如何生成目标文件的操作系统命令**，一定要以一个`tab`键作为开头。记住，`make`并不管命令是怎么工作的，他只管执行所定义的命令。`make`会比较`targets`文件和`prerequisites`文件的修改日期，如果`prerequisites`文件的日期要比`targets`文件的日期要新，或者`target`不存在的话，那么，`make`就会执行后续定义的命令。

这里要说明一点的是，`clean`不是一个文件，它只不过是一个动作名字，有点像c语言中的`lable`一样，其冒号后什么也没有，那么，`make`就不会自动去找它的依赖性，也就不会自动执行其后所定义的命令。要执行其后的命令（不仅用于`clean`，其他`lable`同样适用），就要在`make`命令后明显得指出这个`lable`的名字。这样的方法非常有用，我们可以在一个`makefile`中定义不用的编译或是和编译无关的命令，比如程序的打包，程序的备份，等等。


### 3.3 `make`是如何工作的

在默认的方式下，也就是我们只输入`make`命令。那么，

1. `make`会在当前目录下找名字叫`Makefile`或`makefile`的文件。
2. 如果找到，它会找文件中的第一个目标文件（`target`），在上面的例子中，他会找到`edit`这个文件，并把这个文件作为最终的目标文件。
3. 如果`edit`文件不存在，或是`edit`所依赖的后面的`.o `文件的文件修改时间要比`edit`这个文件新，那么，他就会执行后面所定义的命令来生成`edit`这个文件。
4. 如果`edit`所依赖的`.o`文件也不存在，那么`make`会在当前文件中找目标为`.o`文件的依赖性，如果找到则再根据那一个规则生成`.o`文件。（这有点像一个堆栈的过程）
5. 当然，你的`.c`文件和`.h`文件是存在的啦，于是`make`会生成 `.o` 文件，然后再用 `.o` 文件生成`make`的终极任务，也就是执行文件`edit`了。

这就是整个`make`的依赖性，`make`会一层又一层地去找文件的依赖关系，直到最终编译出第一个目标文件。在找寻的过程中，如果出现错误，比如最后被依赖的文件找不到，那么`make`就会直接退出，并报错。**而对于所定义的命令的错误，或是编译不成功，`make`根本不理**。`make`只管文件的依赖性，即，如果在找了依赖关系之后，冒号后面的文件还是不在，那么对不起，我就不工作啦。

通过上述法分析，我们知道，像`clean`这种，没有被第一个目标文件直接或间接关联，那么它后面所定义的命令将不会被自动执行，不过，我们可以显式要`make`执行，即`make clean`，以此来清除所有的目标文件，以便重新编译。

于是，在我们的编程中，如果这个工程已经编译过，我们修改了其中一个源文件，比如`file.c`，那么根据我们的依赖性，我们的目标`file.o`会被重新编译，于是`file.o`的文件也是最新的，于是`file.o`的文件修改时间要比`edit`新，所以`edit`也会被重新链接了（详见`edit`目标文件后定义的命令）。

而如果我们改变了`command.h`，那么`kdb.o`,`command.o`和`files.o`都会被重新编译，并且`edit`会被重链接。

### 3.4 `makefile`中使用变量

上面的例子中，先让我们看看`edit`的规则：

```
edit: main.o kbd.o command.o display.o \
      insert.o search.o files.o utils.o
      cc -o edit main.o kbd.o command.o display.o \
      insert.o search.o files.o utils.o
```

我们可以看到`.o`文件的字符串被重复了两次，如果我们的工程需要加入一个新的`.o`文件，那么我们需要在两个地方加(应该是三个地方，还有一个地方在`clean`中)。当然，我们的`makefile`并不复杂，所以在两个地方加也不累，但如果`makefile`变得复杂，那么我们就有可能忘掉一个需要加入的地方，而导致编译失败。所以，为了`makefile`
的易维护，在`makefile`中我们可以使用变量。`makefile`的变量也是一个字符串，理解成`C`语言中的宏可能会更好一些。

比如，我们声明任意一变量名，叫`objects`,`OBJECTS`,`objs`,`OBJS`,`obj`或者`OBJ`，只要能够表示`obj`文件即可。我们在`makefile`起始处按如下定义此变量：

```
objects = main.o kbd.o command.o display.o \
          insert.o search.o files.o utils.o
```

于是，我们就可以很方便地在我们的`makefile`中以`$(objects)`的方式来使用这个变量了，于是我们的改良版`makefile`变为如下：

```
objects = main.o kbd.o command.o display.o \
          insert.o search.o files.o utils.o

edit : $(objects)
        cc -o edit $(objects)
main.o : main.c defs.h cc -c main.c
kbd.o : kbd.c defs.h command.h
	cc -c kbd.c
command.o : command.c defs.h command.h
	cc -c command.c
display.o : display.c defs.h buffer.h
	cc -c display.c
insert.o : insert.c defs.h buffer.h
	cc -c insert.c
search.o : search.c defs.h buffer.h
	cc -c search.c
files.o : files.c defs.h buffer.h command.h
	cc -c files.c
utils.o : utils.c defs.h
	cc -c utils.c
clean :
	rm edit $(objects)
```

如果有新的`.o`文件加入，我们只需要简单地修改变量`objects`即可。

更多关于变量的话题，我会在后续详细介绍。


### 3.5 让`make`自动推导

`GNU`的`make`很强大，它可以自动推导文件以及文件依赖关系后面的命令，于是我们就没必要去在每一个`.o`文件后都写上类似的命令，因为，我们的`make`会自动识别，并自己推导命令。
只要`make`看到一个`.o`文件，它就会自动的把`.c`文件加在依赖关系中，如果`make`找到一个`whatever.o`，那么 `whatever.c`，就会是`whatever.o`的依赖文件。并且 `cc -c whatever.c` 也会被推导出来，于是，我们的`makefile` 再也不用写得这么复杂。我们的新`makefile`又出炉了。

```
objects = main.o kbd.o command.o display.o \
            insert.o search.o files.o utils.o

cc = gcc

edit : $(objects)
        cc -o edit $(objects)

main.o : defs.h
kbd.o : defs.h command.h
command.o : defs.h command.h
display.o : defs.h buffer.h
insert.o : defs.h buffer.h
search.o : defs.h buffer.h
files.o : defs.h buffer.h command.h
utils.o : defs.h

.PHONY : clean
clean :
    rm edit $(objects)
```

这种方法，也就是make的“隐晦规则”。上面文件内容中，`.PHONY`表示，`clean`是个伪目标文件。
关于更为详细的“隐晦规则”和“伪目标文件”，我会在后续给你一一道来。

### 3.6 另类风格的`makefile`

既然我们的`make`可以自动推导命令，那么我看到那堆`.o`和`.h`的依赖就有点不爽，那么多的重复的`.h`，能不能把其收拢起来，好吧，没有问题，这个对于`make`来说很容易，谁叫它提供了自动推导命令和文件的功能呢？来看看最新风格的`makefile`吧。

```
objects = main.o kbd.o command.o display.o \
        insert.o search.o files.o utils.o

edit : $(objects)
    cc -o edit $(objects)

    $(objects) : defs.h
    kbd.o command.o files.o : command.h
    display.o insert.o search.o files.o : buffer.h

    .PHONY : clean
    clean :
        rm edit $(objects)
```

这种风格，让我们的`makefile`变得很简单，但我们的文件依赖关系就显得有点凌乱了。鱼和熊掌不可兼得。还是看你的喜好了。我是不喜欢这种风格的，一是文件的依赖关系看不清楚，而是如果文件一多，要加入几个新的`.o`文件，那就理不清楚了。

### 3.7 清空目标文件的规则

每个`makefile`中都应该写一个清空目标文件（`.o`和执行文件）的规则,这不仅便于重编译，也很利于保持文件的清洁。这是一个“修养”（呵呵，还记得我的《编程修养》吗）。一般的风格都是：

```
clean:
        rm edit $(objects)
```

更为稳健的做法是：

```
.PHONY : clean
clean :
        -rm edit $(objects)
```

前面说过，`.PHONY`的意思表示`clean`是一个伪目标。而在`rm`命令前面加了一个`-`的意思是，也许某些文件出现问题，但不要管，继续做后面的事情。当然，`clean`的规则不要放在文件的开头，不然，就会变成`make`的默认目标，相信谁也不愿意这样。不成文的规矩是——`clean`从来都是放在文件的最后。

上面就是一个`makefile`的概貌，也是`makefile`的基础，下面还有很多`makefile`的相关细节，准备好了吗？准备好了就来嘛。

## Part 4： `Makefile`总述

### 4.1 `Makefile`里有什么？

`Makefile`里主要包含了五个东西：显式规则，隐晦规则、变量定义、文件指示和注释。

1. 显式规则

显式规则说明了，如何生成一个或多个目标文件。这是由 `Makefile` 的书写者明显指
出,要生成的文件,文件的依赖文件,生成的命令。


2. 隐晦规则

由于我们的`make`有自动推导的功能，所以隐晦规则可以让我们比较粗糙简略地书写`makefile`，这是由`make`所支持的。

3.变量的定义

在`makefile`中我们定义一系列的变量，变量一般都是字符串，这个有点像 C 语言中
的宏,当 `Makefile` 被执行时,其中的变量都会被扩展到相应的引用位置上。

4. 文件指示

其包括了三个部分，一个是在一个`makefile`中引用另一个`makefile`，就像C语言中的`include`一样；另一个是根据某些情况指定`makefile`中有效的部分，就像C语言中的预编译`#if`一样；还有就是定义一个多行的命令。有关这一部分的内容，我会在后续的部分中讲述。

5. 注释

`Makefile`中只有行注释，和`Unix`的`Shell`脚本一样，其注释是用`#`字符，这个就像`C/C++`中的`//`一样。如果你要在你的`Makefile`中使用`#`字符，可以用反斜杠进行转义，如：`\#`。

最后，还值得一提的是，在`Makefile`中的命令，必须要以`[TAB]`键开始。


### 4.2 `Makefile`的文件名

默认的情况下，`make`命令会在当前目录下按顺序找寻文件名为“GNUmakefile”、
“makefile”、“Makefile”的文件,找到了解释这个文件。在这三个文件名中,最好使用
“Makefile”这个文件名,因为,这个文件名第一个字符为大写,这样有一种显目的感觉。
最好不要用“GNUmakefile”,这个文件是 GNU 的 make 识别的。有另外一些 make 只对全小
写的“makefile”文件名敏感,但是基本上来说,大多数的 make 都支持“makefile”和
“Makefile”这两种默认文件名。

### 4.3 引用其他的`Makefile`

在`Makefile`使用`include`关键字可以把别的`Makefile`包含进来，这很像C语言的`#include`,被包含的文件会原模原样的放在当前文件的包含位置。`include`的语法是：

```
 include <filename>;
```

`filename`可以是当前操作系统`shell`的文件模式（可以包含路径和通配符）。

在`include`前面可以有一些空字符，但是绝不能是`[TAB]`键开始。`include`和



## 6 多目标

`makefile`的规则中的目标可以不止一个，其支持多目标，有可能我们的多个目标同时依赖于一个文件，并且其生成的命令大体类似。于是我们就能够把其合并起来。当然，多个目标的生成规则的执行命令是同一个，这可能会给我们带来麻烦，不过好在我们可以使用一个自动化变量`$@`(关于这个自动化变量，将在后面讲述)。这个变量表示着目前规则中所有的目标的集合，这样说可能很抽象，还是看一个例子吧：

```
bigoutput littleoutput : text.g
generate text.g -$(subst output,,$@) > $@
```

上述规则等价于：

```
bigoutput: text.g
generate text.g -big > bigoutput
littleoutput: text.g
generate text.g -little > littleoutput
```

其中，`-$(subst, output,,$@)`中的`$`表示执行一个`Makefile`的函数，函数名而`subst`，后面的为参数。关于函数，将在后面描述。这里的这个函数是截取字符串的意思。`$@`表示目标的集合，就像一个数组，`$@`依次取出目标，并执行命令。

## 7 静态模式

静态模式可以更加容易地定义多目标的规则，可以让我们的规则变得更加地有弹性和灵活。我们先来看一下语法：

```
<targets ...> : <target-pattern> : <prereq-patterns ...>
<commands>
...
```

`targets`定义了一系列的目标文件，可以有通配符，是目标的一个集合。
`target-pattern`是指明了`target`的模式，也就是目标集的模式。
`prereq-patterns`是目标的依赖模式，它对`target-pattern`形成的模式再进行一次依赖目标的定义。

这样描述这三个东西，可能还是没有说清楚，还是举个例子来说明一下吧。如果我们的`<target-pattern`定义成`%.o`，意思是我们的`<target>`集合中都是以`.o`结尾的。而如果我们的`<prereq-patterns>`定义成`%.c`，意思是对`<target-pattern>`所形成的目标集进行二次定义，其计算方法是，取`<target-pattern>`模式中的`%`(也就是去掉了`.o`这个结尾)，并为其加上`.c`这个结尾，形成新的集合。

所以，我们的“目标模式”或是“依赖模式”中都应该有`%`这个字符。如果你的文件名中有`%`，那么你可以使用反斜杠`\`进行转义，来标明真实的`%`字符。

看一个例子：

```
objects = foo.o bar.o
all: $(objects)
$(objects): %.o: %.c
$(CC) -c $(CFLAGS) $< -o $@
```

上面的例子中，指明了我们的目标从`$object`中获取，`%.o`表明所有以`.o`结尾的目标，也就是`foo.o bar.o`，这就是变量`$(objects)`集合的模式，而依赖模式`%.c`则取模式`%.o`的`%`, 也就是`foo bar`，并为其加下`.c`的后缀。于是，我们的依赖目标就是`foo.c bar.c`。而命令中的`$<` 和`$@`则是自动化变量。`$<`表示所有的依赖目标集(也就是`foo.c bar.c`)，`$@`表示目标集(也就是`foo.o bar.o`)。于是上面的规则展开后就等价于下面的规则：

```
foo.o : foo.c
$(CC) -c $(CFLAGS) foo.c -o foo.o

bar.o : bar.c
$$(CC) -c $(CFLAGS) bar.c -o bar.o

```

试想，如果我们的`%.o`有几百个，那么我们只要用这种很简单的“静态模式规则”就可以写完一堆规则，实在是太有效率了。“静态模式规则”的用法很灵活，如果用得好，那会是很强大的功能。再看一个例子：

```
files = foo.elc bar.o lose.o

$(filter $.o,$(files)): %.o : %.c
$(CC) -c $(CFLAGS) $< -o $@

$(filter $.elc, $(files)) : %.els : %.el
emacs -f batch-byte-compile $<
```

`$(filter %.o, $(files))`表示调用`Makefile`的`filter`函数，过滤`$files`集合，只要其中模式为`$.o`的内容。其他的内容，与上述类似。这个例子展示了`Makefile`中更大的弹性。

## 8. 自动生成依赖性

在`Makefile`中，我们的依赖关系可能会包含一系列的头文件。比如，如果我们的`main.c`中有一句`#include "defs.h"`，那我们的依赖关系应该是：

```
main.o : main.c defs.h
```

但是，如果是一个比较大型的工程，你必需清楚哪些`C`文件包含了哪些头文件，并且，你在加入或删除头文件时，也需要小心地修改`Makefile`，这是一个很没有维护性的工作。为了避免这种繁重而又容易出错的事情，我们可以使用`C/C++`编译器的一个功能。大多数的`C/C++`编译器都支持`-M`选项，即自动寻找源文件中包含的头文件，并生成一个依赖关系。例如，如果我们执行下面的命令：

```
cc -M main.c
```

其输出是：
```
main.o : main.c defs.h
```

于是由编译器自动生成依赖关系。这样依赖，你就不必再手动书写若干文件的依赖关系，而又编译器自动生成了。需要提醒一句的是，如果你使用`GNU`的`C/C++`编译器，你得用`-MM`参数。不然，`-M`参数会把一些标准库的头文件也包含进来。

`gcc -M main.c`的输出是：
```
main.o: main.c defs.h /usr/include/stdio.h /usr/include/features.h \
/usr/include/sys/cdefs.h /usr/include/gnu/stubs.h \
/usr/lib/gcc-lib/i486-suse-linux/2.95.3/include/stddef.h \
/usr/include/bits/types.h /usr/include/bits/pthreadtypes.h \
/usr/include/bits/sched.h /usr/include/libio.h \
/usr/include/_G_config.h /usr/include/wchar.h \
/usr/include/bits/wchar.h /usr/include/gconv.h \
/usr/lib/gcc-lib/i486-suse-linux/2.95.3/include/stdarg.h \
/usr/include/bits/stdio_lim.h
```

`gcc -MM main.c`的输出则是：
```
main.o : main.c defs.h
```

那么，编译器的这个功能如何与我们的`Makefile`联系在一起呢。因为这样一来，我们的`Makefile`也需要根据这些源文件重新生成，让`Makefile`自己依赖于源文件？这个功能并不现实。不过，我们可以有其他手段来迂回地实现这一功能。`GNU`组织建议把编译器为每个源文件的自动生成的依赖关系放到一个文件中，为每一个`name.c`的文件都生成一个`name.d`的`Makefile`文件，`.d`文件中就存放对应的`.c`文件的依赖关系。于是，我们可以写出`.c`文件和`.d`文件的依赖关系，并让`make`自动更新或自动生成`.d`文件，并把其包含在我们的主`Makefile`中。这样，我们就可以自动化地生成每个文件的依赖关系了。这里，我们给出了一个模式规则来产生`.d`文件：

```
%.d : %.c
@set -e; rm -f $@; \
$(CC) -M $(CPPFLAGS) $< > $@.$$$$; \
sed `s,\($*\)\.o[ :]*,\1.o $@ : ,g` < $@.$$$$ > $@; \
rm -f $@.$$$$

```

这个规则的意思是，所有的`.d`文件依赖于`.c`文件。`rm -f $@`的意思是删除所有的目标，也就是`.d`文件。第二行的意思是，为每个依赖文件`$<`，也就是`.c`文件生成依赖文件，`$@`表示模式`$.d`文件，如果有一个`C`文件是`name.c`，那么`%`就是`name`，`$$$$`意为一个随机编号。第二行生成的文件有可能是`name.d.1235`，第三行使用`sed`命令做了一个替换，关于`sed`命令的用法应参看相关的使用文档。第四行就是删除临时文件。

总而言之，这个模式要做的时就是在编译器生成的依赖关系中加入`.d`文件的依赖，即把依赖关系： `main.o : main.c defs.h` 转换成： `main.o main.d : main.c defs.h`。 于是我们的`.d`文件也会自动更新了，并会自动生成了。当然，你还可以在这个`.d`文件中加入的不只是依赖关系，包括生成的命令也可以一并加入,让每个`.d`文件都包含一个完整的规则。一旦我们完成这个工作，接下来我们就要把这些自动生成的规则放进我们的主`Makefile`中。我们可以使用`Makefile`的`include`命令，来引入别的`Makefile`文件(前面讲过)，例如：

```
sources = foo.c bar.c
include $(sources : .c=.d)
```

上述语句中的`$(sources : .c=.d)`中的`.c=.d`的意思是做一个替换，把变量`$(sources)`所有的`.c`的字串都替换成`.d`。关于这个替换的内容，再后面我会有更加详细的讲述。当然，你得注意次序，因为`include`是按次来载入文件的，最先载入的`.d`文件中的目标将会成为默认目标。

## 第六部分 书写命令

每条规则中的命令和操作系统`shell`的命令行是一致的。`make`会按顺序一条一条地执行命令，每条命令的开头必须以`TAB`键开头，除非，命令是紧跟在依赖规则后面的分号后的。在命令行之间的空格或是空行会被忽略，但是如果该空格或空行是以`TAB`键开头的，那么`make`会认为是一个空命令。

我们在`Unix`下可能会使用不同的`Shell`，但是`make`命令默认是被`/bin/sh` —— `Unix`的标准`Shell`解释执行的。除非你特别指定一个其它的`Shell`。`Makefile`中，`#`是注释符，其后本行的字符都被注释。

### 6.1 显示命令

通常,`make`会把其要执行的命令行在命令执行前输出到屏幕上。当我们用`@`字符在命令行前，那么，这个命令将不被 make 显示出来，最具代表性的例子是：我们用这个功能来像屏幕显示一些信息。如: `@echo 正在编译 XXX 模块......`。 当`make`执行时，会输出`正在编译 XXX 模块 ......`字符串，淡不会输出命令。如果没有`@`，那么，`make`将输出：`echo 正在编译 XXX 模块......`

如果`make`执行时，带入`make`参数`-n`或`--just-print`，那么其只是显示命令，但不会执行命令，这个功能很有利于我们调试我们的 `Makefile`。看看我们书写的命令是执行起来是什么样子的或是什么顺序的。

而`make`参数`-s`或`--slient`则是全面禁止命令的显示。

### 6.2 命令执行

当依赖目标新于目标时，也就是当规则的目标需要被更新时，`make`会一条一条的执行其后的命令。需要注意的是，如果你要让上一条命令的结果应用在下一条命令时，你应该使用分号分隔这两条命令。比如你的第一条命令是 cd 命令,你希望第二条命令得在 cd 之后的
基础上运行,那么你就不能把这两条命令写在两行上,而应该把这两条命令写在一行上,用
分号分隔。如:

e.g.1
```
exec:
cd /home/hchen
pwd
```

e.g.2
```
exec:
cd /home/hchen; pwd
```

当我们执行`make exec`时，第一个例子中的 `cd` 没有作用， `pwd` 会打印出当前的 `Makefile` 目录。而第二个例子中， `cd` 就起作用了， `pwd` 会打印出`/home/hchen`。`make` 一般是使用环境变量 `SHELL` 中所定义的系统 `Shell` 来执行命令。默认情况下使用 `UNIX` 的
标准 `Shell`——`/bin/sh` 来执行命令。但在 `MS-DOS` 下有点特殊，因为 `MS-DOS` 下没有 `SHELL` 环境变量，当然你也可以指定。如果你指定了 `UNIX` 风格的目录形式，首先 `make` 会在 `SHELL` 所指定的路径中找寻命令解释器。如果找不到，其会在当前盘符中的当前目录中寻找。如果
再找不到，其会在 `PATH` 环境变量中所定义的所有路径中寻找。`MS-DOS` 中，如果你定义的命令解释器没有找到，其会给你的命令解释器加上诸如`.exe`、`.com`、`.bat`、`.sh`等后缀。

### 6.3 命令出错

每当命令运行完后，`make`会检测每个命令的返回码。如果命令返回成功， 那么 `make` 会执行下一条命令，当规则中所有的命令成功返回后，这个规则就算是成功完成了。如果一个规则中的某个命令出错了(命令退出码非零)，那么 `make` 就会终止执行当前规则，这将有可能终止所有规则的执行。

有些时候，命令的出错并不表示就是错误的。例如 `mkdir` 命令，我们一定需要建立一个目录。如果目录不存在，那么 `mkdir` 就成功执行，万事大吉。如果目录存在，那么就出错了。我们之所以使用 `mkdir` 的意思就是一定要有这样的一个目录，于是我们就不希望 `mkdir` 出错而终止规则的运行。


为了做到这一点，忽略命令的出错，我们可以在 `Makefile` 的命令行前加一个减号-`(在 `Tab` 键之后)，标记为不管命令出不出错都认为是成功的。如:

```
clean:
-rm -f \*.o
```

还有一个全局的办法是，给`make`加上`-i`或是`--ignore-errors`参数。那么，`Makefile`中所有命令都会忽略错误。而如果一个规则是以`.IGNORE`作为目标的，那么这个规则中的所有命令将会忽略错误。这些是不同级别的防止命令出错的方法，你可以根据不同的情况需要进行设置。

还有一个要提一下的 `make` 的参数的是`-k`或是`--keep-going`，这个参数的意思是，如果某规则中的命令出错了，那么就终目该规则的执行，但继续执行其它规则。

### 6.4 嵌套执行`make`

在一些大的工程中，我们会把我们不同模块或是不同功能的源文件放在不同的目录中，我们可以在每个目录中都书写一个该目录的 `Makefile`，这有利于让我们的 `Makefile` 变得更加地简洁，而不至于把所有的东西全部写在一个 `Makefile` 中，这样会很难维护我们的 `Makefile`，这个技术对于我们模块编译和分段编译有着非常大的好处。

例如，我们有一个子目录叫`subdir`，这个目录下有个`Makefile`文件，来指明了这个目录下文件的编译规则。那么我们总控的 `Makefile` 可以这样书写:

```
subsystem:
cd subdir && (MAKE)
```

其等价于：

```
subsystem:
$(MAKE) -C subdir
```

定义$(MAKE)宏变量的意思是,也许我们的 make 需要一些参数,所以定义成一个变量比
较利于维护。这两个例子的意思都是先进入“subdir”目录,然后执行 make 命令。
我们把这个 Makefile 叫做“总控 Makefile”,总控 Makefile 的变量可以传递到下级
的 Makefile 中(如果你显示的声明)
 ,但是不会覆盖下层的 Makefile 中所定义的变量,除
非指定了“-e”参数。

### 6.5 定义命令包

如果`Makefile`中出现一些相同命令序列，那么我们可以为这些相同的命令序列定义一个变量。定义这种命令序列的语法以`define`开始，以`endef`结束，如：

```
define run-yacc
yacc $(firstword $^)
mv y.tab.c $@
endef
```

这里，`run-yacc`是这个命令包的名字，其不要和`Makefile`中的变量重名。在`define`和`endef`中的两行就是命令序列。这个命令包中的第一个命令是运行`yacc`程序，因为`yacc`程序总是生成`y.tab.c`的文件，所以第二行的命令就是把这个文件改改名字。还是把这个命令包放到一个示例中来看看吧。

```
foo.c : foo.y
$(run-yacc)
```

我们可以看见，要使用这个命令包，我们就好像使用变量一样。在这个命令包的使用中，命令包`run-yacc`中的`$^`就是`foo.y`，`$@`就是`foo.c`(有关这种以`$`开头的特殊变量，我们会在后面介绍)，`make`在执行命令包时，命令包中的每个命令会被依次独立执行。

## 7 使用变量

在`Makefile`中定义的变量，就像是`C/C++`语言中的宏一样，他代表了一个文本字串。在`Makefile`执行的时候会自动原木原样地展开在所使用的地方。其与`C/C++`不同的是，你可以在`Makefile`中改变其值。在`Makefile`中，变量可以使用在`目标`，`依赖目标`，`命令`或是`Makefile`的其他部分中。

传统的`Makefile`的变量名是全大写的命名方式，但我推荐使用大小写搭配的变量名，如：`MakeFlags`。这样可以避免和系统的变量名的冲突，而发生意外的事情。

### 6.1 变量的基础

变量在声明时要给予初值，而在使用时，需要给在变量名前面加上`$`符号，但最好使用小括号`()`或是大括号`{}`把变量名给包括起来。如果你要使用


### 6.2 变量中的变量

在定义变量的值时，我们可以使用其他的变量来构造变量的值。在`Makefile`中有两种方式来用变量定义变量的值。

### 6.3 变量的高级用法

这里介绍两种变量的高级使用方法，第一种是变量值的替换。我们可以替换变量中的共有部分，其格式是`$(var:a=b)`或是`${var:a=b}`，其意思是把变量`var`中所有以`a`字串结尾的`a`替换成`b`字串。这里的结尾的意思是空格或是结束符。

```
foo := a.o b.o c.o
bar := $(foo:.o=.c)
```

这个示例中，我们先定义了一个`$(foo)`变量，而第二行的意思是把`$(foo)`中所有以`.o`字串结尾全部替换成`.c`，所以我们的`$(bar)`的值就是`a.c b.c c.c`。

### 6.5 `override`指示符

如果有变量是通常`make`的命令行参数设置的，那么`makefile`中对这个变量的赋值会被忽略。

如果你想在`makefile`中设置这类参数的值，那么，你可以使用`override`指示符。其语法是：

```
override <variable>=<value>
override <variable>:=<value>
```

当然，你还可以追加：
```
override <variable>+=<more text>
```

对于多行的变量定义，我们用`define`指示符。在`define`指示符之前，也同样可以使用`override`指示符，如：

### 6.6 多行变量

还有一种设置变量值的方法是使用`define`关键字。使用`define`关键字设置变量的值可以有换行，这有利于定义一系列的命令（前面我们讲过`命令包`的技术就是利用这个关键字）。

`define`指示符后面跟的而是变量的名字，而重启一行定义变量的值，定义是以`endef`关键字结束。其工作方式和`=`操作符一样。变量的值可以包含函数/命令/文字，或是其他变量。因为命令需要以`TAB`开头，所以如果你使用`define`定义的命令变量中没有以`TAB`键开头，那么`make`就不会把其认为是命令。

下面的这个示例展示了`define`的用法：

```
define two-lines
echo foo
echo $(bar)
endef
```

### 6.7 环境变量

`make`运行时的系统环境变量可以在`make`开始运行时被载入到`makefile`文件中，但是如果`makefile`中已定义了这个变量，或是这个变量由`make`命令行带入，那么系统的环境变量值将被覆盖。（如果`make`指定了`-e`参数，那么系统环境变量将覆盖`makefile`中定义的变量）

因此，如果我们在环境变量中设置了`CFLAGS`环境变量，那么我们就可以在所有的`Makefile`中使用这个变量了。这对于我们使用统一的编译参数有比较大的函数。如果`Makefile`中定义了`CFLAGS`，那么则会使用`Makefile`这个变量。如果没有定义则使用系统环境变量的值，一个共性和个性的统一。

当`make`嵌套调用时（参见前面的`嵌套调用`章节）


### 6.9 模式变量

在`GNU`的`make`中，还支持模式变量(`Pattern-specific Variable`)，通过上面的目标变量中，我们知道，变量可以定义在某个目标上。模式变量的好处就是，我们可以给定一种`模式`，可以把变量定义在符合这种模式的所有目标上。


### 
