require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const routes = require("./routes/routes");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust this to your frontend URL in production
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use("/api", routes);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at port :${PORT}`);
});

module.exports = { io };