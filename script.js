'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,

//   movementsDates: [
//     '2019-11-18T21:31:17.178Z',
//     '2019-12-23T07:42:02.383Z',
//     '2020-01-28T09:15:04.904Z',
//     '2020-04-01T10:17:24.185Z',
//     '2020-05-08T14:11:59.604Z',
//     '2020-05-27T17:01:17.194Z',
//     '2020-07-11T23:36:17.929Z',
//     '2020-07-12T10:51:36.790Z',
//   ],
//   currency: 'EUR',
//   locale: 'pt-PT', // de-DE
// };

// // const account2 = {
// //   owner: 'Jessica Davis',
// //   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
// //   interestRate: 1.5,
// //   pin: 2222,

//   movementsDates: [
//     '2019-11-01T13:15:33.035Z',
//     '2019-11-30T09:48:16.867Z',
//     '2019-12-25T06:04:23.907Z',
//     '2020-01-25T14:18:46.235Z',
//     '2020-02-05T16:33:06.386Z',
//     '2020-04-10T14:43:26.374Z',
//     '2020-06-25T18:49:59.371Z',
//     '2020-07-26T12:01:20.894Z',
//   ],
//   currency: 'USD',
//   locale: 'en-US',
// };

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-07-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//////////////////////////////////////

const formatMovementDate = function (date, locale) {
  const parsedDate = new Date(date);
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), parsedDate);
  // console.log(daysPassed);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/ ${month}/ ${year}`;
  return new Intl.DateTimeFormat(locale).format(parsedDate);
};
// console.log(formatMovementDate(new Date('2024- 02-10'), 'en-US'));

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const combinedMovDate = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));
  // console.log(combinedMovdDate);

  if (sort) combinedMovDate.sort((a, b) => a.movement - b.movement);

  combinedMovDate.forEach(function (obj, i) {
    const { movement, movementDate } = obj;

    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(movement, acc.locale, acc.currency);
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//////////////////////////
// const calcDisplayBalance = function (acc) {
//   acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

//   labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
// };
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

//////////////////////////////////////////

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};
/////////////////////////////////////

////////////////////////////////////////////////
const createUsernames = function (acc) {
  acc.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);
///////////////////
const updateUI = function (acc) {
  //display, balance
  calcDisplayBalance(acc);
  //display movement
  displayMovement(acc);
  //display summary
  calcDisplaySummary(acc);
};

//EventsHandler

let currentAccount, timer;
////Fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//Day/Month/year
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //in each call, print remaining time to UI
    labelTimer.textContent = `${min}: ${sec}`;
    //decrease 1s

    //when 0 sec, sto time and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get Started';
      containerApp.style.opacity = 0;
    }

    time--;
  };
  let time = 120;

  //set timer to 5mins

  //Call timer every sec
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

/////////////////////////////
btnLogin.addEventListener('click', function (e) {
  //prevent from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username == inputLoginUsername.value
  );

  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    //display uc and a welcome mssg
    updateUI(currentAccount);
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;
    //Create current date

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/ ${month}/ ${year}, ${hour}:${min}`;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };

    // const locale = navigator.language;
    // console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //add transfer date

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //Update UI

    updateUI(currentAccount);
    //Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);

      //add loan  date

      currentAccount.movementsDates.push(new Date().toISOString());
      //Update UI
      updateUI(currentAccount);

      //Reset Timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);

    inputLoanAmount.value = '';
  }
});

////// close account

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //delete account
    accounts.splice(index, 1);

    //hide ui
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Goodbye, ${
      currentAccount.owner.split(' ')[0]
    } ☹️`;
  }
  inputCloseUsername.value = inputClosePin.value = ' ';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// console.log(+'23');

// //Parsing
// console.log(Number.parseInt('30px', 10));

// //must not start with a letter
// console.log(Number.parseInt('e23', 10));
// console.log(Number.parseFloat('2.5rem'));

// //Check if value is not a number
// console.log(Number.isNaN(20));
// console.log(Number.isNaN(+'20'));
// console.log(Number.isNaN(23 / 0));

