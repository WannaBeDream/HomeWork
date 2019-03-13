function validationNumber(value) {
    return !(isNaN(value) || value === '' || value === null) ;
}
function validationOperator(value) {
    return (value === '+' || value === '-'|| value === '*' || value === '/') ;
}
function getOperand(question) {
   const operand = prompt(question,'');
            if (!validationNumber(operand)) {
                alert('Wrong,try again');
             return getOperand(question);
            }  
            return operand;
}

function getAction() {
   var action = prompt('Введите оператор( + - * / )','');
        if (!validationOperator(action)) {
            alert('Wrong,try again');
         return  getAction();
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
    return parseInt(result);
}

const operandA = getOperand('первый'); 
const operandB = getOperand('второй'); 
const action = getAction(); 
const result = calculate(operandA, operandB, action)

alert('Результат: '+ result);
