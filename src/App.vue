<template>
  <div id="app">
    <router-view />
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
</style>
