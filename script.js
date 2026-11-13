let week = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];
let dayToday = (6 + new Date().getDay()) % 7;

week.forEach((day, index) => {
  let dayOutput = "";
  if (index >= 5) {
    dayOutput = `<i>${day}</i>`;
  } else {
    dayOutput = day;
  }
  if (index === dayToday) {
    dayOutput = `<b>${dayOutput}</b>`;
  }
  document.body.insertAdjacentHTML("beforeend", dayOutput + "<br>");
});
