$(document).ready( function () {
    let count = document.querySelector(".usersT");
    fetch("admin").then(
        res=>{
            res.json().then(
                data=> {
                    console.log(data);
                    let html = ''
                    if (data.length > 0) {
                        let html = ''
                        data.forEach((u) => {
                            html += '<tr>'
                            html += '<td>' + u.id + '</td>'
                            html += '<td>' + u.firstName + '</td>'
                            html += '<td>' + u.lastName + '</td>'
                            html += '<td>' + u.age + '</td>'
                            html += '<td>' + u.username + '</td>'
                            html += '<td>' + u.roles + '</td>'
                            html += '<td><button type="button" class="btn btn-primary eBtn" data-toggle="modal" data-target="#editModal\\' + u.id + '">Edit</button></td>'
                            html += '<td><button type="button" class="btn btn-danger delBtn" data-toggle="modal" data-target="#deleteModal\\' + u.id + '">Delete</button></td>'
                            html += '</tr>'
                            count.innerHTML = html;
                        })
                    }

                })
        })
})
