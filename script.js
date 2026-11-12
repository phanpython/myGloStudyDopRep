// // Доп задание 2
// let num = 266219;
// let sum = 0;

// num = num.toString();

// for (let i = 0; i < num.langth; i++) {
//   if (sum == 0) {
//     sum = num[i];
//   } else {
//     sum *= num[i];
//   }
//   // console.log(sum);
// }

// console.log("Произведение цифр числа " + num + " = " + sum);
// sum **= 3;
// // console.log(sum);
// console.log("Первые две цыфры числа - " + sum.toString().substr(0, 2));

// // Доп задание 3

// let lang = prompt("Дни недели на en или ru?", "ru");

// if (lang == "ru") {
//   console.log(
//     "Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье",
//   );
// } else if (lang == "en") {
//   console.log("Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday");
// } else console.log("Ошибка");

// switch (true) {
//   case lang == "ru":
//     console.log(
//       "Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье",
//     );
//     break;
//   case lang == "en":
//     console.log(
//       "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
//     );
//     break;
//   default:
//     console.log("Ошибка");
// }

// let lang_array = [];

// lang_array["ru"] = [
//   "Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье",
// ];

// lang_array["en"] = [
//   "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday",
// ];

// console.log(lang_array[lang].toString());

// let namePerson = prompt("Введите имя", "Артём");

// namePerson == "Артём"
//   ? console.log("директор")
//   : namePerson == "Александр"
//     ? console.log("преподаватель")
//     : console.log("студент");

// Доп задание 4
let text =
  " В полученной (как аргумент) строке функция должна убрать все пробелы в начале и в конце ";

const checkTypeOfVariable = function (variable) {
  if (typeof variable == "string") {
    variable = variable.trim();
    if (variable.length > 30) {
      return variable.slice(0, 30) + "...";
    } else {
      return variable;
    }
  } else {
    return "Была передана не строка";
  }
};

console.log(checkTypeOfVariable(text));
