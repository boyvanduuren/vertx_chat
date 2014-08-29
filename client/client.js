var eventBus = new vertx.EventBus(window.location.protocol + "//" +
        window.location.hostname + ":8080/eventbus");
var UUID = "";

$(document).ready(function() {
    $(".chatcontainer").hide();
});

eventBus.onopen = function() {
    console.log("Registered to eventbus");
    $(".login").submit(function() {
        if (UUID === "") {
            eventBus.send("chat.loginUser", $("#nickname").val(),
                function(result) {
                    if (result.success) {
                        UUID = result.UUID;
                        $(".logincontainer").hide();
                        $(".chatcontainer").show();
                    } else {
                        alert(result.message);
                    }
                });
        } else {
            alert("already logged in");
        }
        return false;
    });

    $(".chat").submit(function() {
        var message = {
            "UUID" : UUID,
            "message": $("#message").val()
        };
        eventBus.send("chat.sendMessage", message);
        return false;
    });

    eventBus.registerHandler("chat.newMessage", function(args) {
        $(".chatarea").append(args + "<br />");
        $("#message").val("");
    });
}
