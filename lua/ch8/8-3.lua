print "enter function to be plotted (with variable `x'): "
local l = io.read()
local f = assert(load("return " .. l))
for i = 1, 20 do
	x = i			-- global `x' (to be visible from the chunk)
	print(string. rep("*", f()))
end
