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

let elements = document.querySelector(".elements");
let element = document.getElementsByClassName("element")[0];
let selects = element.querySelectorAll("select");
let inputsText = elements.querySelectorAll("input[type=text]");

let screens = document.querySelectorAll(".screen");

let checkboxInputs = document.querySelectorAll("input[type=checkbox]");

let inpurCms = document.querySelector("#cms-open");
let cmsVariants = document.querySelector(".hidden-cms-variants");
let inputMainControls = cmsVariants.querySelector(".main-controls__input");
let cmsSelect = cmsVariants.querySelector("#cms-select");

let cmsOtherInput = inputMainControls.querySelector("#cms-other-input");

const appData = {
  title: "",
  screenPrice: 0,
  screensValue: [],
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
    this.addTitle();
    startBtn.addEventListener("click", this.start);
    resetBtn.addEventListener("click", this.reset);
    buttonPlus.addEventListener("click", this.addScreenBlock);
    inputRange.addEventListener("change", this.changeRollbackRange);
    inpurCms.addEventListener("change", () => {
      cmsVariants.style.display = "flex";
    });
    cmsSelect.addEventListener("change", () => {
      if (cmsSelect.value === "other") {
        inputMainControls.style.display = "flex";
      } else if (cmsSelect.value === "50") {
        this.servicesPersent[cmsSelect[cmsSelect.selectedIndex].textContent] =
          "50";
      }
    });
  },

  start: function () {
    appData.checkFilled();
    if (appData.resultFilled) {
      appData.addScreens();
      appData.addServices();
      appData.addPrices();
      // this.logger();
      appData.showResult();
      appData.calculate();
      // console.log(appData);
    } else {
      return;
    }
  },

  reset: function () {
    screens = elements.querySelectorAll(".screen");
    inputsText = elements.querySelectorAll("input[type=text]");
    screens.forEach((screen, index) => {
      if (index != 0) {
        screen.remove();
      }
    });
    screens = elements.querySelectorAll(".screen");
    selects = element.querySelectorAll("select");
    selects.forEach((select) => {
      select.disabled = false;
      select.selectedIndex = 0;
    });

    cmsSelect.selectedIndex = 0;
    cmsVariants.style.display = "none";
    inputMainControls.style.display = "none";

    total.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totaCountRollback.value = 0;
    totalCount.value = 0;

    appData.screensValue = [];
    appData.servicesPersent = {};
    appData.servicesNumber = {};
    appData.screenPrice = 0;
    appData.rollback = 0;
    appData.servicePricesPersent = 0;
    appData.servicePricesNumber = 0;
    appData.fullPrice = 0;
    appData.servicePercentPrice = 0;
    appData.count = 0;

    inputsText.forEach((input) => {
      input.disabled = false;
      input.value = "";
    });

    checkboxInputs.forEach((input) => {
      input.checked = false;
    });
    inputRange.value = 0;
    inputRangeValue.textContent = `${0} %`;
    resetBtn.style.display = "none";
    startBtn.style.display = "inline-block";
  },

  calculate: function () {
    screens = elements.querySelectorAll(".screen");
    selects = element.querySelectorAll("select");
    inputsText = elements.querySelectorAll("input[type=text]");

    inputsText.forEach((input) => {
      input.disabled = true;
    });
    selects.forEach((select) => {
      select.disabled = true;
    });
    startBtn.style.display = "none";
    resetBtn.style.display = "inline-block";
  },

  changeRollbackRange: function (event) {
    appData.rollback = event.target.value;
    inputRangeValue.textContent = `${event.target.value} %`;
  },

  checkFilled: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      let selectElement = screen.querySelector("select");
      let inputElement = screen.querySelector("input");
      if (selectElement.selectedIndex === 0 || inputElement.value === "") {
        alert("Пожалуйста выберите тип и значение экранов");
        this.resultFilled = false;
      } else {
        this.resultFilled = true;
      }
    });
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPersent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totaCountRollback.value = this.servicePercentPrice;
    totalCount.value = this.count;
  },

  addScreenBlock: function () {
    let cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      this.screensValue.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
  },

  addPrices: function () {
    this.screenPrice = this.screensValue.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPersent) {
      this.servicePricesPersent +=
        this.screenPrice * (this.servicesPersent[key] / 100);
    }

    this.fullPrice =
      +this.screenPrice + this.servicePricesPersent + this.servicePricesNumber;

    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100),
    );

    screens = document.querySelectorAll(".screen");
    screens.forEach((screen) => {
      const input = screen.querySelector("input");
      this.count += +input.value;
    });
  },

  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesPersent[label.textContent] = +input.value;
      }
    });
    if (cmsOtherInput.value !== "") {
      this.servicesPersent["CMS"] = +cmsOtherInput.value;
    }

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
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
      this.isNumber(nameText)
    );
    return nameText;
  },

  getTitle: function () {
    this.title = this.title.trimStart();
    this.title =
      this.title[0].toUpperCase() + this.title.slice(1).toLowerCase();
  },

  logger: function () {
    // for (let key in this) {
    //   console.log(key + ": " + this[key]);
    // }
    console.log(this.screensValue);
    console.log(this.services);
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
  },
};

appData.init();
