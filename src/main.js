import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import ProgressBar from './components/ProgressBar'
import storeConfig from './store/store-config'

Vue.use(Vuex) // #A

const store = new Vuex.Store(storeConfig) // #B

Vue.config.productionTip = false

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

new Vue({ // eslint-disable-line no-new
  el: '#app',
  store, // #C
  render: h => h(App)
})
