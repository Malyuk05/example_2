<template>
  <div class="push-notification flex flex-col justify-center items-center absolute bottom-0 right-0 h-24">
    <div class="push-notification-title">{{$t('advertise.ad')}} {{content.ad.topic}}</div>
    <div>{{content.ad.reference}}</div>
    <div>{{content.isPublished ? $t('advertise.adPublished') : ""}}</div>
  </div>
</template>

<script>
  export default {
    name: "PublishNotification",
    computed: {
      content(){
        return this.$store.state.notificationContent
      }
    }
  }
</script>

<style lang="scss" scoped>
  .push-notification {
    border: 2px solid #ff560357;
    border-top-left-radius: 5px;
    border-bottom: 5px solid #00c85385;
    padding: 10px;

    .push-notification-title {
      font-size: 18px;
      color: $orange;
    }
  }
</style>