var eventBus = require("vertx/event_bus");
var console = require("vertx/console");

eventBus.registerHandler("chat.sendMessage", function(args) {
    console.log("received: " + args);
    eventBus.publish("chat.newMessage", args);
});
