"use strict";

function Hamburger(size, stuffing) {
  this.privateSize = size;
  this.privateStuffing = stuffing;
  this.privateTopping = [];

}

Hamburger.prototype.addTopping = function (topping) {
  if (!this.privateTopping.includes(topping)) {
    return this.privateTopping.push(topping);
  }
}

Hamburger.prototype.calculateCalories = function () {
  let allCalories = this.privateSize.calories +
    this.privateStuffing.calories +
    this.privateTopping.reduce((accum, currentValue) => accum + currentValue.calories, 0);
  return allCalories;

}


Hamburger.prototype.calculatePrice = function () {
  let allPrice = this.privateSize.price +
    this.privateStuffing.price +
    this.privateTopping.reduce((accum, currentValue) => accum + currentValue.price, 0);
  return allPrice;
}

Hamburger.prototype.getArrHumb = function () {   // добавить в сalc константы и вернуть массив + map(любой создающиий arr) -> + push -> + reduce
  return [this.privateTopping, this.privateSize, this.privateStuffing]
}

Hamburger.SIZE_SMALL = { price: 50, calories: 20 }
Hamburger.SIZE_BIG = { price: 100, calories: 40 }

Hamburger.STUFFING_CHEESE = { price: 10, calories: 20 }
Hamburger.STUFFING_SALAD = { price: 20, calories: 5 }
Hamburger.STUFFING_POTATO = { price: 15, calories: 10 }

Hamburger.TOPPING_MAYO = { price: 15, calories: 0 }
Hamburger.TOPPING_SAUCE = { price: 20, calories: 5 }





// маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
console.dir(hamburger)
// спросим сколько там калорий
console.log("Calories: " + hamburger.calculateCalories());
// // сколько стоит
console.log("Price: " + hamburger.calculatePrice());
// // я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SAUCE);
// // А сколько теперь стоит?
console.log("Price with sauce: " + hamburger.calculatePrice());
