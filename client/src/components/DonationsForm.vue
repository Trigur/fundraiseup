<template>
  <form @submit.prevent="send" class="donations-form">
    <div class="donations-form__buttons-grid">
      <button 
        v-for="item in presets" 
        :key="item.amount"
        type="button"
        @click="updatePreset(item)"
      >
        {{ item.amount }}
      </button>
    </div>

    <input
      v-model="form.amount"
      v-positive-number
      type="text"
      required
      @input="amountInput"
    />

    <select 
      v-model="currency"
    >
      <option
        v-for="item in currencies"
        :key="item.symbol"
      >
        {{ item.name }}
      </option>
    </select>

    <button :disabled="isLoading">
      Отправить
    </button>
  </form>
</template>

<script>
import Currency from '@/class/Currency';
import DonationsForm from '@/class/DonationsForm';
import Preset from '@/class/Preset';
import currenciesData from '@/constants/currencies';
import presetsData from '@/constants/presets';

function cleanNumber(e) {
  e.target.value = e.target.value.replace(/([^\d]|^0)/g, '');
};

export default {
  directives: {
    positiveNumber: {
      bind(el) {
        el.addEventListener('input', cleanNumber, true);
      },
    },
  },

  data() {
    const currencies = currenciesData.map(item => new Currency(item));
    const defaultCurrency = currencies[0];

    return {
      currencies,
      presets: presetsData.map(amount => new Preset({
        amount,
        currency: defaultCurrency,
      })),

      preset: null,
      isLoading: false,

      form: new DonationsForm({
        currency: defaultCurrency,
      }),
    };
  },

  computed: {
    currency: {
      get() {
        return this.form.currency.name;
      },

      set(name) {
        const currency = this.currencies.find(item => item.name === name);

        this.form.currency = currency;
        this.presets.forEach(item => item.currency = currency);

        if (this.preset) {
          this.updatePreset(this.preset);
        }
      },
    },
  },

  methods: {
    amountInput() {
      this.preset = null;
    },

    updatePreset(item) {
      this.preset = item;

      this.form.amount = this.preset.amount;
    },

    send() {
      this.isLoading = true;

      this.form.send()
        .then(() => {
          alert('Thank you for your donation!');
        })
        .catch(error => {
          alert(error?.response?.data || error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.donations-form {
  display: grid;
  grid-gap: 10px;
  padding: 20px 35px;

  &__buttons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 5px;
  }
}
</style>
