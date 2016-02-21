function string_concate (...)
	local arg = table.pack(...)
	local result = ""
	for i = 1, arg.n do
		if type(arg[i]) == "string" then
			result = result .. arg[i]
		end
	end
	return result
end

print(string_concate("hello", "world", "I", "am", "miaom", "ao"))

