import HasMoney from '@/class/HasMoney';

/**
 * Нет обработки значений ниже нуля.
 */
function prettify(value) {
  value = value.toFixed(0);

  if (value.length === 1) {
    return value;
  }

  let firstNumber = Number(value[0]);
  let secondNumber = Number(value[1]);

  if (secondNumber < 3) {
    secondNumber = 0;
  } else if (secondNumber < 7) {
    secondNumber = 5;
  } else {
    firstNumber += 1;
    secondNumber = 0;
  }

  return `${firstNumber}${secondNumber}`.padEnd(value.length, 0);
}

class Preset extends HasMoney {
  get amount() {
    const { rate, presetRate } = this.currency;
    
    return prettify(this._attributes.amount * rate * presetRate);
  }
}

export default Preset;
