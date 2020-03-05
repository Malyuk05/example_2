<template>
  <AdvertisementsPreview :advertisements="admittedAdvts" />
</template>

<script>
import withAdvertisements from "../../../mixins/withAdvertisements";
import AdvertisementsPreview from "../../../components/AdvertisementsPreview/AdvertisementsPreview";

export default {
  name: "AdmittedAdvertisements",
  components: { AdvertisementsPreview },
  mixins: [withAdvertisements],
  computed: {
    admittedAdvts() {
      return this.advertisements.filter(ad => ad.isPublished) || [];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>