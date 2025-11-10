import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import MainContentShell from '../MainContentShell.vue'

let cleanup: Array<() => void> = []

afterEach(() => {
  cleanup.forEach((dispose) => dispose())
  cleanup = []
})

describe('MainContentShell', () => {
  it('applies padding and width constraints', () => {
    const wrapper = mount(MainContentShell, {
      attachTo: document.body,
      slots: {
        default: '<div>Mock Content</div>',
      },
    })
    cleanup.push(() => wrapper.unmount())

    const inner = wrapper.get('[data-testid="main-content-wrapper"]')
    const style = getComputedStyle(inner.element as HTMLElement)

    expect(style.paddingTop).toBe('40px')
    expect(style.minWidth).toBe('1200px')
    expect(style.maxWidth).toBe('1600px')
  })
})
