line = io.read()	--read a line
n = tonumber(line)	--try to convert it to a number
if n == nil then
	error(line .. " is not a valid number")
else
	print(n*2)
end

