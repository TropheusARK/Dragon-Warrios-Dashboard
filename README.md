# Dragon-Warrios-Dashboard
A full-stack web dashboard integrating player statistics from Dragon Warriors, a Roblox game I've been developing for five years, into a React frontend through a Node.js/Express API. Explores game-to-web integration, server-side validation, and player data visualization.

My Roblox game uses ProfileStore to manage player data and then retrieved the necessary statistics, In Roblox I use HttpService serializes the data into JSON. I send that HTTP POST request. For the test runs I used Cloudflare Quick Tunnel to temporarily expose my local express server.

My Express then authenticated incoming requests using an API key. My Server validated the incoming data and then stored it inside a local non-saving JavaScript Map. My React frontend accessed and retrieved the player's data through an HTTP GET request, and then displayed it.
