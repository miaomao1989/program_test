function producer ()
	while true do
		local x = io.read()			-- produce new value
		send(x)						-- send to consumer
	end
end

function consumer ()
	while true do
		local x = receive()			-- receive from producer
		io.write(x, "\n")			-- consume new value
	end
end
