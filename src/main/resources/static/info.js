$(document).ready(function GetInfo() {

    let count = document.querySelector(".out");

    fetch('user')
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +  response.status);
                    return;
                }
                response.json().then(function(data) {
                    let out="";
                    for(key in data){
                        data[key].forEach(function (user){
                            out+=`<td> ${user.id} </td>`
                            out+=`<td> ${user.firstName} </td>`
                            out+=`<td> ${user.lasName} </td>`
                            out+=`<td> ${user.age} </td>`
                            out+=`<td> ${user.username} </td>`
                        })
                    }
                    count.innerHTML = out;
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

    window.onload = () =>{
        GetInfo();
    };
})

