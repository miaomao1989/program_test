function foo (x)
	return 2*x
end


foo = function (x)
	return 2*x
end

network = {
	{name = "grauna", IP = "210.26.30.34"},
	{name = "arrival", IP = "210.26.30.23"},
	{name = "lua", IP = "210.26.23.13"},
	{name = "derain", IP = "210.26.23.20"},
}

table.sort(network, function (a, b) return (a.name > b.name) end)

print(network)
