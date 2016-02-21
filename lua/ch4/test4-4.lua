if a < 0 then
	a = 0
end

if a < b then
	return a
else
	return b
end

if line > MAXLINES then
	showpage()
	line = 0
end

if op == "+" then
	r = a + b
	elseif op == "-" then
		r = a - b
		elseif op == "*" then
			r = a * b
			elseif op == "/" then
				r = a / b
				else
					error("invalid operation")
				end

local i = 1
while a[i] do
	print(a[i])
	i = i + 1
end

-- print the first ono-empty input line
repeat
	line = io.read()
until line ~= ""

print(line)


local sqr = x/2
repeat
	sqr = (sqr + x/sqr)/2
	local error = math.abs(sqr^2 - x)
until error < x/10000			-- local 'error' still visible here


for i = 1, f(x) do
	print(i)
end

for i = 10, 1, -1 do
	print(i)
end

for i = 1, math.huge do
	if(0.3*i^3 - 20*i^2 - 500 >= 0) then
		print(i)
		break
	end
end

-- print all values of table 't'
for k, v in pairs(t) do 
	print(k, v)
end


revDays = {}
for k, v in pairs(days) do
	revDays[v] = k
end


local i = 1
while a[i] do
	if a[i] == v then
		return i
	end
end

function foo ()
	return		--<< syntax error
	-- 'return' is the last statement in the next block
	do return end	--ok
	<other statements>
end

while some_condition do
	::redo::
	if some_other_condition then
		goto continue
	elseif yet_another_condition then
		goto redo
	end
	<some_code>
	::continue::
end




	
		
