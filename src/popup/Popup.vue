<template>
  <div class="wrapper">
    <h1 class="head">Bloka</h1>

    <section id="app" class="section">
      <h1 class="title is-1" v-text="form.formName"></h1>
      <div class="columns">
        <div class="column">
          <form class="form">
            <div class="field">
              <label for="name" class="label">Easy to remember name</label>
              <div class="control">
                <input
                  name="name"
                  type="text"
                  class="input"
                  placeholder="An easy name eg. Google"
                  v-model="form.link.name"
                />
              </div>
            </div>

            <div class="field">
              <label for="link" class="label">Link</label>
              <div class="control">
                <input
                  name="link"
                  type="text"
                  class="input"
                  placeholder="Link eg. https://www.example.com"
                  ref="user_link"
                  v-model="form.link.url"
                />
              </div>
            </div>

            <div class="control">
              <input class="button" type="submit" @click.prevent="fakeSubmit" />
            </div>
          </form>

          <transition name="fade" mode="out-in">
            <article class="message is-primary" v-show="showSubmitFeedback">
              <div class="message-header">
                <p>Fake Send Status:</p>
              </div>
              <div
                v-if="this.form.link.name === '' && this.form.link.url === ''"
                class="message-body warn"
              >
                <p>Form can't be empty!</p>
              </div>
              <div v-else>
                <div class="message-body warn" v-if="this.form.link.url === ''">
                  Please first add a link
                </div>
                <div v-else>
                  <div class="message-body">
                    <div v-if="this.form.link.name != ''">
                      <div class="success">
                        {{ this.form.link.name }} Successfully Added!
                      </div>
                    </div>
                    <div class="message-body" v-else>
                      <div
                        class="warn"
                        v-if="!validURL(this.$refs.user_link.value)"
                      >
                        Please add an easy name for the link
                      </div>
                      <div class="message-body info" v-else>
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
          <button id="activeLink" ref="tab" onclick="getCurrentTab">Show Active</button>
          oo
          <h1>{{ tab }}</h1>
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

<style scoped>
* {
  margin: 0;
  padding: 0 4px 4px 4px;
  width: 300px;
}

.wrapper {
  width: 100%;
  background: #fff;
  margin-left: 20px;
  margin-right: 20px;
}

.wrapper .head {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  align-content: center;
}

.wrapper .form {
  width: 100%;
}

.wrapper .form .control {
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  width: 100%;
}
.wrapper .form .control label {
  width: 200px;
  color: black;
  margin-right: 10px;
  font-size: 14px;
}

.wrapper .form .control .input {
  width: 100%;
  outline: none;
  border: 1px solid #7f7f96;
  font-size: 12px;
  padding: 8px 10px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.wrapper .form .control .input:focus {
  border: 1px solid #0000ff;
  color: #2e2e4b;
}

.wrapper .form .control .button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 0;
  background: #0000ff;
  color: aliceblue;
  cursor: pointer;
  border-radius: 3px;
  outline: none;
}

.wrapper .form .control:last-child {
  margin-bottom: 0;
}

.wrapper .form .control .button:hover {
  background: #3232b1;
}


.message .warn {
  width: 100%;
  margin: 10px;
  padding: 10px;
  font-weight: bold;
  background: #f5b3a9;
  border-left: 3px solid #ff2600;
}

.message .success {
  width: 100%;
  margin: 10px;
  padding: 10px;
  font-weight: bold;
  background: #91f399;
  border-left: 3px solid #00ff15;
}

.column {
  width: 100%;
}
</style>
