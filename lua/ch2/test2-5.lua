i = 10;
j = "10";
k = "+10";

a = {}
a[i] = "one value"
a[j] = "another value"
a[k] = "yet another value"

print(a[i])			--> one value
print(a[j])			--> another value
print(a[k])			--> yet another value
print(a[tonumber(j)])	--> one value
print(a[tonumber(k)])	--> one value


