x = 10
local i = 1		-- local to the chunk

while i <= x do
	local x = i*2	-- local to the while body
	print(x)		--> 2, 4, 6, 8, ...
	i = i + 1
end

if i > 20 then
	local x
	x = 20			-- local to the "then" body
	print(x + 2)	-- (would print 22 if test succeeded)
else
	print(x)		--> 10 (the global one)
end

print(x)			--> 10 (the global one)


