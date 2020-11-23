import HasMoney from '@/class/HasMoney';
import request from '@/utils/request';

class DonationsForm extends HasMoney {
  attributes() {
    return {
      ...super.attributes(),
      amount: value => {
        if (!value) {
          return undefined;
        }

        return Number(value);
      },
    };
  }

  send() {
    return request({
      method: 'post',
      url: '/donate',
      data: {
        currency: this.currency.code,
        amount: this.amount,
      },
    });
  }
}

export default DonationsForm;
