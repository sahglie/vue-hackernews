jest.mock('../../api/api.js')
jest.useRealTimers()

import { shallow, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import merge from 'lodash.merge'

describe('ItemList.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  function createStore (overrides) {
    const defaultStoreConfig = {
      state: {
        items: [{}, {}, {}]
      },
      getters: {
        displayItems: jest.fn()
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve())
      }
    }
    return new Vuex.Store(
        merge(defaultStoreConfig, overrides)
      )
  }

  function createWrapper (overrides) {
    const defaultMountingOptions = {
      mocks: {
        $bar: {
          start: jest.fn(),
          finish: jest.fn()
        },
        $route: {
          params: {}
        },
        $router: {
          replace: jest.fn()
        }
      },
      localVue,
      propsData: {
        type: 'top'
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      store: createStore()
    }
    return shallow(ItemList, merge(defaultMountingOptions, overrides))
  }

  test('renders an Item for each item in displayItems getter', async () => {
    const items = [{}, {}, {}]
    const store = createStore({
      getters: {
        displayItems: () => items
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.findAll(Item)).toHaveLength(items.length)
  })

  test('passes an item object to each Item component', async () => {
    const items = [{}, {}, {}]
    const store = createStore({
      getters: {
        displayItems: () => items
      }
    })
    const wrapper = createWrapper({ store })
    await flushPromises()
    const Items = wrapper.findAll(Item)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('calls $bar start on render', () => {
    const mocks = {
      $bar: {
        start: jest.fn()
      }
    }
    createWrapper({ mocks })
    expect(mocks.$bar.start).toHaveBeenCalled()
  })

  test('calls $bar finish when load successful', async () => {
    const mocks = {
      $bar: {
        finish: jest.fn()
      }
    }
    createWrapper({ mocks })
    await flushPromises()
    expect(mocks.$bar.finish).toHaveBeenCalled()
  })

  test('calls $bar fail when load is unsuccessful', async () => {
    const store = createStore({
      actions: { fetchListData: jest.fn(() => Promise.reject()) }
    })
    const mocks = {
      $bar: {
        fail: jest.fn()
      }
    }
    createWrapper({ mocks, store })
    await flushPromises()
    expect(mocks.$bar.fail).toHaveBeenCalled()
  })

  test('dispatches fetchListData with type prop', async () => {
    const store = createStore()
    store.dispatch = jest.fn(() => Promise.resolve())
    const type = 'a type'
    const propsData = {
      type
    }
    createWrapper({ store, propsData })
    await flushPromises()
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', { type })
  })

  test('calls $bar fail when fetchListData throws', async () => {
    const store = createStore({
      actions: { fetchListData: jest.fn(() => Promise.reject()) }
    })
    const mocks = {
      $bar: {
        fail: jest.fn()
      }
    }
    createWrapper({ mocks, store })
    await flushPromises()
    expect(mocks.$bar.fail).toHaveBeenCalled()
  })

  test('renders 1/5 when on page 1 of 5', () => {
    const store = createStore({
      state: {
        items: new Array(100).fill({})
      }
    })
    const wrapper = createWrapper({store})
    expect(wrapper.text()).toContain('1/5')
  })

  test('renders 2/5 when on page 2 of 5', () => {
    const store = createStore({
      state: {
        items: new Array(100).fill({})
      }
    })
    const mocks = {
      $route: {
        params: {
          page: 2
        }
      }
    }
    const wrapper = createWrapper({ mocks, store })
    expect(wrapper.text()).toContain('2/5')
  })

  test('calls $router.replace when the page parameter is less than 0', async () => {
    const mocks = {
      $route: {
        params: {
          page: -1
        }
      },
      $router: {
        replace: jest.fn()
      }
    }
    createWrapper({ mocks })
    await flushPromises()
    expect(mocks.$router.replace).toHaveBeenCalledWith('/top/1')
  })

  test('calls $router.replace when the page parameter is greater than the max page number', async () => {
    const mocks = {
      $route: {
        params: {
          page: 1000
        }
      },
      $router: {
        replace: jest.fn()
      }
    }
    createWrapper({ mocks })
    await flushPromises()
    expect(mocks.$router.replace).toHaveBeenCalledWith('/top/1')
  })

  test('renders a <router-link> with the next page if one exists', () => {
    const store = createStore({ state: {
      items: new Array(40).fill({})
    }})
    const wrapper = createWrapper({ store })
    expect(wrapper.find(RouterLinkStub).props().to).toBe('/top/2')
    expect(wrapper.find(RouterLinkStub).text()).toBe('more >')
  })

  test('renders an <a> element without an href if there are no previous pages', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('a').attributes().href).toBe(undefined)
    expect(wrapper.find('a').text()).toBe('< prev')
  })

  test('renders an <a> element without an href if there are no next pages', () => {
    const store = createStore({ state: {
      items: []
    }})
    const wrapper = createWrapper({ store })

    expect(wrapper.findAll('a').at(1).attributes().href).toBe(undefined)
    expect(wrapper.findAll('a').at(1).text()).toBe('more >')
  })
})
