"use strict";

let title = document.getElementsByTagName("h1")[0];
let buttonPlus = document.querySelector(".screen-btn");
let otherItemsPercent = document.querySelectorAll(".other-items.percent");
let otherItemsNumber = document.querySelectorAll(".other-items.number");

let inputRange = document.querySelector(".rollback input");
let inputRangeValue = document.querySelector(".rollback .range-value");

let startBtn = document.getElementsByClassName("handler_btn")[0];
let resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totaCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPersent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  resultFilled: false,
  servicePercentPrice: 0,
  servicesPersent: {},
  servicesNumber: {},
  count: 0,
  init: function () {
    appData.addTitle();
    startBtn.addEventListener("click", appData.start);
    buttonPlus.addEventListener("click", appData.addScreenBlock);
    inputRange.addEventListener("change", appData.changeRollbackRange);
  },

  start: function () {
    appData.checkFilled();
    if (appData.resultFilled) {
      appData.addScreens();
      appData.addServices();
      appData.addPrices();
      // this.logger();
      appData.showResult();
      console.log(appData);
    } else {
      return;
    }
  },

  changeRollbackRange: function (event) {
    appData.rollback = event.target.value;
    inputRangeValue.textContent = `${event.target.value} %`;
  },

  checkFilled: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      let selectElement = screen.querySelector("select");
      let inputElement = screen.querySelector("input");
      if (selectElement.selectedIndex === 0 || inputElement.value === "") {
        alert("Пожалуйста выберите тип и значение экранов");
        appData.resultFilled = false;
      } else {
        appData.resultFilled = true;
      }
    });
  },

  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesPersent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totaCountRollback.value = appData.servicePercentPrice;
    totalCount.value = appData.count;
  },

  addScreenBlock: function () {
    let cloneScreen = screens[0].cloneNode(true);
    console.log(cloneScreen);
    screens[screens.length - 1].after(cloneScreen);
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
  },

  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (
      accumulator,
      currentValue,
    ) {
      return accumulator + currentValue.price;
    }, 0);

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPersent) {
      appData.servicePricesPersent +=
        appData.screenPrice * (appData.servicesPersent[key] / 100);
    }

    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesPersent +
      appData.servicePricesNumber;

    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100),
    );

    screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen) {
      const input = screen.querySelector("input");
      appData.count += +input.value;
    });
  },

  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesPersent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num != 0;
  },

  checkText: function (nameText, text, suggestText) {
    do {
      nameText = prompt(text, suggestText);
    } while (
      nameText == "" ||
      typeof nameText !== "string" ||
      appData.isNumber(nameText)
    );
    return nameText;
  },

  getTitle: function () {
    appData.title = appData.title.trimStart();
    appData.title =
      appData.title[0].toUpperCase() + appData.title.slice(1).toLowerCase();
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

appData.init();
