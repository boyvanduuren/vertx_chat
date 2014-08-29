var console = require("vertx/console");
var container = require("vertx/container");

container.deployModule("io.vertx~mod-web-server~2.0.0-final", {
    port: 8080,
    bridge: true,
    inbound_permitted: [
        { address: "chat.sendMessage" },
        { address: "chat.loginUser" }
    ],
    outbound_permitted: [
        { address: "chat.newMessage" },
        { address: "chat.newUser" },
    ]
});

container.deployVerticle("chat.js", function(err, res) {
    console.log("chat.js deployed: " + res + " " + err);
});
