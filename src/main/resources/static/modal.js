$(document).ready( function () {

    $('.table .eBtn').on('click', function (event) {
        event.preventDefault();
        let href = $(this).attr('href');

        $.get(href, function (user) {
            $('.eModal #id').val(user.id);
            $('.eModal #username').val(user.username);
            $('.eModal #password').val(user.password);
        });
        $('.eModal #eModal').modal();
    });

    $('.table .delBtn').on('click', function (event) {
        event.preventDefault();
        let href = $(this).attr('href');
        $('.delModal #delRef').attr('href', href);
        $('.delModal').modal();
    });
});
