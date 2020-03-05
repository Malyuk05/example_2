<template functional>
  <span :class="`validation validation-${props.isValid ? 'success' : 'invalid'}`"></span>
</template>

<script>
export default {
  name: "ValidateIndicator",
  props: {
    isValid: {
      type: Boolean,
      required: true
    },
  }
};
</script>

<style lang="scss" scoped>

  .validation {
    margin: 0;
    border-radius: 5px;
    min-height: 32px;
    width: 4px;
    display: flex;

    &-success {
      background: $green;
    }
    &-invalid {
      background: $orange;
    }
  }
</style>
