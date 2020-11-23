import BaseModel from '@/class/BaseModel';

class Currency extends BaseModel {
  attributes() {
    return {
      name: String, 
      code: String, 
      symbol: String, 
      rate: Number,
      presetRate: value => {
        if (typeof value === 'undefined') {
          return 1;
        }

        return value;
      },
    };
  }
}

export default Currency;