// //Checking if a valoe is a number
// console.log(Number.isFinite(20));
// console.log(Number.isFinite(+'20'));
// console.log(Number.isFinite(23 / 0));

// console.log(Number.isInteger(23));
// console.log(Number.isInteger('23'));

// //Math and rounding

// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));
// console.log(Math.max(5, 67, 77, 55, 44, 66));
// console.log(Math.max(5, 67, 77, '56', 44, 66));
// console.log(Math.min(5, 67, 77, 55, 44, 66));
// console.log(Math.PI * Number.parseFloat('10px') ** 2);
// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomInt = (min, max) => Math.floor(Math.random() * max - min + 1) + min;

// console.log(randomInt(10, 20));
// console.log(randomInt(0, 3));

// //rounding integers

// console.log(Math.round(23.5)); //// round up
// console.log(Math.ceil(23.9)); ///round  downc
// ////////////////////////////
// console.log(Math.floor(23.9)); //// take the decimal away
// console.log(Math.trunc(23.8)); //// take the decimal away

// //Rounding decimals
// (2.7).toFixed(0);
// (2.75555).toFixed(3);
// (2.75555).toFixed(2);

//remainder operator

// console.log(5 % 2);
// console.log(8 % 3);
// console.log(9 % 2);
// console.log(5 % 2);
// console.log(5 / 2);
// console.log(6 % 2);

// const isEven = n => n % 2 === 0;
// console.log(isEven(7));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

// numeric operator

// const diameter = 287_460_000_000;
// console.log(diameter);

// const price = 345_99;

// //Primitive data type -------------big Int

// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);

// console.log(755555555555555533333333333333333333n);
// console.log(BigInt(75555553));

// const huge = 23466666666666666666666666666666666n;

// const num = 45;
// console.log(huge * BigInt(num));

// //Exceptiom

// console.log(20n > 15);
// console.log(20n === 20);
// console.log(typeof 20n);
// console.log(20n == '20');
// console.log(huge + 'is really big');

//Divisions
// console.log(10n/ 3n);

//Date and time
//there are four ways to create date in JS
// const now = new Date();
// console.log(now);

// console.log(new Date('Sat Feb 15 2025 13:32:53'));
// console.log(new Date('Monday  April 18 2025'));
// console.log(new Date(account1.movementsDates[0]));

// //Working with date

// const future = new Date(2023, 3, 18, 0, 0, 0);
// console.log(future.getFullYear());

// console.log(future.getMonth());
// console.log(future.getFullYear());
// console.log(future.getDay());
// console.log(future.getDate());
// console.log(future.getMinutes());
// console.log(future.toISOString());
// console.log(future.getTime()); ///time stamp

// console.log(new Date(1681772400000));
// future.setFullYear(2040);
// console.log(future);

// const future = new Date(2023, 3, 18, 0, 0, 0);
// console.log(+future);

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const days1 = calcDaysPassed(new Date(2023, 3, 18), new Date(2023, 3, 24));
// console.log(days1);
// console.log('Hello world');

//Internationalizing Numbers

const num = 3884764.23;

const option = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
};

// console.log('US: ', new Intl.NumberFormat('en-US', option).format(num));
// console.log('UK: ', new Intl.NumberFormat('en-GB', option).format(num));

// for more check documentation, MDN

//Timer:setTimeOut, and setInterval

// const ingredients = ['olives', 'spinach'];
// const pizzaTimer = setTimeout(
//   (ing1, Ing2) => console.log(`Here is your pizza with ${ing1} and ${Ing2}`),
//   3000,
//   ...ingredients
// );

// console.log('waiting........');

// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// //setInterval
// setTimeout(function () {
//   const now = new Date();
//   const month = now.getMonth() + 1;
//   const hour = now.getHours();
//   const minute = now.getMinutes();
//   const seconds = now.getSeconds();
//   const year = now.getFullYear();
//   const date = now.getDate();
//   console.log(now);
//   console.log(`${date}/ ${month}/ ${year}, ${hour}: ${minute}, ${seconds}`);
// }, 7000);
