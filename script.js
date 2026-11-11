let num = 266219;
let sum = 0;

num = num.toString();

for (let i = 0; i < num.length; i++) {
  if (sum == 0) {
    sum = num[i];
  } else {
    sum *= num[i];
  }
  // console.log(sum);
}

console.log("Произведение цифр числа " + num + " = " + sum);
sum **= 3;
// console.log(sum);
console.log("Первые две цыфры числа - " + sum.toString().substr(0, 2));
