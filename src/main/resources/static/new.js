$(document).ready( function () {
    document.getElementById('newForm').addEventListener('submit', submitForm);

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

        console.log(JSON.stringify(obj))

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
            },
            function (error) {
                console.error(error);
            }
        );



        console.log('Запрос отправляется')
    }
})