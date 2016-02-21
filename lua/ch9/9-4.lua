co = coroutine.create(function ()
	for i = 1, 10 do
		print("co", i)
		coroutine.yield()
	end
end)

for i = 1, 11 do
	coroutine.resume(co)			--> co 1
end


print(coroutine.status(co))		--> suspend
coroutine.resume(co)			--> co 1
print(coroutine.status(co))		--> suspend
