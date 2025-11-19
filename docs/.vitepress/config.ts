export default async () => {
  const { withMermaid } = await import('vitepress-plugin-mermaid')

  return withMermaid({
    base: process.env.DOCS_BASE || '/',
    title: 'Index Dialog Docs',
    description: 'Docs and workflows (Monorepo: VitePress + Slidev)',
    lastUpdated: true,
    themeConfig: {
      nav: [
        { text: 'Plan', link: '/plans/2025-11-11-index-dialog' },
        { text: 'Plan Workflow', link: '/templates/plan-workflow' },
      ],
      sidebar: [
        {
          text: 'Plan',
          items: [{ text: 'Index Dialog', link: '/plans/2025-11-11-index-dialog' }],
        },
        {
          text: 'Templates',
          items: [
            { text: 'Usage', link: '/templates/' },
            { text: 'Process Template (ZH)', link: '/templates/process/template.zh' },
            { text: 'Slidev Template (ZH)', link: '/templates/slidev/template.zh' },
            { text: 'Checklists', link: '/templates/checklists' },
            { text: 'Plan Workflow', link: '/templates/plan-workflow' },
          ],
        },
      ],
      outline: [2, 6],
    },
    markdown: {
      theme: { light: 'vitesse-light', dark: 'vitesse-dark' },
    },
    mermaid: {
      theme: 'default',
    },
  })
}
