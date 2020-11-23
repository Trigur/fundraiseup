<template>
  <div class="donations-form-container">
    <donations-form></donations-form>
  </div>
</template>

<script>
import DonationsForm from '@/components/DonationsForm.vue';

export default {
  components: {
    DonationsForm,
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
}

.donations-form-container {
  max-width: 350px;
  border-radius: 10px;
  background: #f5f5f7;
  margin: auto;
}
</style>