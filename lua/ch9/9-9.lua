function permgen (a,n)
	n = n or #a
	if n <= 1 then
		coroutine.yield(a)			-- suspend and return table a
	else
		for i = 1, n do
			-- put i-th element as the last one
			a[n], a[i] = a[i], a[n]
			-- generate all permutations of the other elements
			permgen(a, n -1)
			-- restore i-th element
			a[n], a[i] = a[i], a[n]
		end
	end
end

function permutations (a)
	local co = coroutine.create(function () permgen (a) end)
	return function ()			-- iterator
		local code, res = coroutine.resume(co)		--[[ 这个地方充分利用了closure和coroutine的特点。每层递归到最后的n<=1时，通过调用yield暂停递归程序的执行，利用闭包返回当前递归的排序结果。然后通过for迭代，在permutation函数中又resume被暂停的permgen函数，继续下一层递归]]--
		return res
	end 
end

function printResult (a)
	for i = 1, #a do
		io.write(a[i], " ")
	end
	io.write("\n")
end

for p in permutations{"a", "b", "c"} do
	printResult(p)
end
