Account = {balance = -1}

function Account:withdraw (v)
	self.balance = self.balance - v
end

function Account:desposit (v)
--	self.balance = Account.balance + v
	self.balance = self.balance + v
end

function Account:new (o)
	o = o or {}
	setmetatable(o, self)
	self.__index = self
	return o
end


-- a = Account:new{balance = 1}
a = Account:new()				-- a will use Account as its metatable
a:desposit(100.00)
print(a.balance)
