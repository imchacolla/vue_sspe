// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueProgressBar from 'vue-progressbar'

Vue.use(BootstrapVue)
Vue.use(VueProgressBar, {
  color: '#4DBD74',
  failedColor: 'red',
  height: '2px'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  data () {
    return {
      url: 'http://sspe.planificacion.gob.bo/'
    }
  }
})
