$(document).ready( function () {
    let count = document.querySelector(".userT");
    fetch("user").then(
        res=>{
            res.json().then(
                data=>{
                    console.log(data);
                    let html = ''
                    html +='<tr>'
                    html +='<td>' + data.id + '</td>'
                    html +='<td>' + data.firstName + '</td>'
                    html +='<td>' + data.lastName + '</td>'
                    html +='<td>' + data.age + '</td>'
                    html +='<td>' + data.username + '</td>'
                    html +='<td>' + data.roles + '</td></tr>'
                    count.innerHTML = html;
                }
                )
        }
        )
}
)
