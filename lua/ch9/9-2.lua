function receive ()
	local status, value = coroutine.resume(producer)
	return value
end

function send (x)
	coroutine.yield(x)
end

producer = coroutine.create( function ()
	while true do
		local x = io.read()			-- produce new value
		send(x)
	end
end)

function filter (prod)
	return coroutine.create(function ()
		local line = 1
		while true do
			local x = receive(prod)	-- get new value
