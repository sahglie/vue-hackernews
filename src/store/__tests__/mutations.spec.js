import mutations from '../mutations'

describe('mutations', () => {
  test('setItems sets state.items to items', () => {
    const items = [{id: 1}, {id: 2}] // #A
    const state = { // #B
      items: []
    }
    mutations.setItems(state, { items }) // #C
    expect(state.items).toBe(items) // #D
  })
})
