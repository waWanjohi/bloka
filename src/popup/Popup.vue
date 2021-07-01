<template>
  <div class="container">
    
    <section id="app" class="section">
      <h1 class="title is-1" v-text="form.formName"></h1>

      <div class="columns">
        <div class="column">
          <form>
            <div class="field">
              <label class="label">Easy to remember name</label>
              <div class="control">
                <input type="text" class="input" v-model="form.link.name" />
              </div>
            </div>

            <div class="field">
              <label class="label">Link</label>
              <div class="control">
                <input type="text" class="input" v-model="form.link.url" />
              </div>
            </div>
            <input
              class="button is-primary margin-bottom"
              type="submit"
              @click.prevent="fakeSubmit"
            />
          </form>

          <transition name="fade" mode="out-in">
            <article class="message is-primary" v-show="showSubmitFeedback">
              <div class="message-header">
                <p>Fake Send Status:</p>
              </div>
              <div class="message-body">
                <div v-if="this.form.link.name != ''">
                  {{ this.form.link.name }} Successfully Added!
                </div>
                <div v-else>
                  {{ this.form.link.url }} was added. Consider adding a name :)
                </div>
              </div>
            </article>
          </transition>
        </div>
        <div class="column">
          <h5>
            JSON
          </h5>
          <pre><code>{{form}}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Popup",

  data() {
    return {
      metadata: {},

      form: {
        formName: "Add a website to block List",
        userName: "",
        link: { name: "", url: "" },
      },
      showSubmitFeedback: false,
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
  },
};
</script>

<style scoped>
.container {
  width: 400px;
}

.margin-bottom {
  margin-bottom: 15px;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
</style>
