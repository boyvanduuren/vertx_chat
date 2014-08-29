var eventBus = require("vertx/event_bus");
var console = require("vertx/console");

var userList = {};

eventBus.registerHandler("chat.sendMessage", function(args) {
    console.log("received: " + args.message + " " + args.UUID);
    for (user in userList) {
        if (userList[user] === args.UUID) {
            eventBus.publish("chat.newMessage", user + ": "
                + args.message);
        }
    }
});

eventBus.registerHandler("chat.loginUser", function(args, responder) {
    var response = {};
    // TODO: support multicase nick
    var nickname = args.toLowerCase();

    if (nickname in userList) {
        response.success = false;
        response.message = "Nickname already in use";
        console.log("login failed");
        responder(response);

    } else {
        // TODO: valid names"
        // check if nick is unique, if it is:
        // - add to userList
        // - respond with UUID
        response.success = true;
        response.UUID = java.util.UUID.randomUUID().toString();
        userList[nickname] = response.UUID;
        eventBus.publish("chat.newUser", nickname);
        responder(response);
    }
});
