<template>
  <div class="app-wrapper">
    <router-view />
    <PublishNotification v-if="isNotificationDisplayed" />
  </div>
</template>

<script>
import PublishNotification from "./components/PublishNotification/PublishNotification";

export default {
  name: "App",
  components: { PublishNotification },
  computed: {
    isNotificationDisplayed() {
      return this.$store.state.isNotificationShown
    }
  },
};
</script>

<style lang="scss">
</style>