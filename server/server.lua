ESX = nil

TriggerEvent('exilerp:getSharedObject', function(obj) ESX = obj end)



ESX.RegisterServerCallback('e-hud:getTime', function(source, cb)
	local t = os.date("*t")
	if string.len(tostring(t.hour)) == 1 then
		t.hour = '0'..t.hour
	end

	if string.len(tostring(t.min)) == 1 then
		t.min = '0'..t.min
	end

	local currTime = (t.hour..':'..t.min)

	cb(currTime)
end)