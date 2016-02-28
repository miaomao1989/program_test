##  CH8 标准IO库

`cin`: 读入标准输入的`istream`对象;
`cout`: 输出标准错误的`ostream`对象;
`cerror`: 输出标准错误的`ostream`对象. `cerror`常用于错误信息.
`>>`操作符,用于从`istream`对象中读入输入;
`<<`操作符,用于把输出写到`ostream`对象中;

出于某些原因,标准库类型不允许做复制或者赋值操作.这个要求有两层含义.第一个含义是:由于流对象不能复制,因此不能存储在`vexcotor`(或其他)容器中(即不存在存储流对象的`vector`或其他容器);第二个含义是:形参或返回类型也不能是流类型.如果需要传递或者返回`IO`对象,则必须传递或返回指向该对象的指针或引用.

一般情况下,如果需要传递`IO`对象以便对它进行读写,可用非`const`引用的方式传递这个流的对象.对`IO`对象的读写会改变它的状态,因此引用必须是非`const`的.

流的状态由`bad`,`fail`,`eof`和`good`操作揭示.如果`bad`,`fail`或者`eof`中的任意一个为`true`,则检查流本身将显示流处于错误状态.类似地,如果这三个条件没有一个为`true`,则`good`操作将返回`true`.

```python
int ival;
// read cin and test only for EOF; loop is executed if there are other IO failures
while (cin >> ival, !cin.eof()){
	if (cin.bad())							//input stream is corrputed; bail out
    	throw runtime_error("IO stream corrputed");
    if (cin.fail()) {						// bad input
    	cerr << "bad data, try again";		// warn the user
        cin.clear(istream::goodbit);		// reset the stream
        cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');	//ignore bad inputs
        continue;							// get next input
    }
}
```

```python
//set both the badbit and the failbit
is.setstate(ifstream::badbit | ifstream::failbit)
```

每个`IO`对象管理一个缓冲区,用于存储程序读写的数据.如有下面语句:
```python
os << "please enter a value: ";
```
系统将字符串字面值存储在与流`os`相关联的缓冲区中.下面几种情况将导致缓冲区的内容被刷新,即写入到真实的输出设备或者文件.
(1) 程序正常结束.作为`main`返回工作的一部分,将清空所有输出缓冲区;
(2) 在一些不确定的时候,缓冲区可能已经满了,在这种情况下,缓冲区将会在写下一个值之前刷新.
(3) 用操纵符(manipulator, 1.2.2节)显式地刷新缓冲区,例如行结束符`endl`;
(4) 在每次输出操作执行完后, 用`unitbuf`操纵符设置流的内部状态,从而清空缓冲区;
(5) 可以将输出流与输入流关联(tie)起来.在这种情况下,在读输入流时将刷新其关联的输出流缓冲区;

```python
cout << "hi!" << flush;
cout << "hi!" << ends;
cout << "hi!" << endl;
```

```python
cout << unitbuf << "first" << " second" << nounitbuf;
```
等价于
```python
cout << "first" << flush << "second" << flush;
```

**如果因为缓冲区没有刷新,程序员将浪费大量的时间跟踪调试并没有执行的代码. 基于这个原因,输出时应多使用`endl`而非`\n`.** 使用`endl`则不必担心程序崩溃时输出是否悬而未决(即还留在缓冲区, 未输出到设备中).

当输入流和输出流绑在一起时,任何读入流的尝试都将首先刷新其输出流关联的缓冲区. 标准库`cout`与`cin`绑在一起.

如果程序员需要重用文件流读写多个文件,必须在读另一个文件之前调用`clear`清除该流的状态.

只要调用`open`函数,就要设置文件模式, 其模式的设置可以是显式的也可以是隐式的. 如果没有制定文件模式, 将使用默认值.

```python
ifstream input;
vector<string>::const_iterator it = files.begin()
// for each file in the vector
while ( it != files.end()){
	input.open(it->c_str());	// open the file
    //if the file is ok, read and process the input
    if(!input)
    	break;					// error: bail out!
    while(input >> s)			// do the work on this file
    	process(s);
    input.close();				// close file when we're done with it
    input.clear();				// reset state to ok
    ++it;						// incre
}
```