import { shallow } from '@vue/test-utils'
import Item from '../Item.vue'

test('renders item', () => {
  const wrapper = shallow(Item)
  expect(wrapper.text()).toContain('item')
})
