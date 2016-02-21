a = 1
local newgt = {}			-- create new environment
setmetatable(newgt, {__index = _G})
_ENV = newgt				-- set it
print(a)
a = 10
print(a)					--> 10
print(_G.a)					--> 1
_G.a = 20
print(_G.a)
-- a = 30
-- print(a)

_ENV = {_G = _G}

local function foo ()
	_G.print(a)			-- compiled as '_ENV._G.print(_ENV.a)'
end

a = 10					-- _ENV.a
foo()
_ENV = {_G = _G, a = 20}
foo()

--[[
a = 2
do
	local _ENV = {print = print, a = 14}
	print(a)			--> 14
end
print(a)
]]--
