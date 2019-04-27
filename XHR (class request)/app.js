const URL = 'https://jsonplaceholder.typicode.com/users';

class Users {
    constructor(elem) {
        this.elem = elem;
        this.init();
    }

    init() {
        request('get', URL, (respObj) => { this.toRenderUserData(respObj) });
    }

    toRenderUserData(respObj) {
        let userTemplate = document.getElementById('userTemplate').innerHTML;
        let dataForFillHtml = '';

        respObj.map((item) => {
            dataForFillHtml += userTemplate
                .replace('{{id}}', item.id)
                .replace('{{name}}', item.name)
                .replace('{{phone}}', item.phone)
                .replace('{{email}}', item.email);
        });

        this.elem.children[1].innerHTML = dataForFillHtml;
    }


}




/****** Function to make request *******
 USAGE: 
 request('get', 'http://exmaple.com', (resp)=> {console.log(resp)} );
 */


var request = function () {
    var xhr = new XMLHttpRequest();
    return function (method, url, callback) {
        xhr.onload = function () {
            callback(JSON.parse(xhr.responseText));
        };
        xhr.open(method, url);
        xhr.send();
    };
}();


const usersList = new Users(
    document.getElementById('usersListTable')
)

