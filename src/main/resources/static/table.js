count1 = document.querySelector(".usersT");
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