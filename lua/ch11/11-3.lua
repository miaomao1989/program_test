local function name2node (graph, name)
	local node = graph[name]
	if not node then
		-- node does not exist; create a new one
		node = {name = name, adj = {}}
		graph[name] = node
	end
	return node
end

function readgraph ()
	local graph = {}
	for line in io.lines() do
		-- split line in two names
		local namefrom, nameto = string.match(line, "(%S+)%s+(%S+)")
		-- find corresponding nodes
		local from = name2node(graph, namefrom)
		local to = name2node(graph, nameto)
		-- adds 'to' to the adjacent set of 'from'
		from.adj[to] = true
	end
	return graph
end

function findpath (curr, to, path, visited)
	path = path or {}
	visited = visited or {}
	if visited[curr] then				-- node alread visited ?
		return nil						-- no path here
	end
	visited[curr] = true				-- mark node as visited
	path[#path + 1] = curr				-- add it to path
	if curr == to then					-- final node ?
		return path
	end
	-- try all adjacent nodes
	for node in pairs(curr.adj) do
		local p = findpath(node, to, path, visited)
		if p then return p end
	end
	path[#path] = nil 
end
