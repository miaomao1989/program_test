function getfield (f)
	local v = _G
	for w in string.gmatch(f, "[%w_]+") do
		v = v[w]
	end
	return v
end

function setfield (f, v)
	local t = _G
	for w, d in string.gmatch(f, "([%w_]+)(%.?)") do
		if d == "." then
			t[w] = t[w] or {}
			t = t[w]
		else
			t[w] = v
		end
	end
end

setfield("t.x.y", 10)
print(t.x.y)
print(getfield("t.x.y"))
