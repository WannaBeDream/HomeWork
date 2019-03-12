let firstOperand ;
let secondOperand;
let operator ;
let result;
function getFirstOperand(){
            firstOperand = prompt('Введите первое число','');
            if (!validationNumber(firstOperand)) {
                alert('Wrong,try again');
                getFirstOperand();
            }  
    return parseInt(firstOperand);    
    }

function getSecondOperand(){
        secondOperand = prompt('Введите второе число','');
        if (!validationNumber(secondOperand)) {
            alert('Wrong,try again');
            getSecondOperand();
        } 
    return parseInt(secondOperand);
}
function validationNumber(value) {
    return !(isNaN(value) || value === '' || value === null) ;
}
function validationOperator(value) {
    return (value === '+' || value === '-'|| value === '*' || value === '/') ;
}

function getOperation() {
        operator = prompt('Введите оператор( + - * / )','');
        if (!validationOperator(operator)) {
            alert('Wrong,try again');
            getOperation();
        } 
    return toString(operator);
}

function getResult() {
    getFirstOperand();
    getOperation();
    getSecondOperand();
    if (operator == '+'){
        result = +firstOperand + +secondOperand;
        alert(result);
    } else if (operator == '-') {
        result = +firstOperand - +secondOperand;
        alert(result);
    } else if (operator == '*') {
        result = +firstOperand * +secondOperand;
        alert(result);
    } else if (operator == '/') {
        result = +firstOperand / +secondOperand;
        alert(result);
    } else {
        alert('all is break =(');
    }
    
}

getResult();
    






