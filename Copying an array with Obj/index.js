'use strict'
// Первый вариант,присвоение в цикле по ключам.
const obj = [ 
    {name: 'Alex', age: 33, adress: 
        { country: 'UA', city: 'Dnipro'}
    },
    2,3,'4'
];

function getCopy(item) {
    let readyArray = Array.isArray(item) ? [] : {};
        
        for (let k in item) {
            
            if( typeof(item[k]) === 'object' && item[k] != null ){
                readyArray[k] = getCopy(item[k]);
            } else {
                readyArray[k] = item[k];
            }
        }
        
    return readyArray;
}

const objCopy = getCopy(obj);
console.log(obj,objCopy);
console.log(JSON.stringify(obj) === JSON.stringify(objCopy));


// Второй вариант, метод assign ES6

let newCopy = Object.assign([], obj);

console.log(newCopy,obj); 
console.log(JSON.stringify(obj) === JSON.stringify(newCopy));



//Третий вариант, JSON

let currentlyCopy = JSON.parse(JSON.stringify(obj));

console.log(currentlyCopy,obj); 
console.log(JSON.stringify(obj) === JSON.stringify(currentlyCopy));



