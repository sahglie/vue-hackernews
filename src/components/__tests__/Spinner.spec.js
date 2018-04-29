import { shallow } from '@vue/test-utils'
import Spinner from '../Spinner.vue'

describe('Spinner.vue', () => {
  test('renders correctly', () => {
    expect(shallow(Spinner).html()).toMatchSnapshot() // #A
  })
})
