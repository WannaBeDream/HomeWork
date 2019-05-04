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
  static ALBUMS_PATH = '/albums';
  static USER_ROW_TEMPLATE = document.getElementById('userTemplate').innerHTML;


  constructor(container) {
    this.container = container;
    this.init();
  }

  init() {
    this.onBodyClick = this.onBodyClick.bind(this);
    this.tbody = this.container.getElementsByTagName('tbody')[0];
    this.tbody.addEventListener('click', this.onBodyClick);

    this.fetchUsers();
  }

  onBodyClick(e) {
    const id = e.target.parentNode.dataset.userId;
    this.fetchUserPosts(id);
    this.fetchUserAlbums(id);
  }

  fetchUsers() {
    request('get', Users.BASE_URL + Users.USERS_PATH)
      .then((dataUsersList) => this.renderUsers(dataUsersList));

  }

  renderUsers(usersList) {
    this.tbody.innerHTML = usersList.map((user) => {
      return Users.USER_ROW_TEMPLATE
        .replace('{{id}}', user.id)
        .replace('{{name}}', user.name)
        .replace('{{phone}}', user.phone)
        .replace('{{email}}', user.email)
    }).join('\n');
  }

  // Рэндер тайтлов постов 
  fetchUserPosts(userId) {
    const url = Users.BASE_URL + Users.POSTS_PATH + '?userId=' + userId;

    request('get', url)
      .then((dataPosts) => this.fetchUserPostsSort(dataPosts))
      .then(() => this.renderUserPost());
  }

  fetchUserPostsSort(posts) {
    let titlesPost = ' ';
    this.userPosts = posts.map((user) => {
      return titlesPost
        .replace('', user.title);
    }).join('<br>');  // найти регулярку для замены
  }

  renderUserPost() {
    let userPosts = document.getElementById('userPosts');
    let liElement = document.createElement('li');
    liElement.innerHTML = this.userPosts;
    userPosts.appendChild(liElement);
  }


  // Рэндер тайтлов Альбомов 
  fetchUserAlbums(userId) {
    const url = Users.BASE_URL + Users.ALBUMS_PATH + '?userId=' + userId;
    request('get', url)
      .then((dataAlbums) => this.fetchUserAlbumsSort(dataAlbums))
      .then(() => this.renderUserAlbums());
  }

  fetchUserAlbumsSort(albums) {
    let listAlbums = ' ';
    this.userAlbums = albums.map((user) => {
      return listAlbums
        .replace(' ', user.title)
    }).join('<br>');   // найти регулярку для замены
  }

  renderUserAlbums() {
    let userAlbums = document.getElementById('userAlbums');
    let liElement = document.createElement('li');
    liElement.innerHTML = this.userAlbums;
    userAlbums.appendChild(liElement);
  }



}

const usersList = new Users(
  document.getElementById('usersListTable')
)
