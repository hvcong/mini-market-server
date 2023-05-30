// socket io
// socket start
const http = require("http");
const { Server } = require("socket.io");
let server = null;
let io = null;
let socket = null;
function socketInit(app, port) {
  server = http.createServer(app);
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (_socket) => {
    socket = _socket;

    socket.on("join_room_employee", () => {
      console.log("employee join room");
      socket.join("employee");
    });

    socket.on("have_new_order", () => {
      console.log("have new order");
      _socket.broadcast.to("employee").to("customer").emit("have_new_order");
    });

    socket.on("join_room_customer", () => {
      console.log("customer join room");
      socket.join("customer");
    });
  });

  return server;
}

module.exports = {
  socket,
  socketInit,
};
