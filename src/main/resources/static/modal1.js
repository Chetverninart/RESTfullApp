$(document).ready( function () {

    $('.table .eBtn').on('click', function (event) {
        event.preventDefault()
        console.log('click')

        let href = $(this).attr('href');

        fetch(href).then(
            res=>{
                res.json().then(
                    data=> {
                        console.log(data);

                    })
            })

        $('.myForm #eModal').modal();


    })

})