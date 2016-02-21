co = coroutine.create(function (a, b, c)
	print("co", a, b, c + 2)
end)

coroutine.resume(co, 1, 2, 3)			--> co 1 2 5

co = coroutine.create(function (a, b)
	coroutine.yield(a + b, a - b)
end)

print(coroutine.resume(co , 20, 10))
