import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = { // #A
  items: []
}

export default { // #B
  state,
  getters,
  actions,
  mutations
}
