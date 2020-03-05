<template functional>
    <button 
      :class="props.classes"
      :disabled="props.isDisabled"
      @click="props.handler"
    >
      <font-awesome-icon v-if="props.icon" :icon="props.icon" />
      <span v-if="props.label" class="advt-btn-label">{{ props.label }}</span>
    </button>
</template>

<script>
  export default {
    name:"AdvtButton",
    props: {
      label: String,
      isDisabled: Boolean,
      classes: Array,
      handler: Function,
      icon: String
    }
  }
</script>

<style lang="scss" scoped>
  button:disabled {
    border: 1px solid #bebebd;
    color: #bebebd;
    &:hover {
      background: transparent;
      font-weight: normal;
    }
  }

</style>