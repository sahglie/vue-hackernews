import { fetchListData } from '../api/api'

export default {
  fetchListData: ({ commit, state, getters }, { type }) => {
    return fetchListData(type) // #A
      .then(items => commit('setItems', { items })) // #B
  }
}
