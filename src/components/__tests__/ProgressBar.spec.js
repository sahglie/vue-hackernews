import { shallow } from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar.vue', () => {
  test('is hidden on initial render', () => {
    const wrapper = shallow(ProgressBar)
    expect(wrapper.classes()).not.toContain('show')
  })

  test('initializes with 0% width', () => {
    const wrapper = shallow(ProgressBar)
    expect(wrapper.element.style.width).toBe('0%')
  })

  test('sets width using vm.percent', () => {
    const wrapper = shallow(ProgressBar)
    wrapper.setData({ percent: 70 })
    expect(wrapper.element.style.width).toBe('70%')
  })
})
