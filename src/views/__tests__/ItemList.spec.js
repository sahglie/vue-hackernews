jest.mock('../../api/api.js')

import { shallow } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import { fetchListData } from '../../api/api'

describe('ItemList.vue', () => {
  test('renders an Item for each item returned by fetchListData', async () => {
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const items = [ {}, {} ]
    fetchListData.mockImplementation(() => Promise.resolve(items))
    const wrapper = shallow(ItemList, {mocks: {$bar}})
    await flushPromises()
    expect(wrapper.findAll(Item).length).toEqual(items.length)
  })

  test('passes an item object to each Item component', async () => {
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    fetchListData.mockImplementation(() => Promise.resolve(items))
    const wrapper = shallow(ItemList, {mocks: {$bar}})
    await flushPromises()
    const Items = wrapper.findAll(Item)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    }
    shallow(ItemList, {mocks: {$bar}})
    expect($bar.start).toHaveBeenCalled()
  })

  test('calls $bar.fail when load unsuccessful', async () => {
    const $bar = {
      start: () => {},
      fail: jest.fn()
    }
    fetchListData.mockImplementation(() => Promise.reject())
    shallow(ItemList, {mocks: {$bar}})
    await flushPromises()

    expect($bar.fail).toHaveBeenCalled()
  })

  test('calls $bar.finish when load successful', async () => {
    const $bar = {
      start: () => {},
      finish: jest.fn()
    }
    fetchListData.mockImplementation(() => Promise.resolve())
    shallow(ItemList, {mocks: {$bar}})
    await flushPromises()

    expect($bar.finish).toHaveBeenCalled()
  })
})
