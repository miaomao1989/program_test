function setDefault (t, d)
	local mt = {__index = function () return d end}
	setmetatable(t, mt)
end

tab = {x=10, y=20}
print(tab.x, tab.z)			--> 10 nil
setDefault(tab, 0)
print(tab.x, tab.z)			--> 10 0






local key = {}				-- unique key

local mt = {__index = function (t) return t[key] end}
function setDefault (t,d)
	t[key] = d
	setmetatable(t, mt)
end
