Lib = {}
Lib.foo = function (x,y)
	return x + y
end

Lib.foo = function (x,y)
	return x - y
end

print(Lib.foo(2, 3), Lib.goo(2,3))		--> 5	-1
