let numberRandom1to100 = Math.floor(Math.random() * 100) + 1;

// const number1to100 = function (numberGuessed) {
//   let numberUser = +prompt("Угадай число от 1 до 100");
//   console.log(numberUser, typeof numberUser);
//   if (isNaN(numberUser)) {
//     alert("Введи число!");
//     number1to100(numberGuessed);
//   } else if (numberUser === 0) {
//     alert("Игра окончена");
//   } else if (numberGuessed === numberUser) {
//     alert("Поздравляю, Вы угадали!!!");
//   } else if (numberGuessed > numberUser) {
//     alert("Загаданное число больше");
//     number1to100(numberGuessed);
//     2;
//   } else if (numberGuessed < numberUser) {
//     alert("Загаданное число меньше");
//     number1to100(numberGuessed);
//   } else {
//     alert("Ошибка");
//   }
// };

const number1to100 = function (numberGuessed) {
  let numberUser = prompt("Угадай число от 1 до 100");

  if (isNaN(numberUser)) {
    alert("Введи число!");
    return number1to100(numberGuessed);
  } else if (numberUser === null) {
    alert("Игра окончена");
    return;
  }

  numberUser = parseInt(numberUser);

  if (numberGuessed === numberUser) {
    alert("Поздравляю, Вы угадали!!!");
  } else if (numberGuessed > numberUser) {
    alert("Загаданное число больше");
    return number1to100(numberGuessed);
  } else if (numberGuessed < numberUser) {
    alert("Загаданное число меньше");
    return number1to100(numberGuessed);
  } else {
    alert("Ошибка");
    return;
  }
};

number1to100(numberRandom1to100);
