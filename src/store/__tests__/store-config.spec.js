jest.mock('../../api/api') // #A

import Vuex from 'vuex'
import Vue from 'vue'
import deepClone from 'lodash.clonedeep'
import flushPromises from 'flush-promises'
import storeConfig from '../store-config'
import { fetchListData } from '../../api/api'

Vue.use(Vuex) // #B

function createItems () { // #C
  const arr = new Array(22)
  return arr.fill().map((item, i) => ({id: `a${i}`, name: 'item'}))
}

describe('store-config', () => {
  test('calling fetchListData with the type returns top 20 activeItems from activeItems getter', async () => {
    const items = createItems() // #D
    const clonedStoreConfig = deepClone(storeConfig) // #E
    const store = new Vuex.Store(clonedStoreConfig) // #F
    const type = 'top'
    fetchListData.mockImplementation((calledType) => { // #G
      return calledType === type
        ? Promise.resolve(items)
        : Promise.resolve()
    })
    store.dispatch('fetchListData', { type }) // #H

    await flushPromises()

    expect(store.getters.displayItems).toHaveLength(20)
    expect(store.getters.displayItems.every((item, i) => item === items[i])).toBe(true)// #I
  })
})
