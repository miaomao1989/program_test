function receive ()
	local status, value = coroutine.resume(producer)
	return value
end

function send (x)
	coroutine.yield(x)
end

producer = coroutine.create(
	function ()
		while true do
			local x = io.read()			-- produce new value
			send(x)
		end
	end)

