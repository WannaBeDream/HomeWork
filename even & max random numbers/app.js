
// task 1 Четное число через replace[исключающее не 02468].
 
function validateNumber(value) {
    return !(isNaN(value) 
    || value === '' 
    || value === null) ;
}

function getEven(question){
    let evenCount;

    let number = prompt(question,'');
    if (!validateNumber(number)) {
        alert('Wrong,try again');
     return getEven(question);
    }  

    return  evenCount = number.replace(/[^02468]/g, "").length;
    
}

let result = getEven('Введите число','');

alert('Количество четных: ' + result);


// task 2 получение макс.числа Math.round(Math.random()) ==>> Math.max()

let firstRandomNumber = getRandom(1000, 2000);
let secondRandomNumber = getRandom(1000, 2000);
let maxRandomNumber;

function getRandom(min, max) {
    let randomNumber;
    randomNumber =  Math.round(Math.random() * (max - min) + min);
    return randomNumber;
}

maxRandomNumber = Math.max(firstRandomNumber, secondRandomNumber);

alert(maxRandomNumber);











