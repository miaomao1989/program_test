a = 1

-- setfenv(1, {})

setfenv(1, { g = _G })
-- print(a)
print(g.a)
