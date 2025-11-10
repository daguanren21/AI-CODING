import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { server } from '../src/mocks/server'

vi.mock('echarts', () => {
  const createInstance = () => ({
    setOption: vi.fn(),
    resize: vi.fn(),
    dispose: vi.fn(),
  })
  return {
    init: vi.fn(() => createInstance()),
  }
})

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
