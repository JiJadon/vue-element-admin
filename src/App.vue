<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // created() {
  //   const vm = this;
  //   document.addEventListener("visibilitychange", function () {
  //     if (vm.$store.getters.token != localStorage.getItem("token")) {
  //       location.reload();
  //     }
  //   });
  // },
}

</script>
