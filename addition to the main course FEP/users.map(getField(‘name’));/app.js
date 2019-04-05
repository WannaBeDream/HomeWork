var users = [{
    name: "Вася",
    surname: 'Иванов',
    age: 20
  }, {
    name: "Петя",
    surname: 'Чапаев',
    age: 25
  }, {
    name: "Маша",
    surname: 'Медведева',
    age: 18
  }];
  

  function getField(value) {
    if (value === 'name') {
      return function getNames(users) {
        return  users.name ;
    }
  } else if (value === 'age') {
    return function getAges(users) {
      return  users.age ;
    }
  }
  else if (value === 'surname') {
    return function getSurnames(users) {
      return  users.surname ;
    }
  } else {
    console.log('all is break')
  }

}



// function getField(field){
    
//   return function getValueObj (obj){
//       return obj[field];
//   }
// }
  
  alert(users.map(getField('name'))); // результат [ "Вася", "Петя», "Маша" ]
  alert(users.map(getField('age'))); // результат [ 20, 25, 18]
  alert(users.map(getField('surname')));
