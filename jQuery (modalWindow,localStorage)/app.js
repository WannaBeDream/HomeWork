
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
        fieldForNotes.on('click', onDelBtnClick);
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

        console.log(fillData); //пример(как делать не стоит)
        fieldForNotes.html(fillData);  // данные лучше не заливать как html(теги)
    }

    function onDelBtnClick(e) {
        let stikerContainer = $(e.target).parent('.stikerContainer');


        const note = notes.find((item) => item.id == stikerContainer.data('idStiker')); //???
        notes = notes.filter((item) => item !== note);

        setItemsToLocalStorage('notes', notes);
        renderNotes();
    }
});





// ES6 spread разбиение шаблона , generator итерация по ключам и значениям , модули

// set(массив разных типов элемнетов,все елементы уникальны)  и map новые типы данных у них есть свои методы
// это один из способов удаления дубликатов , map для добавления уникального массива 


// vikSet-для удаления ссылания на инстанс и против утечки памяти,создают слабую связь, функции конструкторы vikMap

// generator расчеты с шагами(по частям)


// function gen(){
//     console.log('start');
//     yield 1;
//     console.log('after 1');
//     yield 2;
//     console.log('after 2');
//     yield 3;
//     console.log('after 3');
//     return 4;
//     //приостанавливает функцию и возвращает результат,при повторном вызове идет с этого же места
// }

// const g = gen();
// g.next()
// g.next()

//AMD asincronius module definitions
//Модули requaerJS   requer(a,b)  function(a,b)
//CommonJS(brauzerify) module.exports(function) подключение через requaer

// ES6 Moduls  



//RegExp (регулярные выражения,спецсимволы для патернов) 
//  let reg = /  /g                 .replace(/  /g  , name.id)
// . -любой символ  g-global i-...      ,   ?-0 или 1 раз берет 

//звездочка берет все после символа что перед ней
// так же есть диапазон 
// /w возьми первый литерал
// домик в середине строки
