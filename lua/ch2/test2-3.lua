a = {}
x = "y"
a[x] = 10		--> put 10 in field "y"
print(a[x])		--> 10		-- value of field "y"
print(a.x)		--> nil		-- value of field "x" (undefined)
print(a.y)		--> 10		-- value of field "y"


