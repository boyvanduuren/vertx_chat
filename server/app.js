var console = require("vertx/console");
var container = require("vertx/container");

container.deployModule("io.vertx~mod-web-server~2.0.0-final", {
    port: 8080,
    bridge: true,
    inbound_permitted: [
        { address: "chat.sendMessage" }
    ],
    outbound_permitted: [
        { address: "chat.newMessage" }
    ]
});

container.deployVerticle("listen.js", function(err, res) {
    console.log("listen.js deployed: " + res + " " + err);
});
