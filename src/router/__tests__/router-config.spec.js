import { createLocalVue } from '@vue/test-utils'
import Router from 'vue-router'
import routerConfig from '../router-config'
import ItemList from '../../views/ItemList.vue'

describe('routes', () => {
  test('/top/1 matches an ItemList with property top, and page param of 1', () => {
    const localVue = createLocalVue()
    localVue.use(Router)
    const router = new Router(routerConfig)
    router.push('/top/1')
    const matchedComponent = router.getMatchedComponents()[0]
    expect(matchedComponent).toBe(ItemList)
    const matchedComponentProps = router.currentRoute.matched[0].props.default
    expect(matchedComponentProps.type).toBe('top')
    expect(router.currentRoute.params.page).toBe('1')
  })
})
