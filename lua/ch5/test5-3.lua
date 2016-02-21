function fwrite (fmt, ...)
	return io.write(string.format(fmt, ...))
end

fwrite("%d%d", 4, 5)

function nonils (...)
	local arg = table.pack(...)
	for i = 1, arg.n do
		if arg[i] == nil then
			return false 
		end
	end
	return true
end

print(nonils(2,3,nil))		--> false
print(nonils(2,3))			--> true
print(nonils())				--> true
print(nonils(nil))			--> false


function Window (options)
	-- check mandatory options
	if type(options.title) ~= "string" then
		error("no title")
	elseif type(options.width) ~= "number" then
		error("no width")
	elseif type(options.height) ~= "number" then
		error("no height")
	end

	-- everything else is optional
	_Window(options.title,
			options.x or 0,		-- default value
			options.y or 0,		-- default value
			options.width, options.height,
			options.wbackground or "white",		-- default
			options.border		-- default is false (nil)
			)
end

