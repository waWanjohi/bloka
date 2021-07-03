<template>
  <div id="todolist">
    <h1>
      Todo List
      <span>Get things done, one item at a time.</span>
    </h1>

    <main class="todolist">
      <h1>
        Todo List
        <span>Get things done, one item at a time.</span>
      </h1>

      <div v-if="link.length">
        <transition-group name="todolist" tag="ul">
          <li
            v-for="item in linkStatus"
            v-bind:class="item.paused ? 'done' : ''"
            v-bind:key="item.id"
          >
            <span class="label">{{ item.label }}</span>
            <div class="actions">
              <button
                class="btn-picto"
                type="button"
                v-on:click="pauseOrResumeLink(item)"
                v-bind:aria-label="item.done ? 'Undone' : 'Done'"
                v-bind:title="item.done ? 'Undone' : 'Done'"
              >
                <i aria-hidden="true" class="material-icons">{{
                  item.done ? "check_box" : "check_box_outline_blank"
                }}</i>
              </button>
              <button
                class="btn-picto"
                type="button"
                v-on:click="deleteItemFromList(item)"
                aria-label="Delete"
                title="Delete"
              >
                <i aria-hidden="true" class="material-icons">delete</i>
              </button>
            </div>
          </li>
        </transition-group>
        <togglebutton
          label="Move done items at the end?"
          name="todosort"
          v-on:clicked="clickOnToggle"
        />
      </div>
      <p v-else class="emptylist">Your todo list is empty.</p>

      <form name="newform" v-on:submit.prevent="addItems">
        <label for="newItem">Add to the todo list</label>
        <input type="text" name="newitem" id="newitem" v-model="newItem" />
        <button type="submit">Add item</button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: "LinkManager",
  el: "#todolist",

  mounted() {
    browser.runtime.sendMessage({});
  },

  props: ["label", "name"],
  template: `
    <div class="togglebutton-wrapper" v-bind:class="isactive ? 'togglebutton-checked' : ''">
      <label v-bind:for="name">
        <span class="togglebutton-label">{{ label }}</span>
        <span class="tooglebutton-box"></span>
      </label>
      <input v-bind:id="name" type="checkbox" v-bind:name="name" v-model="isactive" v-on:change="onToogle">
  </div>  
  `,

  model: {
    prop: "checked",
    event: "change",
  },

  data() {
    return {
      newItem: "",
      sortByStatus: false,
      isActive: false,
      link: [
        { id: 1, label: "Google", link: "google.com", paused: true },
        { id: 2, label: "Example", link: "example.com", paused: false },
        { id: 3, label: "Facebook", link: "facebook.com", paused: false },
      ],
    };
  },

  methods: {
    onToggle() {
      this.$emit("clicked", this.isActive);
    },

    addItems() {
      this.todo.push({
        id: Math.floor(Math.random() * 9999) + 10,
        label: this.newItem,
        paused: false,
      });
      this.newItem = "";
    },

    pauseOrResumeLink(link) {
      link.paused = !link.paused;
    },

    deleteLink(link) {
      let index = this.link.indexOf(link);
      this.link.splice(index, 1);
    },

    clickOnToggle(paused) {
      this.sortByStatus = paused;
    },
  },

  computed: {
    linkStatus() {
      if (!this.sortByStatus) {
        return this.link;
      }
      var sortedArray = [];
      var pausedArray = this.link.filter((link) => {
        return link.paused;
      });
      var notPausedArray = this.link.filter((link) => {
        return !link.paused;
      });

      sortedArray = [...notPausedArray, ...pausedArray];
      return sortedArray;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  background: #f7f1f1;
  font-size: 1.1rem;
  font-family: "Quicksand", sans-serif;
  height: 100%;
}
@keyframes strikeitem {
  to {
    width: calc(100% + 1rem);
  }
}

#todolist {
  margin: 4rem auto;
  padding: 2rem 3rem 3rem;
  max-width: 500px;
  background: #ff6666;
  color: #fff;
  box-shadow: -20px -20px 0px 0px rgba(100, 100, 100, 0.1);
}
#todolist h1 {
  /*text-align:center;*/
  font-weight: normal;
  font-size: 2.6rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
#todolist h1 span {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
  margin-left: 3px;
  margin-top: 0.2rem;
}

#todolist .emptylist {
  margin-top: 2.6rem;
  text-align: center;
  letter-spacing: 0.05em;
  font-style: italic;
  opacity: 0.8;
}
#todolist ul {
  margin-top: 2.6rem;
  list-style: none;
}
#todolist .todolist-move {
  transition: transform 1s;
}
#todolist li {
  display: flex;
  margin: 0 -3rem 4px;
  padding: 1.1rem 3rem;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
}

#todolist .actions {
  flex-shrink: 0;
  padding-left: 0.7em;
}
#todolist .label {
  position: relative;
  transition: opacity 0.2s linear;
}
#todolist .done .label {
  opacity: 0.6;
}
#todolist .done .label:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -0.5rem;
  display: block;
  width: 0%;
  height: 1px;
  background: #fff;
  animation: strikeitem 0.3s ease-out 0s forwards;
}
#todolist .btn-picto {
  border: none;
  background: none;
  -webkit-appearance: none;
  cursor: pointer;
  color: #fff;
}

/* FORM */
form {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
}
form label {
  min-width: 100%;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}
form input {
  flex-grow: 1;
  border: none;
  background: #f7f1f1;
  padding: 0 1.5em;
  font-size: initial;
}
form button {
  padding: 0 1.3rem;
  border: none;
  background: #ff6666;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-left: 5px;
  cursor: pointer;
  transition: background 0.2s ease-out;
}
form button:hover {
  background: #ff5e5e;
}
form input,
form button {
  font-family: "Quicksand", sans-serif;
  height: 3rem;
}

/* TOOGLE COMPONENT */
.togglebutton-wrapper {
  margin-top: 1em;
}
.togglebutton-wrapper label {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.togglebutton-wrapper input {
  position: absolute;
  left: -9999px;
}
.togglebutton-wrapper .togglebutton-label {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
}
.togglebutton-wrapper .tooglebutton-box {
  position: relative;
  display: block;
  margin-left: 0.6em;
  width: 38px;
  height: 22px;
  background: white;
  /*border:1px solid black;*/
  border-radius: 999px;
  cursor: pointer;
}
.togglebutton-wrapper .tooglebutton-box:before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  display: block;
  width: 18px;
  height: 18px;
  /*border:1px solid #FF6666;*/
  border-radius: 50%;
  background: #ff6666;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;
}
.togglebutton-wrapper.togglebutton-focus .tooglebutton-box {
  box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, 0.1);
}
.togglebutton-wrapper.togglebutton-checked .tooglebutton-box:before {
  left: calc(100% - 4px - 16px);
  opacity: 1;
}
</style>
