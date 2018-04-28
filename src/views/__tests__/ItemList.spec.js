import { shallow } from '@vue/test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'

describe('ItemList.vue', () => {
  test('renders an Item for each item in window.items', () => {
    window.items = [{}, {}, {}]
    const wrapper = shallow(ItemList)
    expect(wrapper.findAll(Item).length).toEqual(window.items.length)
  })

  test('passes an item object to each Item component', () => {
    window.items = [{}, {}, {}]
    const wrapper = shallow(ItemList)
    const itemsArray = wrapper.findAll(Item)
    itemsArray.wrappers.forEach((wrapper, i) => {
      expect(wrapper.props().item).toBe(window.items[i])
    })
  })
})
