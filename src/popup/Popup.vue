<template>
  <div></div>
</template>


<script>
export default {
  name: "Popup",

  data() {
    return {
      metadata: {},

      form: {
        formName: "Add this a to block List",
        link: { name: "", url: "" },
      },
      showSubmitFeedback: false,
      isValidLink: false,
      tab: 'sdkj',
    };
  },
  methods: {
    fakeSubmit() {
      this.showSubmitFeedback = true;
      setTimeout(() => {
        this.showSubmitFeedback = false;
      }, 3000);
    },

    addLink() {
      // Don't add empty item
      if (this.$refs.user_link.value != "") {
        this.userLinks.push(
          { link: this.$refs.user_link.value },
          { nick: this.$refs.link_name.value }
        );
      }
    },

    // Check whether url is a link
    validURL(str) {
      let pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol (http1/http2)
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name (example.com)
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address (127.0.0.1)
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path (:8080)
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string (&some+query+here@?/)
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      this.isValidLink = !!pattern.test(str);
    },
  }
};
</script>
