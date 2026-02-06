const WebSocket = require("ws");
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running");
});

const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 8080;

wss.on("connection", (ws) => {
  console.log("client connected");

  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("client disconnected");
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server listening on port", PORT);
});
