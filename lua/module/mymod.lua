local HaoModel = {}

local function getname()
	return "Hao Chen"
end

function HaoModel.Greeting()
	printf("Hello, My name is "..getname())
end

return HaoModel

