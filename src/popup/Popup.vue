<template>
  <div class="container">
    <h1 class="head">BLOKA</h1>

    <section id="app" class="section">
      <h1 class="title is-1" v-text="form.formName"></h1>
      <div class="columns">
        <div class="column">
          <form>
            <div class="field">
              <label class="label">Easy to remember name</label>
              <div class="control">
                <span
                  ><input
                    type="text"
                    class="input"
                    placeholder="An easy name eg. Google"
                    v-model="form.link.name"
                /></span>
              </div>
            </div>

            <div class="field">
              <label class="label">Link</label>
              <div class="control">
                <span
                  ><input
                    type="text"
                    class="input"
                    placeholder="Link eg. https://www.example.com"
                    ref="user_link"
                    v-model="form.link.url"
                /></span>
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
              <div
                v-if="this.form.link.name === '' && this.form.link.url === ''"
              >
                <p>this can't be empty</p>
              </div>
              <div v-else>
                <div v-if="this.form.link.url === ''">
                  Please first add a link
                </div>
                <div v-else>
                  <div class="message-body">
                    <div v-if="this.form.link.name != ''">
                      <div>{{ this.form.link.name }} Successfully Added!</div>
                    </div>
                    <div v-else>
                      <div v-if="!validURL(this.$refs.user_link.value)">
                        Please add an easy name for the link
                      </div>
                      <div v-else>
                        {{ this.form.link.url }} was added. Consider adding a
                        name :)
                      </div>
                    </div>
                  </div>
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
        formName: "Add this site to block List",
        link: { name: "", url: "" },
      },
      showSubmitFeedback: false,
      isValidLink: false,
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
        "^(https?:\\/\\/)?" +                                 // protocol (http1/http2)
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +  // domain name (example.com)
        "((\\d{1,3}\\.){3}\\d{1,3}))" +                       // OR ip (v4) address (127.0.0.1)
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +                   // port and path (:8080)
        "(\\?[;&a-z\\d%_.~+=-]*)?" +                          // query string (&some+query+here@?/)
          "(\\#[-a-z\\d_]*)?$",      
        "i"
      ); // fragment locator
      this.isValidLink = !!pattern.test(str);
    },
  },
};
</script>

<style scoped>
.container {
  width: 400px;
  margin: auto;
  text-align: center;
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

.head {
  color: black;
  font-weight: bolder;
}
</style>
