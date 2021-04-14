$(document).ready(function () {
    $.ajax("/admin", {
        dataType: "json", //или, например, "text"
        success: function (msg) { //msg - то, что придет с сервера, респонз
            alert("Прибыли данные: " + msg);
        }
    })
})

