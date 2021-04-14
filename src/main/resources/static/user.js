$(document).ready(function () {

    $('#v-pills-user-tab').on('click', async function (event) {
        event.preventDefault();
        fetch('user',{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            success: function (info) {
                let rows = "";
                $.each(info, function (key, value) {
                    // добавляем полученные элементы в таблицу
                    rows += value;
                });
                $("table tbody").append(rows);
            }
        }).then(response => response.json());
    });


});