<template>
  <div class="input-group-item relative flex items-center">
    <font-awesome-icon v-if="icon && !isPreview" :icon="icon" />

    <ValidateIndicator v-if="!isPreview" :isValid="!v.$invalid"/>
    <div class="has-float-label">
      <input
        :type="type"
        :autocomplete="withAutocomplete ? 'on': 'off'"
        class="form-input"
        :id="title"
        :name="title"
        v-model="prop"
        @input="v.$touch()"
        :disabled="isPreview"
      />
      <label :class="`form-label ${prop ? 'label-floated': ''}`" :for="title">{{label}}</label>
    </div>
    <span
      class="discount-field"
      v-if="!isPreview && !v.$invalid && 
      discountPercent &&
      title === 'discount'"
    >
      {{`${discountPercent}`}}
      <span>%</span>
    </span>
  </div>
</template>

<script>
import ValidateIndicator from "../ValidateIndicatior/ValidateIndicator";
export default {
  name: "Input",
  props: {
    icon: String,
    label: String,
    title: String,
    isValid: Boolean,
    discountPercent: String,
    withAutocomplete: {
      type: Boolean,
      default: true
    },
    type: String,
    isPreview: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    v: {
      type: Object,
    }
  },
  components: { ValidateIndicator },
  computed: {
    prop: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/_floating-label-input";

.discount-field {
  position: absolute;
  right: 65px;
  padding: 1px 10px;
  border: 1px solid $orange;
  border-radius: 20px;
}

.has-float-label {
  @include float-label-container;

  display: flex;
  align-items: center;
  justify-content: center;

  @include float-label;
  input,
  select,
  textarea {
    @include float-label-input;
    font-size: inherit;
    padding: 0.3em;
    margin-bottom: 2px;
    padding-left: 20px;
    border: 0;
    border-radius: 6px;
    outline: none;
    border: 2px solid #d0d0d0;

    &::-webkit-inner-spin-button,
    ::-webkit-calendar-picker-indicator {
      display: none;
      -webkit-appearance: none;
    }

    &:-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0px 1000px #fff inset;
      transition: background-color 5000s ease-in-out 0s;
    }

    &:disabled {
      background: transparent
    }

    @include float-label-scaled {
      top: 0.5em;
    }

    &:focus + .form-label {
      @include floated-label;
    }
  }
  .label-floated {
    @include floated-label;
  }
}
</style>