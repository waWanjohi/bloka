<template>
  <div>
    <p>{{ defaultText }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  mounted() {
    browser.runtime.sendMessage({});
  },
  computed: {
    defaultText() {
      return "popup";
    },
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
