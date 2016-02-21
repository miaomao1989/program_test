function producer ()
	while true do
		local x = io.read()			-- produce new value
		send(x)
	end
end

function consumer ()
	while true do
		local x = receive ()		-- receive value from producer
		io.write(x, "\n")			-- consume it 
	end
end
