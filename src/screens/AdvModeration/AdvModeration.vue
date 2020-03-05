<template>
  <div class="moder-wrapper">
    <header class="moder-header">
      <div class="relative flex justify-center h-full items-center">
        <Button :classes="['backButton']" icon="long-arrow-alt-left" :handler="handleBackButton" />
        <span>{{$t("moder.header")}}</span>
      </div>
    </header>
    <div class="moder-container">
      <div class="moder-adv-items">
        <AdvertisementsPreview
          :advertisements="allAdvertisements"
          :disabled="true"
          :withoutToolbar="true"
          :userRole="user"
          :handleAdmit="this.handleAdmitAdv"
          :handleReject="this.handleRejectAdv"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdvertisementsPreview from "../../components/AdvertisementsPreview/AdvertisementsPreview";
import withAdvertisements from "../../mixins/withAdvertisements";
import Button from "../../components/Button/Button";
import withBackButton from "../../mixins/withBackButton";
import withRedirection from "../../mixins/withRedirection";
import sortBy from "lodash/sortBy";
import { mapState } from "vuex";

export default {
  name: "AdvModeration",
  components: { AdvertisementsPreview, Button },
  mixins: [withBackButton, withRedirection],
  computed: {
    allAdvertisements() {
      let allAdvts = this.$store.state.ads;
      return sortBy(allAdvts, a => a.isPublished).reverse();
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    handleAdmitAdv(id) {
      this.$store.dispatch("CHANGE_PUBLISH_STATE", { id, isPublished: true });
    },
    handleRejectAdv(id) {
      this.$store.dispatch("CHANGE_PUBLISH_STATE", { id, isPublished: false });
    }
  }
};
</script>

<style lang="scss" scoped>
.moder-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;

  .moder-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;

    .moder-adv-items {
      width: 100%;
    }
  }
  .moder-header {
    font-size: 20px;
    width: 100%;
    height: 50px;
    background: $black;
    div {
      button {
        color: white;
        position: absolute;
        left: 20px;
        &:hover {
          color: $orange;
        }
      }
      span {
        color: white
      }
    }
  }
}
</style>