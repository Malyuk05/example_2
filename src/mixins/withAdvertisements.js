export default {
  computed: {
		email() {
			return localStorage.getItem("email") || ""
		},
    advertisements() {
      return this.$store.getters.getAdvts
			// let ads = localStorage.getItem("ads") ? JSON.parse(localStorage.getItem("ads")) : [];
			
			// return ads.length ? ads.filter( i => i.email === this.email) : []
		},
  }
};
