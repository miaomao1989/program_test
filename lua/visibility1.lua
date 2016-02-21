x = 10
do
	local x = x
	print(x)
	x = x + 1
	do
		local x = x + 1
		print(x)
	end
	print(x)
end
print(x)
