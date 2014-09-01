var console = require("vertx/console");
var container = require("vertx/container");

container.deployVerticle("sockserver.js", function(err, res) {
    console.log("sockserver.js deployed: " + res + " " + err);
});

container.deployVerticle("chat.js", function(err, res) {
    console.log("chat.js deployed: " + res + " " + err);
});
