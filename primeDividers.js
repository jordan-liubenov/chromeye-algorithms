const primeDividers = (n) => {
  const primeDividerNums = [];

  for (let i = 2; i <= n; i++) {
    let isPrime = true;

    const current = i;

    for (let j = 2; j < current; j++) {
      if (current % j == 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      if (n % current == 0) {
        primeDividerNums.push(current);
      }
    }
  }

  return primeDividerNums.join(", ");
};
console.log(primeDividers(15));
console.log(primeDividers(11));
console.log(primeDividers(12));
