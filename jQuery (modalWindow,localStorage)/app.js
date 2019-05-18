
$(function () {

    const noteTemplate = $('#noteTemplate').html();
    const fieldForNotes = $('.fieldForNotes');
    const addNotes = $('.addNotes');
    const clearNotes = $('.clearNotes');
    const modalForm = $('.modalForm');
    const form = $('form');
    const saveNote = $('.saveNote');
    const cancelNote = $('.cancelNote');
    const noteTitle = $('.noteTitle');
    const noteDescription = $('.noteDescription');
    const delBtn = $('.delBtn');
    let notes = [];

    // $('.stikerContainer').draggable();


    init();


    function fetchNotes() {
        notes = getNotes();
        renderNotes();
    }

    function getNotes() {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    }

    function init() {
        bindAddEventListener();
        fetchNotes();
    }

    function bindAddEventListener() {
        addNotes.on('click', function () {
            form.fadeIn(500);
        });
        cancelNote.on('click', function () {
            form.fadeOut(500);
        });
        clearNotes.on('click', function () {
            localStorage.clear();
            fetchNotes();
        })
        saveNote.on('click', onSaveClick);
        delBtn.on('click', onDelBtnClick);
    }

    function onSaveClick(e) {
        e.preventDefault();

        createObject();
    }
    function createObject() {
        const note = {
            id: Date.now(),
            title: noteTitle.val(),
            description: noteDescription.val()
        }

        sendObject(note);
        console.log(note);
    }

    function sendObject(note) {
        notes.push(note);
        setItemsToLocalStorage('notes', notes);
        renderNotes();
        modalForm.trigger("reset");;

    }

    function setItemsToLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }


    function renderNotes() {
        const fillData = notes.map((item) => {
            return noteTemplate
                .replace('{{id}}', item.id)
                .replace('{{noteHeader}}', item.title)
                .replace('{{noteBody}}', item.description)
        }).join('\n');

        fieldForNotes.html(fillData);
    }

    function onDelBtnClick(e) {
        let stikerContainer = $(e.target).parent('.stikerContainer');


        const note = notes.find((item) => item.id == stikerContainer.attr('id')); //???
        notes = notes.filter((item) => item !== note);

        setItemsToLocalStorage('notes', notes);
        renderNotes();
    }
});



