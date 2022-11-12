'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Dejan Gogov',
  movements: [200, 4450, -400, 3000, -650, -130, 70, 11300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-11-11T17:01:17.194Z',
    '2022-11-12T10:36:17.929Z',
    '2022-11-10T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const account2 = {
  owner: 'Egon Günther',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2022-11-11T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Andreas Jamie Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2022-10-01T13:15:33.035Z',
    '2022-09-30T09:48:16.867Z',
    '2022-10-25T06:04:23.907Z',
    '2020-08-25T14:18:46.235Z',
    '2020-10-05T16:33:06.386Z',
    '2020-10-10T14:43:26.374Z',
    '2020-09-25T18:49:59.371Z',
    '2022-11-11T12:01:20.894Z',
  ],
  currency: 'MKD',
  locale: 'mk-MK',
};

const account4 = {
  owner: 'Layla Jonson ',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2022-10-01T13:15:33.035Z',
    '2022-08-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2022-11-11T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const account5 = {
  owner: 'Michael Jordan',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 5555,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-10-03T17:01:17.194Z',
    '2022-11-12T10:36:17.929Z',
    '2022-11-11T10:51:36.790Z',
  ],
  currency: 'MKD',
  locale: 'mk-MK', // de-DE
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
// btnLogout only for test
const btnLogout = document.querySelector('.logout');

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

// New ACCOUNT REGISTER
// const registerUserName = document.querySelector('.register__input--user');
// const registerLastName = document.querySelector('.register__input--name');
// const registerPin = document.querySelector('.register__input--pin');
// const btnRegister = document.querySelector('.register__btn');

// ADD DATES FUNCTION
const formatMovementDate = function (date, locale) {
  // CALCULATION HOW MANNY DAYS PAST SINCE TRANSACTION
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} day ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/ ${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

// FORMATING THE CURRENCY FUNCTION
const formatCur = function (value, locale, currency) {
  // Internationalisation of Value Sign
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  // creating a copy with slice()
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  // if sort is set to true movements will be sorted by a-b and if it set to false just the regular movements sorting

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    // Internationalisation of Value Sign
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
<div class="movements__row">
          <div class="movements__type movements__type--${type} ">${
      i + 1
    } ${type} </div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>
`;

    // ATTACHING THIS PART TO MOVEMENT CLASS IN HTML vazno! novo!
    containerMovements.insertAdjacentHTML('afterbegin', html);
    //ako sakame obraten redosled moze so beforeend !
  });
};

// Computin Balance with REDUCE METHOD
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

// Calculating the Income/ Outcome/Intrest
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = formatCur(incomes, account.locale, account.currency);

  const outcome = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(outcome),
    account.locale,
    account.currency
  );

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)

    .filter((int, i, arr) => int > 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = formatCur(
    interest,
    account.locale,
    account.currency
  );
};

// Computing userNames first Letters
const createUserName = function (accs1) {
  // Looping over accs1
  accs1.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserName(accounts);

const updateUI = function (acc) {
  // display movements
  displayMovements(acc);

  //display balance
  calcDisplayBalance(acc);

  //display summery
  calcDisplaySummary(acc);
};

// LoginOut Function
const loginOut = function () {
  inputLoginUsername.classList.toggle('hidden');
  inputLoginPin.classList.toggle('hidden');
  btnLogin.classList.toggle('hidden');
};

// IMPLEMENTING A TIMMER
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    //In each call, print the remainding time to UI(userInterface)
    labelTimer.textContent = `${min}:${sec}`;

    // When we reach 0 secound ,stop timer and logOut
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;

      // Mojjto LogOut
      loginOut();
      btnLogout.classList.toggle('hidden');
      labelWelcome.textContent = 'Log in to get started';
    }

    // Decress -1 secound

    time--;
  };
  // Set Time to 2min Example
  let time = 120;

  // Call the timer every secound
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
//

let currentAccount, timer;

// Creating a Fake Aways login just to work without login
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); //prevent form btn from submiting

  // finding the accounts
  currentAccount = accounts.find(
    accu => accu.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // DISPLAY UI and Welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0] // to take the name only
    } `;

    containerApp.style.opacity = 100;

    // IMPLEMENTING NEW FUTURE LOGOUT BTN
    loginOut();
    btnLogout.classList.toggle('hidden');

    // Updating the Date in Current Balance
    // EXPERIMENTING WITH DATES API
    const now = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      weekday: 'short',
    };

    // ADD AUTOMATIC REGION PO BROWSER kak ode
    // const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      option
    ).format(now);

    // CLEAR THE INPUT FIELD
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    // IMPLEMENTING TIMMER
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
});

//LogOut BTN
btnLogout.addEventListener('click', function () {
  btnLogout.classList.toggle('hidden');

  containerApp.style.opacity = 0;

  loginOut();
  labelWelcome.textContent = 'Log in to get started';
});

// Implementing Transfer Money

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // console.log(amount, reciverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    reciverAcc &&
    currentAccount.balance >= amount &&
    reciverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer !
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);

    // ADD CURRENT DATE WHEN THERE IS A TRANSFER
    currentAccount.movementsDates.push(new Date().toISOString());
    reciverAcc.movementsDates.push(new Date().toISOString());

    // UpdateUI
    updateUI(currentAccount);

    // Reseting the timer when there is Transaction
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// REQUEST LOAN SECTION
// bank has a rule that say will grand a loan if its a least 1 deposit with a least 10% od loan ammount

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  // Using Some Method to calculate 10%
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //add movement
      currentAccount.movements.push(amount);

      // ADD LOAN DATE
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reseting the timer when there is loan
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
});

inputLoanAmount.value = '';

// DELETING ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // Using FINDINDEX !
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Using Splice Method to delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    loginOut();
    btnLogout.classList.toggle('hidden');
    labelWelcome.textContent = 'Log in to get started';
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

// SORTING
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted; // this allow as to work every time when we click !
});
