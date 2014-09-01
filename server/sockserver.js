var console = require("vertx/console");
var http = require("vertx/http");
var sockjs = require("vertx/sockjs");

var httpServer = http.createHttpServer();
var sockJSServer = sockjs.createSockJSServer(httpServer);

sockJSServer.bridge(
    { prefix : "/eventbus" },
    [
        { address: "chat.sendMessage" },
        { address: "chat.loginUser" }
    ],
    [
        { address: "chat.newMessage" },
        { address: "chat.newUser" }
    ]
);

sockJSServer.on("socket-created", function(socket) {
    console.log("socket created: " +
        socket[0].writeHandlerID());
    return true;
});
sockJSServer.on("socket-closed", function(socket) {
    console.log("socket closed: " +
        socket[0].writeHandlerID());
});
httpServer.listen(8080);
