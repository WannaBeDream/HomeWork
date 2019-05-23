$(function () {
    const URL = 'http://fep-app.herokuapp.com/api/contacts';
    const contactTemplate = $('#contactTemplate').html();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const phoneRegex = /^((\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    let dialog, form, idEditedItem,
        name = $("#name"),
        surname = $("#surname"),
        email = $("#email"),
        phone = $("#phone"),
        tbody = $("table tbody"),
        dialogForm = $("#dialog-form"),
        createUserButton = $("#createContact"),
        allFields = $([]).add(name).add(surname).add(email).add(phone),
        tips = $(".validateTips");


    function updateTips(t) {
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Length of " + n + " must be between " +
                min + " and " + max + ".");
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }

    function validate() {
        let valid = true;
        allFields.removeClass("ui-state-error");

        valid = valid && checkLength(name, "username", 3, 16);
        valid = valid && checkLength(surname, "username", 3, 16);
        valid = valid && checkLength(email, "email", 6, 80);
        valid = valid && checkLength(phone, "phone", 5, 16);

        valid = valid && checkRegexp(name, /^[a-z]([0-9a-z_\s])+$/i, "Name may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
        valid = valid && checkRegexp(surname, /^[a-z]([0-9a-z_\s])+$/i, "Surname may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
        valid = valid && checkRegexp(email, emailRegex, "eg. ui@jquery.com");
        valid = valid && checkRegexp(phone, phoneRegex, "Phone number +38xxxxxx");

        return valid;
    }


    // Получить все контакты (init)
    $(function fetchAllContacts() {
        const contact = {
            id: '',
            name: name.val(),
            surname: surname.val(),
            email: email.val(),
            phone: phone.val(),
            is_active: true
        }
        $.ajax({
            url: URL,
            type: "GET",
            data: JSON.stringify(contact),
            contentType: "application/json",
            dataType: "json",
            success: getContacts
        })
    });



    function onCreateButtonClick() {

        if (validate()) {
            if (idEditedItem) {
                saveEditContact(idEditedItem);
            } else {
                saveContact();
            }
        }
    }


    function saveEditContact(idItem) {
        let contact = {
            id: idItem,
            name: name.val(),
            surname: surname.val(),
            email: email.val(),
            phone: phone.val(),
            is_active: true
        }
        $.ajax({
            url: URL + '/' + idItem,
            type: "PUT",
            data: JSON.stringify(contact),
            contentType: "application/json",
            dataType: "json",
            success: getContacts
        })
    }

    function saveContact() {
        const contact = {
            id: '',
            name: name.val(),
            surname: surname.val(),
            email: email.val(),
            phone: phone.val(),
            is_active: true
        }

        $.ajax({
            url: URL,
            type: "POST",
            data: JSON.stringify(contact),
            contentType: "application/json",
            dataType: "json",
            success: getContacts
        })
    }

    //Получить контакты с сервера
    function getContacts() {
        jQuery.get(URL).done(response => fetchContacts(response));
    }

    //Рендер контактов
    function fetchContacts(contacts) {

        tbody.html(contacts.map(
            item => {
                return contactTemplate.replace('{{id}}', item.id)  //
                    .replace('{{name}}', item.name)
                    .replace('{{surname}}', item.surname)
                    .replace('{{email}}', item.email)
                    .replace('{{phone}}', item.phone)
            }).join('\n'));

        dialog.dialog("close");
        $("button[data-delete-button]").click(onDeleteButtonClick);
        $("button[data-edit-button]").click(onEditButtonClick);
    }

    function onDeleteButtonClick(event) {
        deleteContactInServer(getId(event.target));
    }

    function deleteContactInServer(id) {
        return $.ajax({
            url: URL + '/' + id,
            type: "DELETE",
            success: getContacts
        });
    }

    //Обработчик на клик по кнопке редактирования
    function onEditButtonClick(event) {
        dialog.dialog("open");

        idEditedItem = getId(event.target);

        jQuery.get(URL + '/' + getId(event.target)).done(response => renderCurrentContact(response));
    }

    function renderCurrentContact(contact) {
        name.val(contact.name);
        surname.val(contact.surname);
        email.val(contact.email);
        phone.val(contact.phone);
    }

    function getId(element) {
        return $(element).parents('tr').data('contact-id');

    }

    resetContactForm();
    dialog = dialogForm.dialog({
        autoOpen: false,
        height: 300,
        width: 300,
        modal: true,
        show: {
            effect: "bounce",
            duration: 500
        },
        hide: {
            effect: "explode",
            duration: 500
        },
        buttons: {
            "Create": onCreateButtonClick,
            "Reset": function () {
                form[0].reset();
            }
        },
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        onCreateButtonClick(event);
    });

    createUserButton.on("click", function () {
        dialog.dialog("open");
    });

    function resetContactForm() {
        name.val('');
        surname.val('');
        email.val('');
        phone.val('');
    }

});