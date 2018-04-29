import { shallow, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import Comment from '../Comment.vue'
import merge from 'lodash.merge'

const localVue = createLocalVue()

localVue.use(Vuex)

function createStore (overrides) {
  const defaultStoreConfig = {
    state: {
      comments: {
        a1: {
          kids: []
        }
      }
    }
  }
  return new Vuex.Store(
      merge(defaultStoreConfig, overrides)
    )
}

function createWrapper (overrides) {
  const defaultMountingOptions = {
    stubs: {
      RouterLink: RouterLinkStub
    },
    localVue,
    propsData: {
      id: 'a1'
    },
    store: createStore()
  }
  return shallow(Comment, merge(defaultMountingOptions, overrides))
}

describe('Comment.vue', () => {
  test('sets router-link to prop using comment.by', () => {
    const store = createStore({
      state: {
        comments: {
          a1: {
            by: 'edd'
          }
        }
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.findAll('.by')).toHaveLength(1)
    expect(wrapper.find(RouterLinkStub).props().to).toBe('/user/edd')
  })

  test('does not render li if comment does not exist in store', () => {
    const store = createStore({
      state: {
        comments: {
          a1: null
        }
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.find('li').exists()).toBe(false)
  })

  test('initially renders open toggle if comment has kids', () => {
    const store = createStore({
      state: {
        comments: {
          a1: {
            kids: ['b1', 'b2']
          }
        }
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.find('.toggle').text()).toContain('[-]')
  })

  test('renders closed toggle after click if comment has kids', () => {
    const store = createStore({
      state: {
        comments: {
          a1: {
            kids: ['b1', 'b2']
          }
        }
      }
    })
    const wrapper = createWrapper({
      store,
      stubs: {
        RouterLink: true
      }
    })
    wrapper.find('a').trigger('click')
    expect(wrapper.find('.toggle').text()).toContain('[+] 2 replies collapsed')
  })

  test('does not render toggle if comment has no kids', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.toggle').exists()).toEqual(false)
  })

  test('renders a comment for each kid', () => {
    const store = createStore({
      state: {
        comments: {
          a1: {
            kids: ['b1', 'b2']
          }
        }
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.findAll(Comment)).toHaveLength(2)
  })

  test('hides comments when toggle is clicked', () => {
    const store = createStore({
      state: {
        comments: {
          a1: {
            kids: ['b1', 'b2']
          }
        }
      }
    })
    const wrapper = createWrapper({
      store,
      stubs: {
        RouterLink: true
      }
    })
    wrapper.find('a').trigger('click')
    expect(wrapper.findAll(Comment)).toHaveLength(2)
    expect(wrapper.findAll(Comment).isVisible()).toBeFalsy()
  })

  // test('renders correctly', () => {
  //   const dateNow = jest.spyOn(Date, 'now')
  //   const dateNowTime = new Date('2018')

  //   const store = createStore({
  //     state: {
  //       comments: {
  //         a1: {
  //           by: 'eddeyerburgh',
  //           id: 15970740,
  //           kids: ['a2'],
  //           parent: 15970485,
  //           text: 'Old fallacies that keep coming back.',
  //           time: (dateNowTime / 1000) - 7000,
  //           type: 'comment'
  //         },
  //         a2: {
  //           by: 'eddeyerburgh',
  //           id: 15970740,
  //           kids: null,
  //           parent: 15970485,
  //           text: 'Can you give three examples of different meanings?',
  //           time: (dateNowTime / 1000) - 6000,
  //           type: 'comment'
  //         }
  //       }
  //     }
  //   })

  //   dateNow.mockImplementation(() => dateNowTime)

  //   const wrapper = createWrapper({ store })
  //   dateNow.mockRestore()
  //   expect(wrapper.html()).toMatchSnapshot()
  // })
})
