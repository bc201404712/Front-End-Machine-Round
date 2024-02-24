const genrateCycle = (arr) => {
  let index = 0;
  return function() {
    const currentValue = arr[index];
    index = (index + 1) % arr.length;
    return currentValue;

  }
}

let cycle = genrateCycle(['a','b','c']);
console.log(cycle());
console.log(cycle());
console.log(cycle());
console.log(cycle());