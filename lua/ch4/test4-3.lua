local a, b = 1, 10
if a < b then
	print(a)		--> 1
	local a			-- '=nil' is implicit
	print(a)		--> nil
end

print(a, b)			--> 1 10
