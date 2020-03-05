import {
  required,
  minLength,
  maxLength,
  url,
  numeric
} from "vuelidate/lib/validators";

let notGreaterThen = (_, obj) => parseInt(obj.discount) <= parseInt(obj.cost)

export const validator = {
  form: {
      topic: {
        required,
        minLength: minLength(2)
      },
      cost: {
        numeric,
        required
      },
      discount: {
        required,
        numeric,
        maxValue: notGreaterThen
      },
      reference: {
        required,
        url
      },
      located: {
        required,
        minLength: minLength(2)
      },
      terms: {
        required,
        minLength: minLength(6)
      },
      delivering: {
        required,
        minLength: minLength(2)
      },
      offerDesc: {
        required
      }
    }
}