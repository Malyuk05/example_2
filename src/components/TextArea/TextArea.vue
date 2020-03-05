<template>
  <section class="adv-text-area">
    <ValidateIndicator v-if="v" :isValid="!v.$invalid"/>
    <vue-editor
      :editor-toolbar="customToolbar"
      :placeholder="isDisabled ? '' : placeholder"
			@input="(e) => handleComplete(e)"
      :value="isDisabled ? optValue : content"
      :disabled="isDisabled"
      :class="withoutToolbar ? 'withoutToolbar' : ''"
    />
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";
import ValidateIndicator from "../ValidateIndicatior/ValidateIndicator";

export default {
  name: "TextArea",
  components: { VueEditor, ValidateIndicator },
  props: {
    isDisabled: Boolean,
    optValue: String,
    withoutToolbar: Boolean,
    placeholder: String,
    content: String,
    v: Object,
  },
  data: () => ({
    // textAreaPlaceholder: placeholder,
    customToolbar: [
			["bold","strike", "italic", "underline", ],
      [{ list: "bullet" }],
      ["image"]
    ]
	}),
	methods: {
		handleComplete(val) {
      console.log(val)
			this.$emit("complete", val)
		}
	}
};
</script>

<style lang="scss">
.adv-text-area {
  display: flex;

  .withoutToolbar {
    border-bottom: 1px solid #ccc;
    .ql-toolbar {
      display: none
    }
  }

  .quillWrapper {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;

		.ql-toolbar.ql-snow+.ql-container.ql-snow {
			border-top: 1px solid #ccc;
		}
		
    .ql-container {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
			border-bottom: 0;
    }

    .ql-toolbar {
      border: 1px solid #ccc;
      border-top: 0;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;

      .ql-formats {
        button:hover {
          color: rgb(230, 161, 127);
        }
        .ql-active {
          color: rgb(255, 41, 3);
        }

        .ql-stroke {
          stroke: #ff5603;
        }

        .ql-fill {
          fill: #ff5603;
        }
      }
    }
  }
}
</style>