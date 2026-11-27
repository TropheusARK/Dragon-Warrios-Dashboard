# Dragon-Warrios-Dashboard

A full-stack web dashboard integrating player statistics from Dragon Warriors, a Roblox game I've been developing for five years, into a React frontend through a Node.js/Express API. Explores game-to-web integration, server-side validation, and player data visualization.

My Roblox game uses ProfileStore to manage player data and retrieve the necessary statistics. In Roblox, I use HttpService to serialize the data into JSON and send an HTTP POST request. For testing, I used Cloudflare Quick Tunnel to temporarily expose my local Express server.

My Express server authenticates incoming requests using an API key. It validates the incoming data and stores it inside an in-memory JavaScript Map. My React frontend accesses and retrieves the player's data through an HTTP GET request and then displays it.

# Features

- Anyone can retrieve another player's stats using their UserId, provided that the player has joined the game.
- The frontend dashboard displays the player's name, level, EXP, maximum EXP, gold, and gems.
- Roblox automatically sends the data to the backend, which either creates or updates the player's record.
- The frontend includes loading states and corresponding error messages.
- For this build, player data is held within an in-memory JavaScript Map and is not saved permanently.

# Architecture

**Data Transmission (POST)**

```text
Roblox (ProfileStore)
        |
        v
Luau (HttpService)
(JSON encoding + HTTP POST request)
        |
        v
Cloudflare Quick Tunnel
(Exposes local Express server to Roblox)
        |
        v
Express API
(API-key authentication + request validation)
        |
        v
JavaScript Map
(Stores player statistics in memory)
```

**Data Retrieval (GET)**

```text
React Frontend
(Sends HTTP GET request using Roblox UserId)
        |
        v
Express API
(Retrieves requested player data)
        |
        v
JavaScript Map
(Looks up stored player statistics)
        |
        v
Express API
(Returns player data to frontend)
        |
        v
React Frontend
(Displays retrieved player data)
```

# Tools

- **Languages:** JavaScript, Luau
- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Data handling:** JSON, JavaScript Map
- **Roblox:** Roblox Studio, ProfileStore, HttpService
- **Testing / Tunneling:** Cloudflare Quick Tunnel
- **Environment configuration:** dotenv

# Technical Limitations

- Player data is stored in an in-memory JavaScript Map and is not persisted. All stored data is lost when the backend server restarts.
- The GET endpoint does not require authentication, allowing public retrieval of player statistics by UserId, which is intended.
- Cloudflare Quick Tunnel generates temporary URLs that may change when the tunnel restarts.
- Reproducing the live Roblox integration requires configuring a separate Roblox environment, API key, and active Cloudflare Tunnel URL.