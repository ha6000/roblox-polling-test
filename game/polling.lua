local HttpService = game:GetService("HttpService")
local SERVERURL = "http://localhost:3000"

local module = {
	Message = BindableEvent()
}


module.ResponseMessage = {
	data = "",
	id = ""
}

function module.ResponseMessage:new(o)
	o = o or {}
	setmetatable(o, self)
	self.__index = self
	return o
end

function module.ResponseMessage:reply(message)
	return HttpService.RequestAsync({
		Url = SERVERURL + "/respond?game=" + game.JobId,
		Headers = {
			["Response-Id"] = self.id
		}
	})
end

function module:sendPollRequest()
	local success, response = pcall(HttpService:RequestAsync({
		Url = SERVERURL + "/poll?game=" + game.JobId,
		Method = "GET"
	}))
	if success then
		local message = ResponseMessage:new({
			data = response.Body,
			id = response.Headers["Response-Id"]
		})
		self.Message.Fire(message)
		return message
	else return nil
end

return module