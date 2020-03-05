export default {
  created() {
    if(!this.$store.state.user) this.$router.push('/')
  }
};
