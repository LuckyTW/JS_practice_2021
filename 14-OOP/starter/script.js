'use strict';

const Person = function (firstName, birthYear) {
  // console.log(this);
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never do this
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

const matilda = new Person('matilda', 2017);
const jack = new Person('jack', 1975);

console.log(matilda, jack);
console.log(jonas instanceof Person);

//1. new empty object is created
//2. function is called, this = {}
//3. {} linked to prototype
//4. function automatically return {}

//Prototypes

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); //여기서 prototype은 Person의 프로토타입을 가리키는 것이 아니라 Person과 연결된 객체들의 프로토타입을 의미함 -> prototype of linked objects

Person.prototype.species = 'Homo Sapiens';
console.log(jonas, matilda);
console.log(jonas.hasOwnProperty('firstName'));
