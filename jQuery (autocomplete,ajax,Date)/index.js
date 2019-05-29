$(function () {

  const URL_USERS_SEARCH = "https://api.github.com/search/users?q=";
  const URL_USERS = "https://api.github.com/users/";
  const wrapperUi = $('.wrapper-ui');
  const userImg = $('.user-img');
  const userName = $('.user-name');
  const userLogin = $('.user-login');
  const userRepositories = $('#user-repositories');
  const userFollowers = $('#user-followers');
  const userRegistration = $('#user-registration');

  $("#select-user").autocomplete({
    source: function (request, response) {
      $.ajax({
        url: URL_USERS_SEARCH + request.term,
        type: "GET"
      }).done((data) => {                   //success: function
        response(getListLogins(data));
      });
    },
    minLength: 2,
    select: function (event, ui) {
      $.ajax({
        url: URL_USERS + ui.item.label,
        type: "GET"
      }).done((data) => {               //success: function
        renderUserInfo(data);
      });
    }
  });

  function renderUserInfo(data) {
    let date = new Date(data.created_at);
    let mainDate = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`;

    wrapperUi.css("display", "flex");
    userImg.attr("src", data.avatar_url);
    userName.html(data.name);
    userLogin.attr("href", data.html_url);
    userLogin.html("(" + data.login + ")");
    userRepositories.html(data.public_repos);
    userFollowers.html(data.followers);
    userRegistration.html(mainDate);
  }


  function getListLogins(data) {
    return data.items.map((item) => item.login)
  }

});