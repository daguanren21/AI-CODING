// ESLint Flat config using @icebreakers/eslint-config
import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker(
  {},
  { ignores: ['**/node_modules/**','**/dist/**','docs/.vitepress/.temp/**','docs/.vitepress/cache/**'] },
  {
    files: ['docs/.vitepress/**/*.{ts,js,mts,cts}','docs/.vitepress/theme/**/*.{ts,js}'],
    rules: { 'no-console': 'off' }
  },
  {
    files: ['docs/.vitepress/config.ts'],
    rules: { 'node/prefer-global/process': 'off' }
  }
)
