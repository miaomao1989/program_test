co = coroutine.create(function ()
	print("one")
	coroutine.yield()
	print("two")
	return 6, 7
end)

coroutine.resume(co, 1, 2, 3, 4)
print(coroutine.resume(co, 1, 2, 3, 4))


co1 = coroutine.create (function (x)
	print("co1", x)
	print("co2", coroutine.yield(x))
end)

coroutine.resume(co1, "hi")			--> co1 hi
coroutine.resume(co1, 4, 5)			--> co2 4 5
