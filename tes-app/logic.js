let number = '1225441';

const distruct = (num) => {
  let olah = num.split('').reverse();
  let zero = '';
  let hasil = []

  for (let i = 0; i < olah.length; i++) {
    if (i === 0 && olah[i] != 0) {
      hasil.push(olah[i]);
    } else if (olah[i] != 0) {
      hasil.push(olah[i] + zero)
    }
    zero += '0';
  }

  return hasil.reverse();
}

console.log(distruct(number))
