<template>
  <div class="input-container pt-8 flex justify-center">
    <form class="flex flex-col w-full max-w-6xl" @submit.prevent="handleSubmit" novalidate>
      <div class="flex flex-wrap">
        <Input
          v-for="{label, icon, title, type} in inputs"
          :key="label"
          :icon="icon"
          :label="$t(`advertise.inputs.${title}`)"
          :title="title"
          :withAutocomplete="false"
          :type="type"
          :discountPercent="discountPercent"
          v-model="form[title]"
          :v="$v.form[title]"
        />
      </div>
      <div class="w-full">
        <TextArea
          :v="$v.form.offerDesc"
          :content="form.offerDesc"
          :placeholder="$t('advertise.inputPlaceholders.offerDesc')"
          @complete="handleTextArea"
        />
      </div>
      <Button
        class="submit-btn"
        :handler="handleSubmit"
        :classes="['submit-btn']"
        :label="$t('advertise.publishButton')"
        :isDisabled="$v.form.$invalid"
      />
    </form>
  </div>
</template>

<script>
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import { inputs, generateId } from "../../helpers";
import withAdvertisements from "../../mixins/withAdvertisements";
import { validator } from "./validator";

export default {
  name: "AdvertiseForm",
  components: { Input, TextArea, Button },
  mixins: [withAdvertisements],
  data: () => ({
    discountPercent: null,
    form: {
      topic: "",
      cost: "",
      discount: "",
      reference: "",
      located: "",
      terms: "",
      delivering: "",
      offerDesc: ""
    },
    inputs
  }),
  watch: {
    "form.discount"(val) {
      this.discountPercent = ((val / this.form.cost) * 100).toFixed(2);
    }
  },
  methods: {
    handleTextArea(content) {
      this.form.offerDesc = content;
    },
    handleSubmit(e) {
      this.$v.form.$touch();
      let expire_date = new Date().getTime() + 86400000; // expire in one day
      this.$store.dispatch("SET_ADVT", [
        {
          ad: { ...this.form, discountPercent: this.discountPercent },
          email: this.$store.state.user,
          expire_date,
          isPublished: false,
          id: generateId()
        }
      ]);
      Object.keys(this.form).forEach((key, index) => {
        this.form[key] = "";
      });
    }
  },
  validations: {
    ...validator
  }
};
</script>
 
<style lang="scss">
.input-container {
  form > div:first-child {
    div:first-child {
      width: 80%;
      padding-bottom: 10px;
      div {
        width: 100%;
        input {
          width: 100%;
        }
      }
    }
    div:nth-child(n + 2) {
      width: 50%;
      padding: 5px;
      div {
        width: 100%;
        input {
          width: 100%;
        }
      }
    }
    div:nth-child(-n + 3):not(:first-child) {
      > svg {
        position: absolute;
        z-index: 2;
        right: 30px;
      }
    }
    div:nth-child(n + 4):not(:first-child) {
      > svg {
        position: absolute;
        z-index: 2;
        left: 30px;
      }
      div > input {
        padding-left: 40px;
      }
      div > label {
        left: 50px;
      }
    }
  }
  form > div:not(:first-child) {
    padding: 20px 0 0 0;
  }
}
.submit-btn {
  margin: 10px auto;
  padding: 5px 10px;
  @include button($yellow, $yellow-light);
}
</style>