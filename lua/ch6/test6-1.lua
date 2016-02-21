a = { p = print }
a.p("hello world")			--> Hello world
print = math.sin			--> 'print' now refers to the sine function
a.p(print(1))				--> 0.841470
sin = a.p					-- 'sin' now refers to the print function
sin(10, 20)					--> 10	20

