local HttpService = game:GetService("HttpService")

local POLLURL = "http://localhost:3000/poll"

local response = HttpService:RequestAsync({
	Url = POLLURL + "?id=" + game.JobId,
	Method = "GET"
})

print(response.Body)