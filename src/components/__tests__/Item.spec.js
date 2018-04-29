import { shallow } from '@vue/test-utils'
import Item from '../Item.vue'

describe('Item.vue', () => {
  test('renders item.score', () => {
    const item = {
      score: 10
    }
    const wrapper = shallow(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.score)
  })

  test('renders item.by', () => {
    const item = {
      by: 'some author'
    }
    const wrapper = shallow(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.by)
  })

  test('renders an <a> element containing item.title', () => {
    const item = {
      title: 'some title'
    }
    const wrapper = shallow(Item, {
      propsData: { item }
    })
    expect(wrapper.find('a').text()).toBe(item.title)
  })

  test('renders an a tag with href item.url', () => {
    const item = {
      url: 'http://some-url.com'
    }
    const wrapper = shallow(Item, {
      propsData: { item }
    })
    const aWrapper = wrapper.find('a')
    expect(aWrapper.attributes().href).toBe(item.url)
  })

  test('renders the time since the last post', () => {
    const dateNow = jest.spyOn(Date, 'now')
    const dateNowTime = new Date('2018')

    dateNow.mockImplementation(() => dateNowTime)

    const item = {
      time: (dateNowTime / 1000) - 600
    }
    const wrapper = shallow(Item, {
      propsData: {
        item
      }
    })
    dateNow.mockRestore()
    expect(wrapper.text()).toContain('10 minutes ago')
  })

  test('renders the host name', () => {
    const item = {
      url: 'https://some-url.com/with-paths'
    }
    const wrapper = shallow(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain('(some-url.com)')
  })
})
