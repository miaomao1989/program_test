function say667 ()
	local num = 666
	local sayAlert = function ()
		print(num)
	end
	num = num + 1
	return sayAlert
end

say667()
say667()
