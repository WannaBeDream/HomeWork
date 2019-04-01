'use strict'

function calculator(operand) {
    return {
        add: function getAdd(value) {
            return operand + value;
        },
        sub: function getSub(value) {
            return operand - value;
        },
        divide: function getDivide(value){
            return operand / value;
        },
        mult: function getMult(value){
            return operand * value;
        },
        set: function getSet(value){
            return operand = value;
        },
        get: function getDefault(){
            return operand;
        },
        erect: function getDefaultInErect(value){
            return Math.pow(this.get(),value); 
            
        }
    } 
}

const value = calculator(10);

console.log(value.add(45)); // возвращает 55
console.log(value.sub(45)); // возвращает -35
console.log(value.divide(5)); // возвращает 2
console.log(value.mult(5)); // возвращает 50
console.log(value.set(100)); // устанавливает базовое значение в 100
console.log(value.get()); // возвращает базовое значение (в данный момент 100)

console.log(value.mult(5)); // возвращает 500
console.log(value.erect(1)); // возвращает базовое значение в переданой степени
