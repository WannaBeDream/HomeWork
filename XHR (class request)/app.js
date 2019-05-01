const URL = 'https://jsonplaceholder.typicode.com/';
const QUERY_USERS = 'users';

class Users {
    constructor(elem) {
        this.elem = elem;
        this.request = request;

        this.init();
    }

    init() {
        this.request('get', `${URL}${QUERY_USERS}`, this.toRenderUserData.bind(this));
        // this.elem.addEventListener('click', this.onClickUserString.bind(this));

    }

    toRenderUserData(respObj) {
        let userTemplate = document.getElementById('userTemplate').innerHTML;
        let dataForFillHtml = '';

        respObj.forEach((item) => {
            dataForFillHtml += userTemplate
                .replace('{{id}}', item.id)
                .replace('{{name}}', item.name)
                .replace('{{phone}}', item.phone)
                .replace('{{email}}', item.email)
        })

        this.elem.children[1].innerHTML = dataForFillHtml;
    }

    // onClickUserString(e) {
    //     let id = e.target.parentElement.dataset.userId;
    //     this.request('get',`${URL}${QUERY_USERS}${id}`, this.toRenderUserPosts.bind(this));
    // }


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

