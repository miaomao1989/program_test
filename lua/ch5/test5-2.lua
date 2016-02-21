function foo0 ()
end

function foo1 ()
	return "a"
end

function foo2 ()
	return "a", "b"
end

function foo3()
	return "a", "b", "c"
end

print(foo2())				--> a b
print(foo2(), 1)			--> a 1
print(foo2() .. "x")		--> ax	(see next)
print(foo3(), 2)
print(foo3() .. "x")

t = {foo0()}
t = {foo1()}
t = {foo2()}
t = {foo3()}

function foo (i)
	if i == 0 then
		return foo0()
	elseif i == 1 then 
		return foo1()
	elseif i == 2 then return foo2()
	end
end

print(foo(1))		--> a
print(foo(2))		--> a b
print(foo(0))		--> (no results)
print(foo(3))		--> (no results)

print((foo0()))		--> nil
print((foo1()))		--> a
print((foo2()))		--> a

f = string.find
a = {"hello", "ll"}
print(f(table.unpack(a)))


function unpack (t, i, n)
	i = i or 1
	n = n or #t
	if i <= n then
		return t[i], unpack(t, i + 1, n)
	end
end

print(unpack({"hello", "world", "miao", "mao"}, 2, n))

function add (...)
	print(table.unpack({...}))
	print(...)
	local s = 0
	for i, v in ipairs{...} do
		s = s + v
	end
	return s
end

print(add(3, 4, 10, 25, 12))		--> 54


function id (...)
	return ...
end
