<template>
  <AdvertisementsPreview :advertisements="advertisements" />
</template>

<script>
import AdvertisementsPreview from '../../../components/AdvertisementsPreview/AdvertisementsPreview'
import withAdvertisements from '../../../mixins/withAdvertisements'

export default {
  name: "AdvertisementsList",
  components: {AdvertisementsPreview},
  mixins: [withAdvertisements],
};
</script>

<style lang="scss" scoped>
</style>