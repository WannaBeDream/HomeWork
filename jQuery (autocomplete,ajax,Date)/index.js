$(function () {

  const wrapperUi = $('.wrapper-ui');
  const userImg = $('.user-img');
  const userName = $('.user-name');
  const userLogin = $('.user-login');
  const userRepositories = $('#user-repositories');
  const userFollowers = $('#user-followers');
  const userRegistration = $('#user-registration');


  //Показать данные пользователя
  function renderUserInfo(message) {
    let date = new Date(message.created_at);
    date = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`;

    wrapperUi.css("display", "flex");
    userImg.attr("src", message.avatar_url);
    userName.html(message.name);
    userLogin.attr("href", message.html_url);
    userLogin.html("(" + message.login + ")");
    userRepositories.html(message.public_repos);
    userFollowers.html(message.followers);
    userRegistration.html(date);
  }

  //Сформировать список логинов
  function getListOfLogins(data) {
    let loginsArr = [];
    for (let i = 0; i < data.items.length; i++) {
      loginsArr.push(data.items[i].login);
    }
    return loginsArr;
  }


  $("#select-user").autocomplete({
    source: function (request, response) {
      $.ajax({
        url: "https://api.github.com/search/users?q=" + request.term,
        type: "GET",
        success: function (data) {
          response(getListOfLogins(data));
          ;
        }
      });
    },
    minLength: 2,
    select: function (event, ui) {
      $.ajax({
        url: "https://api.github.com/users/" + ui.item.label,
        type: "GET",
        success: function (data) {
          renderUserInfo(data);
        }
      });
    }
  });
});