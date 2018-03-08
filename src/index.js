import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const vueRoot = document.createElement('div')
document.body.appendChild(vueRoot);


new Vue({
  render:(h) =>h(App)
}).$mount(vueRoot)