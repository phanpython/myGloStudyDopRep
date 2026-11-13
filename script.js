let numberRandom1to100 = Math.floor(Math.random() * 100) + 1;
let stepsUser = 10;
let oneMoreGame;

const number1to100 = function (numberGuessed) {
  let numberUser = prompt("Угадай число от 1 до 100");
  if (isNaN(numberUser)) {
    alert("Введи число!");
    return number1to100(numberGuessed);
  } else if (numberUser === null) {
    alert("Игра окончена, пока");
    return;
  }
  stepsUser--;
  if (stepsUser === 0) {
    oneMoreGame = confirm("Попытки закончились, хотите сыграть еще?");
    if (oneMoreGame) {
      stepsUser = 10;
      return number1to100(numberGuessed);
    } else {
      alert("Игра окончена, пока");
      return;
    }
  }
  numberUser = parseInt(numberUser);

  if (numberGuessed === numberUser) {
    oneMoreGame = confirm("Поздравляю, Вы угадали!!! Хотели бы сыграть еще?");
    if (oneMoreGame) {
      stepsUser = 10;
      return number1to100(numberGuessed);
    } else {
      alert("Игра окончена, пока");
      return;
    }
  } else if (numberGuessed > numberUser) {
    alert("Загаданное число больше, осталось попыток " + stepsUser);
    return number1to100(numberGuessed);
  } else if (numberGuessed < numberUser) {
    alert("Загаданное число меньше, осталось попыток " + stepsUser);
    return number1to100(numberGuessed);
  } else {
    alert("Ошибка");
    return;
  }
};

number1to100(numberRandom1to100);
