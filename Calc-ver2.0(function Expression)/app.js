function validateNumber(value) {
    return !(isNaN(value) 
    || value === '' 
    || value === null) ;
}
function validateOperator(value) {
    return (value === '+' 
    || value === '-'
    || value === '*' 
    || value === '/') ;
}
function getOperand(question) {
   let operand = prompt(question,'');
            if (!validateNumber(operand)) {
                alert('Wrong,try again');
             return getOperand(question);
            }  
            return operand;
}

function getAction() {
   let action = prompt('Введите оператор( + - * / )','');
        if (!validateOperator(action)) {
            alert('Wrong,try again');
         return  getAction();
        } 
    return action;
}

function calculate(operandA, operandB, action){
    let result;
    switch (action){
        case '+' :
         result = +operandA + +operandB;
     break ;
        case '-' :
         result = +operandA - +operandB;
     break ;
        case '*' :
         result = +operandA * +operandB;
     break ;
        case '/' :
         result = +operandA / +operandB;
     break ;
        } 
    return result;
}

const operandA = getOperand('первый'); 
const operandB = getOperand('второй'); 
const action = getAction(); 
const result = calculate(operandA, operandB, action)

alert('Результат: '+ result);
