"use strict";

function Student(name,marks){
  this.name = name;
  this.marks = marks;
  this.averageMark = averageMark;
  this.woksDone = woksDone;
  this.addMark = addMark;

}

function averageMark(){
    
  const sumMarks = this.marks.reduce( (previousMark, currentMark) => 
  previousMark + currentMark );
    return (sumMarks / this.marks.length).toFixed(3);

}

function woksDone(){

    return this.marks.filter((number) => 
    { return number > 0}).length;
      
}

function addMark(value){

  return this.marks.push(value);

}

function averageMarkGroup(){

  const  countsMarksGroup = students.reduce ((previousValue, currentValue) =>
  previousValue + +currentValue.averageMark(),0);
  return (countsMarksGroup / students.length).toFixed(3);
   
}

function completePercent(){

  const sumWoksOfGroup = students.reduce( (previousValue, currentValue) => 
    {return previousValue + currentValue.woksDone()}, 0);
  const countsWoks = students.reduce( (previousValue, currentValue) => 
    {return previousValue + currentValue.marks.length}, 0);

        return (sumWoksOfGroup / countsWoks) * 100 + ' %';

}



const students = [ 
    new Student('Student 1', [10,10]), // имя оценки
    new Student('Student 12', [10,10])
];

// averageMark() - возвращает среднюю оценку
// woksDone() - врзвращает количество сданных работ (у которых оценка больше 0)
// addMark(8) - добавляет еще одну оценку студенту
// averageMark() - которая возвращает среднюю оценку по группе
// coьpletePercent() - процент сданных работ по группе

 console.log(students[0].averageMark());
 console.log(students[0].addMark(10));
 console.log(students[0].woksDone());
 console.log(students[0].averageMark());
 console.log(averageMarkGroup());
 console.log(completePercent());