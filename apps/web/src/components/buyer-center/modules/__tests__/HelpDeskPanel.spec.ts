import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import HelpDeskPanel from '../HelpDeskPanel.vue'
import type { IPlatformHelpDesk } from '../../../../types/buyerCenter'
import { IsRead, IsReply } from '../../../../types/enum'

const items: IPlatformHelpDesk[] = [
  {
    is_reply: IsReply.REPLIED,
    is_read: IsRead.UNREAD,
    title: '示例任务',
    msg_type_show: '票据',
    count_down_seconds: 600,
    create_time: '2025-11-09 10:00',
    jump_url: '#',
    msg_id: '1',
  },
]

describe('HelpDeskPanel', () => {
  it('renders help desk items', () => {
    render(HelpDeskPanel, { props: { items } })
    expect(screen.getByText('示例任务')).toBeInTheDocument()
  })
})
