
// const URL = 'https://jsonplaceholder.typicode.com/posts';


function request(method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}






/****** Function to make request *******
USAGE: 
request('get', 'http://exmaple.com', (resp)=> {console.log(resp)} );
*/


class Users {
  static BASE_URL = 'https://jsonplaceholder.typicode.com';
  static USERS_PATH = '/users';
  static POSTS_PATH = '/posts';
  static USER_ROW_TEMPLATE = document.getElementById('userTemplate').innerHTML;

  constructor(container) {
    this.container = container;
    this.init();
  }

  init() {
    this.onBodyClick = this.onBodyClick.bind(this);

    this.tbody = this.container.getElementsByTagName('tbody')[0];
    this.tbody.addEventListener('click', this.onBodyClick)
      
    this.fetchUsers();
  }

  onBodyClick(e) {
    const id = e.target.parentNode.dataset.userId;

    this.fetchUserPosts(id);
  }

  fetchUsers() {
    request('get', Users.BASE_URL + Users.USERS_PATH)
      .then((usersList) => {
        this.tbody.innerHTML = usersList.map((user) => {
          return Users.USER_ROW_TEMPLATE
            .replace('{{id}}', user.id)
            .replace('{{name}}', user.name)
            .replace('{{phone}}', user.phone)
            .replace('{{email}}', user.email)
        }).join('\n');
      })

  }


  fetchUserPosts(userId) {
    const url = Users.BASE_URL + Users.POSTS_PATH + '?userId=' + userId;

    request('get', url)
      .then((posts) => console.log(posts))
  }

  

}

const usersList = new Users(
  document.getElementById('usersListTable')
)












































// const URL = 'http://5b2153d4ca762000147b2730.mockapi.io/users';
// // const request = function () {
// //     const xhr = new XMLHttpRequest
// //     return function (method, url, body, callback) {
// //         xhr.open(method, url)
// //         xhr.onload = () => callback(JSON.parse(xhr.responseText));

// //         xhr.send(JSON.stringify(body));
// //     }
// // }();

// // request('get', URL, null, (data) => {
// //     console.log(data);


// //     const user = {
// //         name: 'Alex',
// //         surname: 'Bob',
// //         age: 13
// //     }

// //     request('post', URL, user, (data) => {
// //         console.log(data);

// //         request('get', URL, null, (data) => {
// //             console.log(data);
// //         })
// //     })
// // })

// // // promise паттерн проектироваия(для удобства работы с асинхр коллбеками) для помощи работы с асинхроностью и избегания уровня воженности колбека
// // // промис функция конструктор , в ES6 нативная функция конструктор (учить только es6 тк есть полифилы )




// //resolve - успешный promise 
// //rejected - ошибка  
// // не может перейти в другое состояние после того как получил первое 


// function request(method, url, body = null) {

//     return new Promise((resolve, reject) => {

//         const xhr = new XMLHttpRequest;
//         xhr.open(method, url);

//         xhr.onload = () => {
//             if (xhr.status < 300) {
//                 resolve(JSON.parse(xhr.responseText));
//             } else {
//                 reject(JSON.parse(xhr.responseText));

//             }
//         }
//         xhr.onerror = () => reject(JSON.parse(xhr.responseText));

//         xhr.send(JSON.stringify(body));

//     }

//     )
// }

// const prom = request('get', URL)

// prom.then(() => request('post', URL, { name: 'Alex', surname: 'Bob', age: 15 }))
//     .then(() => request('get', URL))
//     .then((another) => console.log(another))

// // prom.then((data) => { // первый аргумент через onload + 2 колбека в 1 асинхронном действии 
// //     console.log(data);
// // })

// // prom.then((data) => { console.log(data); return 'hello' })
// //     .then((another) => console.log(another));


// // prom.then((data) => data.map(user => user.name))


// prom.catch(() => { // второй аргумент через onerror
//     console.log('error');
// })

// prom.finally(() => { //вызовется в любом случае после then catch
//     console.log('done');
// })






