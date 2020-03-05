<template>
  <div class="navigation">
    <router-link v-for="tab in tabList" :key="tab.name" :to="tab.href">{{labels[tab.name]}}</router-link>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    tabList: Array
  },
  created() {
    // find better solution
    this.labels.create = this.$t("advertise.tabs.createAd")
    this.labels.all = this.$t("advertise.tabs.allAds")
    this.labels.admitted = this.$t("advertise.tabs.publishedAds")
  },
  data: () => ({
    labels: {
      "create": null,
      "all": null,
      "admitted": null
    }
  })
};
</script>

<style lang="scss">
.navigation {
  display: flex;
  justify-content: center;

  .router-link-exact-active {
    color: $orange;
  }

  a {
    padding: 5px 10px;
    font-size: 16px;
    color: white
  }
}
</style>

