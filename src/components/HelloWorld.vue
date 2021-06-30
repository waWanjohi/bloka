<template>
  <div id="mount-point">{{items}}</div>
</template>

<script>
export default {
  name: "HelloWorld",
  mounted() {
    browser.runtime.sendMessage({});
  },
  data() {
    return {
      items: [
        "Apples",
        "Broccoli",
        "Chicken",
        "Bacon",
        "Eggs",
        "Salmon",
        "Granola",
        "Bananas",
        "Beer",
        "Wine",
        "Yogurt"
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  background: #e1e3de;
}

#mount-point {
  padding: 60px;
  max-width: 800px;
  margin: auto;
  
  input {
    line-height: 2;
    font-size: 18px;
    height: auto;
    padding-left: 20px;
  }
  
  ul {
    margin: 0;
  
  li {
    list-style: none;
    border: 1px solid #ccc;
    margin-top: -1px;
    line-height: 2;
    padding: 5px 20px;
    background: white;
  }
    
  }
  
}
</style>
