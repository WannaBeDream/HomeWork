"use strict";

function Hamburger(size, stuffing) {
  this._Size = size;
  this._Stuffing = stuffing;
  this._Topping = [];

}

Hamburger.prototype.addTopping = function (topping) {
  if (!this._Topping.includes(topping)) {
    return this._Topping.push(topping);
  }
}

Hamburger.prototype.calculateCalories = function () {
  return this._Size.calories +
    this._Stuffing.calories +
    this._Topping.reduce((accum, currentValue) => accum + currentValue.calories, 0);

}


Hamburger.prototype.calculatePrice = function () {
  return this._Size.price +
    this._Stuffing.price +
    this._Topping.reduce((accum, currentValue) => accum + currentValue.price, 0);
}

Hamburger.prototype.getArrHumb = function () {   // добавить в сalc константы и вернуть массив + map(любой создающиий arr) -> + push -> + reduce
  return [this._Topping, this._Size, this._Stuffing]
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
