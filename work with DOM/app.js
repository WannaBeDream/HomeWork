const headLine = document.getElementsByTagName('h1');
headLine[0].textContent = "Hello, " + getName('Как вас зовут?');


function getName(questionFirst) {
let name = prompt(questionFirst,'')
 if (validateName(name)) {
    alert('plz try again');
    return getName(questionFirst);
 } else {
     return name;
 }
}


function validateName(value) {
    return (!isNaN(value) || value === '' || value === null ) ;

}



///////////////

const newElemUl = document.createElement('ul');
document.body.appendChild(newElemUl);




function validateNumber(value) {
    return (isNaN(value) ||  value === null ||  value === '' || value > 100 ||  value < 1);
}



function getLiCounts(questionSecond) {
    let numbers = +prompt(questionSecond,'');
    if(validateNumber(numbers)){
         return getLiCounts(questionSecond)
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
    
    const liCounts = +getLiCounts('Введите количество заголовков');
    const pastedElementsLi = textCreate(liCounts);
    newElemUl.insertAdjacentHTML('afterBegin', pastedElementsLi);
