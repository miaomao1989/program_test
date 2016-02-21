a = 2
do 
	local _ENV = {print = print, a = 14}
	print(a)				--> 14
end
print(a)					--> 2 (back to the original _ENV)
