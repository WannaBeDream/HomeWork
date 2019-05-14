const URL = 'http://fep-app.herokuapp.com/api/contacts';

const newContactForm = document.getElementById('newContactForm');
const contactList = document.getElementById('contactList');
const contactNameInput = document.getElementById('nameInput');
const contactSurnameInput = document.getElementById('surnameInput');
const contactEmailInput = document.getElementById('emailInput');
const contactPhoneInput = document.getElementById('phoneInput');
const contactTemplate = document.getElementById('contactTemplate').innerHTML;

const contactTemplateEdit = document.getElementById('contactTemplateEdit').innerHTML;


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
    if (event.target.dataset.deleteButton) {
        deleteContactInServer(event.target.parentNode.parentNode.dataset.contactId)
            .then(getContacts);
    } else if (event.target.dataset.editButton) {
        editContact(event.target.parentNode.parentNode);
    } else if (event.target.dataset.saveButton) {
        saveContactInServer(event.target.parentNode.parentNode)
    } else {
        // changeStateInServer(event.target.parentNode.dataset.contactId) // pop-up
        // .then(getContacts);
    }
}

function editContact(editEl) {
    const contact = contacts.find((item) => { return item.id == editEl.dataset.contactId });

    editEl.innerHTML = contactTemplateEdit.replace('{{id}}', contact.id)
        .replace('{{name}}', contact.name)
        .replace('{{surname}}', contact.surname)
        .replace('{{email}}', contact.email)
        .replace('{{phone}}', contact.phone)
}

function saveContactInServer(saveEl) {
    const contact = contacts.find((item) => { return item.id == saveEl.dataset.contactId });

        contact.name = document.getElementById('editNameInput').value;
        contact.surname = document.getElementById('editSurnameInput').value;
        contact.email = document.getElementById('editEmailInput').value;
        contact.phone = document.getElementById('editPhoneInput').value;


    updateContactInServer(URL, contact.id, contact)
        .then(getContacts)

}

function updateContactInServer(url, id, data) {
    return fetch(url + '/' + id, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

// function changeStateInServer(id) {
//     let contact = contacts.find((c) => c.id == id)

//     contact.is_active = !contact.is_active;
//     return overwriteStateInServer(contact)
// }

// function overwriteStateInServer(contact) {
//     return fetch(URL + '/' + contact.id, {
//         method: 'PUT',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(contact)
//     })
// }


function deleteContactInServer(id) {
    return fetch(URL + '/' + id, {
        method: 'DELETE'
    });
}


