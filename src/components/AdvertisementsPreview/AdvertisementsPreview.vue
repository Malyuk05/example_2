<template>
  <div>
    <div
      class="advt-preview h-full flex flex-col justify-center items-center"
      v-for="item in advertisements"
      :key="item.date"
    >
      <div class="moderator-controls" v-if="userRole === 'moderator'">
        <div class="adv-user">{{item.email}}</div>
        <div class="button-group">
          <Button
            v-if="!item.isPublished"
            icon="check-circle"
            :classes="['admit-btn']"
            :handler="() => handleAdmit(item.id)"
          />
          <Button icon="times-circle" :classes="['reject-btn']" :handler="() => handleReject(item.id)" />
        </div>
      </div>
      <div class="advt-item flex flex-wrap relative w-full max-w-6xl">
        <div class="advt-list-item" v-for="(ad, key) in item.ad" :key="`${key}-${item.date}`">
          <template v-if="key !== 'discountPercent'">
            <span v-if="key !== 'offerDesc'" :value="ad">{{$t(`advertise.inputs.${key}`)}}</span>
            <Input v-if="key !== 'offerDesc'" :isPreview="true" :value="ad" disabled />
            <TextArea v-else :isDisabled="true" :withoutToolbar="true" :optValue="ad" />
          </template>
          <span class="preview-discount" v-else>{{$t(`advertise.inputs.${key}`)}} : {{ad}} %</span>
        </div>
      </div>
      <span class="preview-hr"></span>
    </div>
  </div>
</template>

<script>
import withAdvertisements from "../../mixins/withAdvertisements";
import TextArea from "../TextArea/TextArea";
import { labels } from "../../helpers";
import Button from "../Button/Button";
import Input from "../Input/Input";

export default {
  name: "AdvertisementsPreview",
  props: {
    advertisements: Array,
    userRole: String,
    handleAdmit: Function,
    handleReject: Function
  },
  data: () => ({
    labels
  }),
  components: { TextArea, Button, Input }
};
</script>

<style lang="scss">
.advt-preview {
  padding: 15px 0;
  .advt-item {
    .preview-discount {
      position: absolute;
      right: -10px;
      top: 30px;
      width: 20%;
      white-space: nowrap;
    }
    .advt-list-item:first-child {
      width: 80%;
      padding-bottom: 10px;
      div {
        width: 100%;
        input {
          width: 100%;
        }
      }
    }
    .advt-list-item:nth-child(n + 2) {
      width: 50%;
      padding: 5px;
      div {
        width: 100%;
        input {
          width: 100%;
        }
      }
    }
    .advt-list-item:nth-child(n + 4):not(:first-child) {
      div > input {
        padding-left: 40px;
      }
      div > label {
        left: 50px;
      }
    }

    .advt-list-item:nth-last-child(2) {
        width: 100%;
    }
  }
  &:not(:last-child) {
    .preview-hr {
      height: 2px;
      width: 100%;
      background: $orange;
    }
  }
  .admit-btn{
    width: 60px;
    height: 30px;
    color: $green;
    @include button($green, $green-light,white)
  }
  .reject-btn {
    width: 60px;
    height: 30px;
    color: $red;
    @include button($red, $red-light,white)
  }
}
</style>