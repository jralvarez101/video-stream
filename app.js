//jshint eversion: 6

const express = require("express");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const staticRouter = require("./routes/static");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", staticRouter);

io.on("connection", function (socket) {
  socket.on("stream", function (image) {
    socket.broadcast.emit("stream", image);
  });
});

http.listen(PORT, function () {
  console.log("server is running in ", PORT);
});
