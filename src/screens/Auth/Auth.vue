<template>
  <div class="flex h-screen items-center justify-center">
    <div class="auth-container flex flex-col border-solid w-1/3 border-2 shadow-xl">
      <div class="relative flex items-start justify-center">
        <div class="absolute top-0 right-0">
          <select class="select-none cursor-pointer" v-model="$i18n.locale">
            <option v-for="({value, name }, i) in langs" :key="`Lang${i}`" :value="value">
              <div :class="`lang-item-${value}`">{{name}}</div>
            </option>
          </select>
        </div>
        <div class="auth-header flex flex-row text-xl pt-6">
          <h1>{{$t("auth.header")}}</h1>
          <div @click="loginModerator" class="auth-moderator pl-5 cursor-pointer" :title="$t('auth.tooltip')">
            <font-awesome-icon icon="key" />
          </div>
        </div>
      </div>

      <section class="login-field flex flex-col justify-center items-center pt-16">
        <div class="pb-16">
          <Input label="Email" title="email" v-model="email" :v="$v.email" />
        </div>
        <Button
          :isDisabled="$v.email.$error || !email"
          :classes="['auth-login-btn','w-56', 'mb-12', 'text-md']"
          :label="$t('auth.enterButton')"
          :handler="handleLogIn"
        />
      </section>
    </div>
  </div>
</template>

<script>
import Input from "../../components/Input/Input";
import { required, email } from "vuelidate/lib/validators";
import Button from "../../components/Button/Button";
export default {
  name: "Auth",
  components: { Input, Button },
  data() {
    return {
      email: "",
      langs: [
        { value: "ru", name: "Русский" },
        { value: "en", name: "English" }
      ]
    };
  },
  methods: {
    handleLogIn() {
      if (this.$v.email.$error && !email) {
        throw new Error("Email field should be valid");
      } else {
        this.$store
          .dispatch("USER_LOG_IN", this.email)
          .then(res => {
            this.$router.push("/adv");
          })
          .catch(e => console.error(e));
      }
    },
    loginModerator() {
      // [TODO] Get rid of this role implemetation
      this.$store
        .dispatch("USER_LOG_IN", "moderator")
        .then(res => {
          this.$router.push("/moderation");
        })
        .catch(e => console.error(e));
    }
  },
  validations: {
    email: {
      required,
      email
    }
  }
};
</script>

<style lang="scss">
.auth-container {
  border: 1px solid $yellow-op-5;
  .auth-header {
    h1 {
      color: #2d2a2a;
    }
  }

  .auth-moderator {
    &:hover {
      color: $yellow
    }
  }

  .auth-login-btn {
    @include button($yellow, $yellow-light);
  }

  .login-field > div {
    div > .has-float-label > input:focus + label {
      top: -9px;
    }
    div > .has-float-label > label {
      top: 5px;
    }
    div > span {
      margin-right: 3px;
      min-height: 37px;
    }
    div > .has-float-label > .label-floated {
      top: -9px;
    }
  }
}
</style>