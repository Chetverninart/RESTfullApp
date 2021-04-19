function modals() {
    $('.eBtn').click(function (event) {
        event.preventDefault();

        $('#idE').val($(this).parent().parent().children('td:nth-child(1)').text())
        $('#firstNameE').val($(this).parent().parent().children('td:nth-child(2)').text())
        $('#lastNameE').val($(this).parent().parent().children('td:nth-child(3)').text())
        $('#ageE').val($(this).parent().parent().children('td:nth-child(4)').text())
        $('#usernameE').val($(this).parent().parent().children('td:nth-child(5)').text())

        $('#editModal').modal('show')

        document.getElementById('editForm').addEventListener('submit', submitFormE);

        function submitFormE(event) {
            event.preventDefault();
            // event.target — это HTML-элемент form
            let formData = new FormData(event.target);
            // Собираем данные формы в объект
            let obj = {};
            formData.forEach((value, key) => obj[key] = value);
            let select = document.getElementById('selectE')
            let optArr = select.selectedOptions
            let rolesArr = []
            for (let item of optArr) {
                if (item.label === 'User') {
                    rolesArr.push('ROLE_USER')
                } else if (item.label === 'Admin') {
                    rolesArr.push('ROLE_ADMIN')
                }
            }
            obj.roles = rolesArr
            console.log(obj)
            // Собираем запрос к серверу
            let request = new Request(event.target.action, {
                method: 'PATCH',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            fetch(request).then(
                function (response) {
                    console.log(response);
                    $('#editModal').modal('hide')
                    $.ajax({
                        type: "GET",
                        url: "table.js",
                        dataType: "script"
                    });
                },
                function (error) {
                    console.error(error);
                }
            )


        }

    })

    $('.delBtn').click(function (event) {
        event.preventDefault();

        $('#idD').val($(this).parent().parent().children('td:nth-child(1)').text())
        $('#firstNameD').val($(this).parent().parent().children('td:nth-child(2)').text())
        $('#lastNameD').val($(this).parent().parent().children('td:nth-child(3)').text())
        $('#ageD').val($(this).parent().parent().children('td:nth-child(4)').text())
        $('#usernameD').val($(this).parent().parent().children('td:nth-child(5)').text())

        $('#delModal').modal('show')

        document.getElementById('deleteForm').addEventListener('submit', submitFormD);

        function submitFormD(event) {
            event.preventDefault();
            // event.target — это HTML-элемент form
            let formData = new FormData(event.target);
            // Собираем данные формы в объект
            let obj = {};
            formData.forEach((value, key) => obj[key] = value);
            let select = document.getElementById('selectD')
            let optArr = select.selectedOptions
            let rolesArr = []
            for (let item of optArr) {
                if (item.label === 'User') {
                    rolesArr.push('ROLE_USER')
                } else if (item.label === 'Admin') {
                    rolesArr.push('ROLE_ADMIN')
                }
            }
            obj.roles = rolesArr
            console.log(obj)
            // Собираем запрос к серверу
            let request = new Request(event.target.action, {
                method: 'DELETE',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            fetch(request).then(
                function (response) {
                    console.log(response);
                    $('#delModal').modal('hide')
                    $.ajax({
                        type: "GET",
                        url: "table.js",
                        dataType: "script"
                    });
                },
                function (error) {
                    console.error(error);
                }
            )
        }

    })

}


function table() {
    let count1 = document.querySelector(".usersT");
    console.log('users')
    fetch('admin').then(
        res => {
            res.json().then(
                data => {
                    if (data.length > 0) {
                        let html = ''
                        data.forEach((u) => {
                            html += '<tr id="user' + u.id + '">'
                            html += '<td>' + u.id + '</td>'
                            html += '<td>' + u.firstName + '</td>'
                            html += '<td>' + u.lastName + '</td>'
                            html += '<td>' + u.age + '</td>'
                            html += '<td>' + u.username + '</td>'
                            html += '<td>' + u.roles + '</td>'
                            html += '<td><button type="button" class="btn btn-primary eBtn">\n' +
                                '  Edit\n' +
                                '</button></td>'
                            html += '<td><button type="button" class="btn btn-danger delBtn">\n' +
                                '  Delete\n' +
                                '</button></td>'
                            html += '</tr>'

                        })
                        count1.innerHTML = html;
                    }
                    modals()
                })
        })
}
table()

let count2 = document.querySelector(".userT");
console.log('user')
fetch("user").then(
    res => {
        res.json().then(
            data => {
                console.log(data);
                let html = ''
                html += '<tr>'
                html += '<td>' + data.id + '</td>'
                html += '<td>' + data.firstName + '</td>'
                html += '<td>' + data.lastName + '</td>'
                html += '<td>' + data.age + '</td>'
                html += '<td>' + data.username + '</td>'
                html += '<td>' + data.roles + '</td></tr>'
                count2.innerHTML = html;
            })
    })

document.getElementById('newForm').addEventListener('submit', submitForm);
console.log('new')

function submitForm(event) {
    event.preventDefault();
    // event.target — это HTML-элемент form
    let formData = new FormData(event.target);
    // Собираем данные формы в объект
    let obj = {};
    formData.forEach((value, key) => obj[key] = value);
    let select = document.getElementById('select')
    let optArr = select.selectedOptions
    let rolesArr = []
    for (let item of optArr) {
        if (item.label === 'User') {
            rolesArr.push('ROLE_USER')
        } else if (item.label === 'Admin') {
            rolesArr.push('ROLE_ADMIN')
        }
    }
    obj.roles = rolesArr
    // Собираем запрос к серверу
    let request = new Request(event.target.action, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    fetch(request).then(
        function (response) {
            console.log(response);
            $.ajax({
                type: "GET",
                url: "table.js",
                dataType: "script"
            });
            window.location.reload()
        },
        function (error) {
            console.error(error);
        }
    )
}
