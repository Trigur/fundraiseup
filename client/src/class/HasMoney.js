import BaseModel from '@/class/BaseModel';
import Currency from '@/class/Currency';

class HasMoney extends BaseModel {
  attributes() {
    return {
      currency: Currency,
      amount: Number,
    };
  }

  get amount() {
    return this._attributes.amount;
  }
}

export default HasMoney;
