local count = 0
function Entry (b) count = count + 1 end

dofile("db1.lua")

print("number of entries: " .. count)


local authors = {}
function Entry (b) authors[b[1]] = true end

dofile("data")
for name in pairs(authors) do print(name) end
