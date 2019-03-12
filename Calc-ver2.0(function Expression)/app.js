function validationNumber(value) {
    return !(isNaN(value) || value === '' || value === null) ;
}
function validationOperator(value) {
    return (value === '+' || value === '-'|| value === '*' || value === '/') ;
}

function getOperand(question) {
   var operand = prompt(question,'');
            if (!validationNumber(operand)) {
                alert('Wrong,try again');
                getOperand();
            }   
            return operand;
}

function getAction() {
   var action = prompt('Введите оператор( + - * / )','');
        if (!validationOperator(action)) {
            alert('Wrong,try again');
            getAction();
        } 
    return action;
}

function calculate(operandA, operandB, action){
    var result;
    if (action == '+'){
         result = +operandA + +operandB;
    } else if (action == '-') {
         result = +operandA - +operandB;
    } else if (action == '*') {
         result = +operandA * +operandB;
    } else if (action == '/') {
         result = +operandA / +operandB;
    } 
    return result;
}

const operandA = getOperand('первый'); 
const operandB = getOperand('второй'); 
const action = getAction(); 
const result = calculate(operandA, operandB, action)

alert('Результат: '+ result);
