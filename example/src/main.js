import Vue from 'vue'

new Vue({
  el: '#app',
  mounted() {
    console.log(this.message);
  },
  data: {
    message: 'Hello Vue! 123'
  },
  template: `
    <h1>{{ message }}</h1>
  `
})