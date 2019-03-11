let firstOperand ;
let secondOperand;
let operator ;
let result;
function getFirstOperand(){
        switch(firstOperand) {
            case firstOperand :
            firstOperand = +prompt('Введите первое число','');
            if (!validationNumber(firstOperand)) {
                alert('Wrong,try again');
                getOperand();
            } break ;
        } 
    return firstOperand;    
    }

function getSecondOperand(){
    switch (secondOperand) {
        case secondOperand :
        secondOperand = +prompt('Введите второе число','');
        if (!validationNumber(secondOperand)) {
            alert('Wrong,try again');
            getOperand();
        } break ;
    }
    return secondOperand;
}
function validationNumber(value) {
    return !(isNaN(value) || value === '' || value === null) ;
}
function validationOperator(value) {
    return (value === '+' || value === '-'|| value === '*' || value === '/') ;
}

function getOperation() {
    switch(true) {
        case true :
        operator = prompt('Введите оператор( + - * / )','');
        if (!validationOperator(operator)) {
            alert('Wrong,try again');
            getOperation()
        } break ;
    }
    return toString(operator);
}

function getResult() {
    getFirstOperand();
    getOperation();
    getSecondOperand();
    if (operator == '+'){
        result = firstOperand + secondOperand;
        alert(result);
    } else if (operator == '-') {
        result = firstOperand - secondOperand;
        alert(result);
    } else if (operator == '*') {
        result = firstOperand * secondOperand;
        alert(result);
    } else if (operator == '/') {
        result = firstOperand / secondOperand;
        alert(result);
    } else {
        alert('all is break =(')
    }
    
}

getResult();
    






