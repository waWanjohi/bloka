<template>
  <div>
    Hey!!
  </div>
</template>

<script>
export default {
  mounted() {
    browser.runtime.sendMessage({});
  },

  data() {
    return {
      
    }
  }
};
</script>

<style></style>
