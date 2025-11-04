import { describe, expect, it } from 'vitest'
import App from './App.vue'

describe('App', () => {
  it('exports component definition', () => {
    expect(App).toBeTruthy()
  })
})