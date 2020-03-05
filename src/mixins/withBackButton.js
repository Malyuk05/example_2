import {asyncLocalStorage} from '../helpers'

export default {
  methods: {
    handleBackButton() {
      asyncLocalStorage.removetem("email")
      .then( () => {
        this.$router.push("/")
      })
    }
  }
};
