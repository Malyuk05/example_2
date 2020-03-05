<template>
  <div class="flex h-full justify-center">
    <div class="container">
        <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: "Advertisements",
};
</script>

<style lang="scss">
  $orange: #FF5603;

  .adv_wrapper {
    width: 100%;
    display: flex;
    justify-content: center;

    .adv_container{
      width: 80%;
      height: auto;
      display: flex;
      justify-content: center;

      .adv_form {
        height: 100px;
        width: 100%;
      }
    }
  }
</style>
