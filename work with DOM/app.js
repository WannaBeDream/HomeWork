const headLine = document.getElementsByTagName('h1');
headLine.item(0).textContent = "Hello, " + getName('Как вас зовут?');


function getName(question) {
let name = prompt(question,'')
 if (validateName(name)){
    alert('plz try again');
    return getName(question);
 } else {
     return name;
 }
}


function validateName(value) {
    return !(isNaN(value) || value === '' || value === null ) ;

}



///////////////

const newElemUl = document.createElement('ul');
document.body.appendChild(newElemUl);

const liCounts = +getLiCounts('Введите количество заголовков');
const pastedElementsLi = textCreate(liCounts);
newElemUl.insertAdjacentHTML('afterBegin', pastedElementsLi);



function validateNumber(value) {
    return !( value === '' || value === null ||  (value > 100) || (value < 0));
}




function getLiCounts(question) {
    let numbers = +prompt(question,'');
     if(!validateNumber(numbers)){
         return getLiCounts(question)
     } else {
         return numbers;
     }
}


function textCreate(value) {
    let str = '';

    for(let i = 0; i < value; i++) {
         str += '<li>' + (i + 1) + '</li>';

    }
        return str;
}

