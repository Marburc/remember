import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueLodash from 'vue-lodash'

const options = { name: 'lodash' } // customize the way you want to call it
Vue.filter('toUpperCase', function (value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
})
export const eventBus = new Vue()

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({

  render: h => h(App)
}).$mount('#app')
