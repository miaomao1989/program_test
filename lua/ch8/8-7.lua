local status, err = pcall(function () a = 'a' + 1 end)
print(err)
-- print(debug.traceback())
