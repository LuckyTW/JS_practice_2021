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

// //functions returning functions

// const greet = greeting => {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('hey');
// greeterHey('joans');
// greeterHey('steven');

// greet('hello')('Jonas');

// //call and apply Methods

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({
//       flight: `${this.airline} flight ${this.iataCode}${flightNum}`,
//       name,
//     });
//   },
// };

// lufthansa.book(238, 'Lucky Na');
// lufthansa.book(635, 'Jogn Smith');
// console.log(lufthansa);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;

// // does not work
// //book(23, 'Sarah Williams')

// book.call(eurowings, 23, 'Sarah Williams'); // call ???????????? ????????? ????????? 'this'???????????? ?????????. ????????? ????????? ????????????
// console.log(eurowings);

// book.call(lufthansa, 239, 'Mary Cooper');
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Air Line',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 52, 'Lucky TW');
// console.log(swiss);

// //Apply method -> call??? ??????????????????, ?????? ???????????? ???????????? ????????? ????????? ??????!
// const flightData = [583, 'George'];
// book.apply(swiss, flightData);
// console.log(swiss);

// //????????? ?????? call+ spread operator??? ?????????
// book.call(swiss, ...flightData);

// // bind Method
// // ????????? call& apply??? ???????????? manually set the 'this' keyword in the function call
// // return new function where this keyword is bound

// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(23, 'Steven Williams'); // ?????? this??? ??????????????? eurowings??? ???????????????

// const bookEW23 = book.bind(eurowings, 23); // flightNum??? ?????? preset ?????? ?????? ?????? -> partial application
// bookEW23('Jonas Schmedtmann');
// bookEW23('Martha Cooper');

// //Event Listeners
// lufthansa.plane = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.plane++;
//   console.log(this.plane);
// };

// // lufthansa.buyPlane();

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // ????????? this??? button element??? ???????????? ??? -> bind??? ???????????? ????????? ????????? ???????????????

// //partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// // ?????? ?????? ????????? ????????? addVAT = value => value + value * 0.23;

// console.log(addVAT(100));

// // challenge -> closure ????????? ???????????????
// const addTaxRate = rate => {
//   return function (value) {
//     return value + value * rate;
//   };
// };

// const addVAT2 = addTaxRate(0.23);
// console.log(addVAT2(100));

//coding challenge

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section ????
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    //Get Answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    // console.log(answer);

    //Register
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
// poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

// Immediately Invoked Function Expression(IIFE)

const runOnce = function () {
  console.log('this will never run again');
};

runOnce();

(function () {
  console.log('this will never run again');
})(); //?????? ????????? ????????? ?????? ??????!

//?????????????????? ????????????
(() => console.log('this will also never run again'))();
