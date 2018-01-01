var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000, function() {
    console.log("server is listening on 3000 port...");
});

app.get("/home", function(req, res) {
    res.render("home");
});

var userArray = [];
io.on("connection", function(socket) {
    console.log(socket.id + " is connecting!"); console.log();

    socket.on("disconnect", function() {
        console.log(socket.id + " is disconnected!");
    });

    socket.on("client_send_info", function(data) {
        console.log(data.name);
        console.log(data.email);
        userArray.push(new Student(data.name, data.email));
        io.sockets.emit("server_send_users", userArray);
    });
});

function Student(name, email) {
    this.name = name;
    this.email = email;
}