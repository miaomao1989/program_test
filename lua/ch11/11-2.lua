reserved = {
	["while"] = true, ["end"] = true,
	["function"] = true, ["local"] = true,
}

for w in allwords() do
	if not reserved[w] then
		<do something with 'w'>			-- 'w' is not a reserved word
	end
end


function Set (list)
	local set = {}
	for _, l in ipairs(list) do set[l] = true end
	return set
end

reserved = Set{"while", "end", "function", "local", }


function insert (bag, element)
	bag[element] = (bag[element] or 0) + 1
end

function remove (bag, element)
	local count = bag[element]
	bag[element] = (count and count > 1) and count - 1 or nil
end

local buff = ""
for line in io.lines() do
	buff = buff .. line .. "\n"
end

local t = {}
for line in io.lines() do
	t[#t + 1] = line
end
s = table.concat(t, "\n") .. "\n"
