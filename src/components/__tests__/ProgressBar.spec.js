import { shallow } from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar.vue', () => {
  test('is hidden on initial render', () => {
    const wrapper = shallow(ProgressBar)
    expect(wrapper.classes()).not.toContain('show')
  })

  test('resets to 0% width when start is called', () => {
    const wrapper = shallow(ProgressBar)
    wrapper.vm.finish()
    wrapper.vm.start()
    expect(wrapper.element.style.width).toBe('0%')
  })

  test('sets width using vm.percent', () => {
    const wrapper = shallow(ProgressBar)
    wrapper.setData({ percent: 70 })
    expect(wrapper.element.style.width).toBe('70%')
  })

  test('displays the bar when start is called', () => {
    const wrapper = shallow(ProgressBar)
    expect(wrapper.classes()).not.toContain('show')
    wrapper.vm.start()
    expect(wrapper.classes()).toContain('show')
  })

  test('sets the bar to 100% width when fail is called', () => {
    const wrapper = shallow(ProgressBar)
    wrapper.vm.fail()
    expect(wrapper.classes()).toContain('error')
  })

  test('styles the bar correctly when fail is called', () => {
    const wrapper = shallow(ProgressBar)
    wrapper.vm.fail()
    expect(wrapper.element.style.width).toBe('100%')
  })

  test('sets the bar to 100% width when finish is called', () => {
    const wrapper = shallow(ProgressBar)
    wrapper.vm.start()
    wrapper.vm.finish()
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.element.style.width).toBe('100%')
  })

  test('increases width by 1% every 100ms after start call', () => {
    jest.useFakeTimers()
    const wrapper = shallow(ProgressBar)
    wrapper.vm.start()
    jest.runTimersToTime(100)
    expect(wrapper.element.style.width).toBe('1%')
    jest.runTimersToTime(900)
    expect(wrapper.element.style.width).toBe('10%')
    jest.runTimersToTime(4000)
    expect(wrapper.element.style.width).toBe('50%')
    jest.useRealTimers()
  })

  test('clears _timer when start is called', () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')
    const timerStub = 'timerStub'
    const wrapper = shallow(ProgressBar)
    wrapper.vm._timer = timerStub
    wrapper.vm.finish()
    expect(clearIntervalSpy.mock.calls[0][0]).toBe(timerStub)
    clearIntervalSpy.mockRestore()
  })
})
