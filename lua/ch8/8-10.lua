co = coroutine.create(function ()
	return 6,7
end)

print(coroutine.resume(co))
