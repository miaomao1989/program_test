local iterator			-- to be defined later

function allwords ()
	local state = { line = io.read(), pos = 1}
	return iterator, state
end

function iterator (state)
	while state.line do				-- repeat while there are lines
		-- search for next word
		local s, e = string.find(state.line, "%w+", state.pos)
		if s then			-- found a word ?
			-- update next position ( after this word)
			state.pos = e + 1
			return string.sub(state.line, s, e)
		else		-- word not found
			state.line = io.read()		-- try next line ...
			state.pos = 1				-- ... from first position
		end
	end
	return nil							-- no more lines : end loop
end 


-- use closure for iterator

function allwords ()
	local line = io.read()			-- current line
	local pos = 1					-- current position in the line
	return function ()				-- iterator function
		while line do				-- repeat while there are lines
			local s, e = string.find(line, "%w+", pos)
			if s then				-- find a word?
				pos = e + 1			-- next position is after this word
				return string.sub(line, s, e)
			else
				line = io.read()	-- word not found; try next line
				pos = 1
			end
		end
		return nil					-- no more lines: end of traversal
	end
end 

for word in allwords() do
	print(word)
end


function allwords (f)
	-- repeat for each line in the file
	for l in io.lines () do
		-- repeat for each word in the line
		for w in string.gfind(l, "%w+") do
			-- call the function
			f(w)
		end
	end
end

allword(print)

local count = 0
allwords(function (w)
	if w == "hello" then
		count = count + 1
	end
end)
print(count)

loadstring(s)()

assert(loadstring(s))()

