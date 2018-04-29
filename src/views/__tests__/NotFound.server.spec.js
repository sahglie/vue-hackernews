/**
 * @jest-environment node
 */

import { renderToString, render } from '@vue/server-test-utils'
import NotFound from '../NotFound.vue'

test('renders correctly on server ', () => {
  const wrapper = renderToString(NotFound)
  expect(wrapper).toMatchSnapshot()
})

test('renders 404 inside <h1> tag', () => {
  const wrapper = render(NotFound) // #A
  expect(wrapper.find('h1').text()).toBe('404') // #B
})
