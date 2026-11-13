let arr = ["258", "415", "18", "7122", "42", "31", "249"];
let isSimple;

for (let i = 0; i < arr.length; i++) {
  if (arr[i].startsWith("2") || arr[i].startsWith("4")) {
    console.log(arr[i]);
  }
}

for (let i = 2; i <= 100; i++) {
  isSimple = true;
  for (let j = 2; j <= Math.sqrt(i); j++) {
    if (i % j === 0) {
      isSimple = false;
      //   console.log(i, j);
      break;
    }
  }
  if (isSimple) {
    console.log(i + " — делители: 1 и " + i);
  }
}
