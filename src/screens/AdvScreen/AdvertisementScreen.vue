<template>
  <div class="adv-screen-wrapper h-full">
    <div class="advertise-navigator relative flex justify-center items-center">
      <Button :classes="['backButton']" icon="long-arrow-alt-left" :handler="handleBackButton" />
      <Navigation :tabList="tabs"></Navigation>
    </div>
    <router-view></router-view>
    <Advertisements v-if="$route.path === '/adv'">
      <AdvertiseForm />
    </Advertisements>
  </div>
</template>

<script>
import Advertisements from "../../components/Advertisements/Advertisements";
import Navigation from "../../components/Navigation/Navigation";
import Button from "../../components/Button/Button";
import withBackButton from "../../mixins/withBackButton";
import withRedirection from "../../mixins/withRedirection";
import AdvertiseForm from "../../components/AdvertiseForm/AdvertiseForm";

export default {
  name: "AdvertisementScreen",
  components: { Advertisements, Navigation, Button, AdvertiseForm },
  mixins: [withBackButton, withRedirection],
  data: () => ({
    tabs: [
      { name: "create", label: "Создать объявление", href: "/adv", icon: "" },
      { name: "all", label: "Все объявления", href: "/adv/all", icon: "" },
      {
        name: "admitted",
        label: "Опубликованые объявление",
        href: "/adv/admitted",
        icon: ""
      }
    ]
  }),
  mounted() {
    const { user } = this.$store.state;
    // watcher for advertise isPublished flag
    if (user) {
      console.log("set watch");
      this.$store.watch(
        () => this.$store.getters.getAllAdvts,
        (newAds, oldAds) => {
          const comparer = otherArray => current =>
            otherArray.filter(
              other =>
                other.id === current.id &&
                other.isPublished === current.isPublished
            ).length === 0;

          let filteredNew = newAds.filter(comparer(oldAds));
          let filteredOld = oldAds.filter(comparer(newAds));

          let changes = filteredNew.concat(filteredOld);
          console.log("changes", changes);
          // changes [0], [1] - new, old adv
          if ( changes.length && changes[0].email === user) {
            if (changes[0].isPublished) {
              console.log("==show notif==");
              this.$store.dispatch("SHOW_NOTIFICATION", {
                ad: changes[0],
                published: changes[0].isPublished
              });
            }
          }
        }
      );
    }
  }
};
</script>

<style lang="scss">
.backButton {
  color: white;
  position: absolute;
  left: 20px;
  &:hover {
    color: $orange
  }
}
.advertise-navigator {
  background: $black;
  height: 50px;
}
</style>