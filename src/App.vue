<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />

      <p>{{ message }}</p>
      <popup>
  </div>
</template>


<script>
import Popup from './popup/Popup.vue'
export default {
  components: { Popup },
  data () {
    return {
      message: "My new tab page"
    }
  }
}
</script>

<style scoped>
* {
  background: #615a5a;
}
</style>
