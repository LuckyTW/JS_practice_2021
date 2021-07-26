'use strict';
// // default parameters

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // ES5
//   // numPassenger = numPassenger || 1;

//   const booking = { flightNum, numPassengers, price };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('LH123', 2, 800);

// //How passing Arguments Works:value vs Reference

// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 21345145,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 21345145) {
//     alert('Checked In!');
//   } else {
//     alert('Wrong Passport!');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// // Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 1000000000);
// };

// newPassport(jonas);
// checkIn(flight, jonas);

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// //Higher-order func
// const transformer = function (str, fn) {
//   console.log(`Original String: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };

// // JS uses callbacks all the time
// transformer('Javascript is the best!', upperFirstWord);
// transformer('Javascript is the best!', oneWord);

// const high5 = () => {
//   console.log('play!');
// };

// document.body.addEventListener('click', high5);

//functions returning functions

const greet = greeting => {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('hey');
greeterHey('joans');
greeterHey('steven');

greet('hello')('Jonas');

//call and apply Methods

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.airline} flight ${this.iataCode}${flightNum}`,
      name,
    });
  },
};

lufthansa.book(238, 'Lucky Na');
lufthansa.book(635, 'Jogn Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// does not work
//book(23, 'Sarah Williams')

book.call(eurowings, 23, 'Sarah Williams'); // call 메소드는 첫번째 인자에 'this'키워드를 설정함. 다양한 객체에 접근가능
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Line',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 52, 'Lucky TW');
console.log(swiss);

//Apply method -> call와 완전똑같지만, 뒤에 인자값을 받는것이 아니라 배열일 받음!
const flightData = [583, 'George'];
book.apply(swiss, flightData);
console.log(swiss);

//하지만 보통 call+ spread operator를 많이씀
book.call(swiss, ...flightData);

// bind Method
// 앞에서 call& apply와 비슷하게 manually set the 'this' keyword in the function call
// return new function where this keyword is bound

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams'); // 이미 this가 고정적으로 eurowings를 향하고있음

const bookEW23 = book.bind(eurowings, 23); // flightNum을 미리 preset 해줄 수도 있음 -> partial application
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

//Event Listeners
lufthansa.plane = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.plane++;
  console.log(this.plane);
};

// lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // 이경우 this는 button element를 가리키게 됨 -> bind를 사용해서 새로운 함수를 리턴해야함

//partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// 위의 것과 똑같은 의미로 addVAT = value => value + value * 0.23;

console.log(addVAT(100));

// challenge -> closure 함수로 만들어보기
const addTaxRate = rate => {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
