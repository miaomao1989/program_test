local print, sin = print, math.sin		-- local print and sin reference to global print and math.sin

_ENV = nil								-- global variables invalid
print(13)								--> 13
print(sin(13))							--> sin(13)
print(math.cos(13))						--> error


