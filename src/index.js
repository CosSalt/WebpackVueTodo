import Vue from 'vue'
import App from './app.vue'

import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'
import './assets/images/bg.jpg'

const vueRoot = document.createElement('div')
document.body.appendChild(vueRoot);


new Vue({
  render:(h) =>h(App)
}).$mount(vueRoot)