let points = 0 ;
let dataOfPoll = [
 { question: 'Сколько будет 2+2?',
   answer: 4, 
   type: 'prompt' 
 },
 { question: 'Солнце встает на востоке?',
   answer: true,
   type: 'confirm' 
 },
 { question: 'Сколько будет 5 << 2 ?',
   answer: 20,
   type: 'prompt'
 }
 ] ;



function askQuestion(dataOfPoll) {
    let askUser;
    switch(dataOfPoll.type) {
        case  'prompt' :
        askUser = prompt(dataOfPoll.question, '') ;
        if(!validation(askUser)) {
            alert('Wrong,try again plz or suffer user');
         return askQuestion(dataOfPoll);
    }   break;  
    
    case 'confirm' : 
        askUser = confirm(dataOfPoll.question);
        break;
        default: alert('type is invalid');
    }

    return askUser == dataOfPoll.answer;
}


function validation(value) {
    // return !isNaN(value) || !value;
    return !(isNaN(value) || value === '' || value === null) ;

}



for (let i = 0; i < dataOfPoll.length; i++) {
    let isAnswerCorrect = askQuestion(dataOfPoll[i]) ;
    points = isAnswerCorrect ? 10 : 0 ;
}

alert('All points: ', points) ;
