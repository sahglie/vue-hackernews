import Vue from 'vue'
import App from './App'
import {
  fetchItems,
  fetchIdsByType
} from './api/api'

Vue.config.productionTip = false

function getTopItems () {
  return new Promise(resolve => { // eslint-disable-line no-new
    fetchIdsByType('top')
    .then(ids => fetchItems(ids))
    .then(items => resolve(items))
  })
}

getTopItems().then(res => {
  window.items = res
  new Vue({ // eslint-disable-line no-new
    el: '#app',
    render: h => h(App)
  })
})
