let updateTime = function () {
  let now = new Date();
  let days = {
    0: "Понедельник",
    1: "Вторник",
    2: "Среда",
    3: "Четверг",
    4: "Пятница",
    5: "Суббота",
    6: "Воскресенье",
  };
  let dayToday = (6 + now.getDay()) % 7;
  let month = now.getMonth() + 1;
  let months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];
  // час 1 21
  // часов 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
  // часа 2 3 4 22 23
  let firstNumber = (now.getHours() / 10) % 10;
  let secondNumber = now.getHours() % 10;
  let hoursPostName;

  if (firstNumber === 1) {
    hoursPostName = "часов";
  } else if (secondNumber === 1) {
    hoursPostName = "час";
  } else if (secondNumber >= 2 && secondNumber <= 4) {
    hoursPostName = "часа";
  } else {
    hoursPostName = "часов";
  }

  let timerElement1 = document.querySelector(".timer1");
  let timerElement2 = document.querySelector(".timer2");
  timerElement1.innerText = `Сегодня ${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} года, ${now.getHours()} ${hoursPostName} ${now.getMinutes()} минут ${now.getSeconds()} секунд`;
  timerElement2.innerText = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()} - ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
};

// updateTime();
setInterval(updateTime, 1000);
