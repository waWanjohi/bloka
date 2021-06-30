<template>
  <div class="container">  
  <form id="contact" action="" method="post">
    <h3>Colorlib Contact Form</h3>
    <h4>Contact us for custom quote</h4>
       <fieldset>
      <input id="link_url" placeholder="Your Web Site (optional)" ref="user_link" type="url" tabindex="4" required>
    </fieldset>
    <fieldset>
      <textarea id="link_name" placeholder="An easy name.." tabindex="5"></textarea>
    </fieldset>
    <fieldset>
      <button  @click.prevent="reverseMessage" name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
    </fieldset>
    <fieldset>
  <p>{{ userLinks }}</p>
    <div id="ERROR_MSG"></div>
    </fieldset>
</form>
<div id="event-handling">
  <button>Show Message</button>
</div>
</div>
</template>

<script>
export default {
  name: "Popup",

  data(){
    return {
      userLinks: []
    }
  },
  methods: {
    reverseMessage() {
      // Don't add empty item
      if (this.$refs.user_link.value != ""){
      this.userLinks.push(this.$refs.user_link.value);      
      }

    }
  }
}
</script>
