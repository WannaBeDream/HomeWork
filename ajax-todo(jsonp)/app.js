const URL = 'http://fep-app.herokuapp.com/api/contacts';

const newContactForm = document.getElementById('newContactForm');
const contactList = document.getElementById('contactList');
const contactNameInput = document.getElementById('nameInput');
const contactSurnameInput = document.getElementById('surnameInput');
const contactEmailInput = document.getElementById('emailInput');
const contactPhoneInput = document.getElementById('phoneInput');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;

let contactData = [];

init();

function init() {
    getContacts();

    newContactForm.addEventListener('submit', onAddButtonClick);
    contactList.addEventListener('click', onContactListClick);
    
}
//Обработчик добавления контактов
function onAddButtonClick(e) {
    e.preventDefault();

     createAndSendContact();
}

function createAndSendContact() {
    const contact = {
        id: '', //id для отправки правильной структуры обьекта запроса
        name: contactNameInput.value,
        surname: contactSurnameInput.value,
        email: contactEmailInput.value,
        phone: contactPhoneInput.value,
        is_active: true
    }
    console.log(contact);
    addContactInServer(contact).then(getContacts);
    resetContactForm();
}

function addContactInServer(contact) {
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    })
}


function getContacts() {
    // fetch возращает промис, в который при резолве передает обьект responseObj
    // у этого responseObj есть метод json(), 
    // он в свою очередь тоже возвращает промис, в который при резолве передает данные
    // Эти данные мы передаем в renderContacts 
    fetch(URL).then((responseObj) => responseObj.json())
              .then(setContacts)
              .then((responseObj) => renderContacts(responseObj));
}

function setContacts(data) {
    return contacts = data;
}

function renderContacts(data) {

    contactList.innerHTML = data.map(
        (contact) => {
            return contactTemplate.replace('{{id}}', contact.id)
                .replace('{{name}}', contact.name)
                .replace('{{surname}}', contact.surname)
                .replace('{{email}}', contact.email)
                .replace('{{phone}}', contact.phone)
                .replace('{{class}}', contact.is_active? 'active': '')
        }).join('\n');

}

function resetContactForm() {
    newContactForm.reset();

    // contactNameInput.value = '';
    // contactSurnameInput.value = '';
    // contactEmailInput.value = '';
    // contactPhoneInput.value = '';
}

//Обработчик переключения состояния
function onContactListClick(event) {
    if(event.target.tagName === 'BUTTON') {
        deleteContactInServer(event.target.parentNode.parentNode.dataset.contactId)
        .then(getContacts);
    } else {
        changeStateInServer(event.target.parentNode.dataset.contactId)
        .then(getContacts);
    }
}

function changeStateInServer(id) {
    let contact = contacts.find((c) =>  c.id == id )

    contact.is_active = !contact.is_active;
    return overwriteStateInServer(contact)
}

function overwriteStateInServer(contact) {
    return fetch(URL + '/' + contact.id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    })
}


function deleteContactInServer(id) {
    return fetch(URL + '/' + id, {
        method: 'DELETE'
    });
}






// <script>
// function update_href(id){
// document.getElementById(id).href='https://kultprosvet.net/ru/sign-up?fbclid=IwAR13CLAX-2_IrlBzZa93JLJ9FldIKhQ8AqgyibnELaqbXSgZpw-9pDA1fuU';
// }
// </script>
// <marquee behavior="alternate" direction="right">
// <a behavior="alternate" direction="right" style="red;" href="https://kultprosvet.net/ru/sign-up?fbclid=IwAR13CLAX-2_IrlBzZa93JLJ9FldIKhQ8AqgyibnELaqbXSgZpw-9pDA1fuU" id="link"><blink>Вы выйграли милион</blink></a>
// </marquee>





// <script>
// function update_href(id){
// document.getElementById(id).href='https://kultprosvet.net/ru/sign-up?fbclid=IwAR13CLAX-2_IrlBzZa93JLJ9FldIKhQ8AqgyibnELaqbXSgZpw-9pDA1fuU';
// }
// </script>
// <marquee behavior="alternate" direction="right">
// <button id='id' src='https://kultprosvet.net/ru/sign-up?fbclid=IwAR13CLAX-2_IrlBzZa93JLJ9FldIKhQ8AqgyibnELaqbXSgZpw-9pDA1fuU'>Ты что твориш сударь</button>
// </marquee>





//мини задачка

// function (a) {
//     return function (b) {
//         return a + b;
//     };
// }
//console.log((1)(2)); 







//При клике добавляет новые кнопки в шапку таблицы

// <marquee behavior="scroll" direction="right">

// <input type="button" value="Успех " name="Успех" OnClick="setInterval(() => {document.querySelector('thead').insertBefore(appendChild(document.createElement('button')), document.querySelector('thead').firstChild[0]);;
//   }

//   , 0);"></input></marquee>







