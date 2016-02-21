a = 15					-- create a global variable
_ENV = {g = _G}			-- change current environment
a = 1
g.print(a)
g.print(g.a)
