import Vue from 'vue'
import {
  titleMixin
} from './src/util/mixins'
import {
  timeAgo,
  host
} from './src/util/filters'

Vue.config.productionTip = false 

Vue.filter('timeAgo', timeAgo)
Vue.filter('host', host)
Vue.mixin(titleMixin) 
