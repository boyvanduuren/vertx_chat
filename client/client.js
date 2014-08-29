var eventBus = new vertx.EventBus(window.location.protocol + "//" +
        window.location.hostname + ":8080/eventbus");
eventBus.onopen = function() {
        console.log("Registered to eventbus");
        $(".chat").submit(function() {
                eventBus.send("chat.sendMessage", $("#message").val());
                return false;
        });

        eventBus.registerHandler("chat.newMessage", function(args) {
                $(".chatarea").append(args + "<br />");
                $("#message").val("");
        });
}
