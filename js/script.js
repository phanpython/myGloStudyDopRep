"use strict";

const appData = {
  rollback: 20,
  fullPrice: 0,
  servicePercentPrice: 0,
  allServicePrices: 0,
  services: {},
  title: "",
  screens: [],
  adaptive: true,
  screenPrice: 0,

  asking: function () {
    appData.title = checkText(
      appData.title,
      "Как называется ваш проект?",
      "Калькулятор вёрстки",
    );

    for (let i = 0; i < 2; i++) {
      let name;
      let price = 0;

      name = checkText(name, "Какие типы экранов нужно разработать?");

      do {
        price = +prompt("Сколько будет стоить данная работа?");
      } while (!isNumber(price));
      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let question;
      let uniqueName;
      let price = 0;

      question = checkText(question, "Какой дополнительный тип услуги нужен?");

      uniqueName = `${question}_${i}`;

      do {
        price = prompt("Сколько это будет стоить?");
      } while (!isNumber(price));
      appData.services[uniqueName] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (
      accumulator,
      currentValue,
    ) {
      return accumulator + currentValue.price;
    }, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },

  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
    );
  },

  getRollbeckMessage: function (price) {
    switch (true) {
      case price >= 30000:
        return "Даем скидку в 10%";
      case price >= 15000 && price < 30000:
        return "Даем скидку в 5%";
      case price < 15000 && price >= 0:
        return "Скидка не предусмотрена";
      default:
        return "Что то пошло не так";
    }
  },

  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },

  getTitle: function () {
    appData.title = appData.title.trimStart();
    appData.title =
      appData.title[0].toUpperCase() + appData.title.slice(1).toLowerCase();
  },

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getTitle();
    appData.getServicePercentPrices();
    this.logger();
  },

  logger: function () {
    // for (let key in this) {
    //   console.log(key + ": " + this[key]);
    // }
    console.log(appData.screens);
    console.log(appData.services);
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
  },
};

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && num != 0;
};

// const isString = function (text) {
//   return typeof text === "string" || text instanceof String;
// };

const checkText = function (nameText, text, suggestText) {
  do {
    nameText = prompt(text, suggestText);
  } while (
    nameText == "" ||
    typeof nameText !== "string" ||
    isNumber(nameText)
  );
  return nameText;
};

// appData.start();

// Задание 9

let firstH1 = document.getElementsByTagName("h1");
let titleText = firstH1.title.innerHTML;
let buttons = document.getElementsByClassName("handler_btn");
let plus = document.querySelector(".screen-btn");
let otherPercent = {};
let otherNumber = {};
if (buttons.length >= 2) {
  let buttonCalculate = buttons.start;
  let buttonReset = buttons.reset;
}

const otherItems = document.querySelectorAll(".other-items");

for (let key in otherItems) {
  if (otherItems.hasOwnProperty(key)) {
    if (otherItems[key].classList.contains("percent")) {
      otherPercent[key] = otherItems[key];
    } else if (otherItems[key].classList.contains("number")) {
      otherNumber[key] = otherItems[key];
    }
  }
}

let input = document.querySelector(".rollback input[type='range']");
console.log(input);

let span = document.querySelector(".rollback span[class='range-value']");
console.log(span);

let totalInputs = document.getElementsByClassName("total-input");
for (let key in totalInputs) {
  if (totalInputs.hasOwnProperty(key)) {
    console.dir(totalInputs[key]);
  }
}

let screen = document.querySelectorAll(".screen");
console.log(screen);
