<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'

// Tab 激活项
const activeName = ref('send')

// 搜索表单数据
const searchForm = reactive({
  subject: '', // 主题
  sender: '', // 发件人
  operator: '', // 操作人
  replyTime: [] as string[], // 回复时间
  senderType: '', // 发件类型
  messageType: '', // 消息类型
  needReply: '' // 是否需要回复
})

// 表格数据
interface TableItem {
  id: number
  subject: string
  recipient: string
  messageType: string
  needReply: boolean
  replyStatus?: string
  remainingTime?: string
  operator: string
  senderType: string
  sendTime: string
  isRevoked?: boolean
}

const tableData = ref<TableItem[]>([
  {
    id: 1,
    subject: '订单处理异常反馈通知',
    recipient: 'W12345（W56789）等18人',
    messageType: '问题订单反馈',
    needReply: true,
    replyStatus: '已回复',
    operator: 'Admin',
    senderType: '私信',
    sendTime: '2025-06-25 19:45:12'
  },
  {
    id: 2,
    subject: '发货问题反馈：请及时确认您的收货信息',
    recipient: 'W12345（W56789）等18人',
    messageType: '问题订单反馈',
    needReply: true,
    remainingTime: '剩余2h:50m:45s',
    operator: 'Admin',
    senderType: '私信',
    sendTime: '2025-06-25 19:45:12'
  },
  {
    id: 3,
    subject: '系统维护公告：定期更新与优化',
    recipient: 'W12345（W56789）等18人',
    messageType: '问题订单反馈',
    needReply: false,
    replyStatus: '已回复',
    operator: 'Admin',
    senderType: '私信',
    sendTime: '2025-06-25 19:45:12',
    isRevoked: true
  },
  {
    id: 4,
    subject: '订单跟踪信息更新通知',
    recipient: 'W25（W69）',
    messageType: '问题订单反馈',
    needReply: true,
    replyStatus: '超时未回复',
    operator: 'Admin',
    senderType: '私信',
    sendTime: '2025-06-25 19:45:12'
  }
])

// 分页
const currentPage = ref(1)
const pageSize = ref(100)
const total = ref(4)

// 搜索
const handleSearch = () => {
  ElMessage.success('查询成功')
  console.log('搜索表单:', searchForm)
}

// 新建
const handleCreate = () => {
  ElMessage.info('打开新建对话框')
}

// 操作
const handleResend = (row: TableItem) => {
  ElMessage.success(`再发一次: ${row.subject}`)
}

const handleView = (row: TableItem) => {
  ElMessage.info(`查看详情: ${row.subject}`)
}

const handleRevoke = (row: TableItem) => {
  ElMessage.warning(`撤回消息: ${row.subject}`)
}

// 分页改变
const handlePageChange = (page: number) => {
  currentPage.value = page
  console.log('当前页:', page)
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  console.log('每页条数:', size)
}
</script>

<template>
  <div class="min-h-screen bg-[#edeff3] p-4">
    <!-- 筛选表单 -->
    <div class="bg-white rounded p-4 mb-4">
      <!-- Tab -->
      <el-tabs v-model="activeName" class="mb-4">
        <el-tab-pane label="发信" name="send" />
        <el-tab-pane label="收信" name="receive" />
      </el-tabs>

      <!-- 第一行 -->
      <div class="flex gap-4 mb-4">
        <div class="flex-1 flex items-center gap-3">
          <label class="w-[84px] text-right text-[14px] text-[#303133] shrink-0">主题</label>
          <el-input
            v-model="searchForm.subject"
            placeholder="请输入"
            class="flex-1"
          />
        </div>
        <div class="flex-1 flex items-center gap-3">
          <label class="w-[84px] text-right text-[14px] text-[#303133] shrink-0">发件人</label>
          <el-input
            v-model="searchForm.sender"
            placeholder="输入用户名称、编号"
            class="flex-1"
          />
        </div>
        <div class="flex-1 flex items-center gap-3">
          <label class="w-[84px] text-right text-[14px] text-[#303133] shrink-0">操作人</label>
          <el-select
            v-model="searchForm.operator"
            placeholder="请选择"
            class="flex-1"
          >
            <el-option label="Admin" value="admin" />
            <el-option label="System" value="system" />
          </el-select>
        </div>
        <div class="flex-1 flex items-center gap-3">
          <label class="w-[84px] text-right text-[14px] text-[#303133] shrink-0">回复时间</label>
          <el-date-picker
            v-model="searchForm.replyTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="flex-1"
          />
        </div>
      </div>

      <!-- 第二行 -->
      <div class="flex gap-4">
        <div class="flex-1 flex items-center gap-3">
          <label class="w-[84px] text-right text-[14px] text-[#303133] shrink-0">发件类型</label>
          <el-select
            v-model="searchForm.senderType"
            placeholder="请选择"
            class="flex-1"
          >
            <el-option label="私信" value="private" />
            <el-option label="公告" value="public" />
          </el-select>
        </div>
        <div class="flex-1 flex items-center gap-3">
          <label class="w-[84px] text-right text-[14px] text-[#303133] shrink-0">消息类型</label>
          <el-select
            v-model="searchForm.messageType"
            placeholder="请选择"
            class="flex-1"
          >
            <el-option label="问题订单反馈" value="order_feedback" />
            <el-option label="系统通知" value="system_notice" />
          </el-select>
        </div>
        <div class="flex-1 flex items-center gap-3">
          <label class="text-right text-[14px] text-[#303133] shrink-0">是否需要回复</label>
          <el-select
            v-model="searchForm.needReply"
            placeholder="请选择"
            class="flex-1"
          >
            <el-option label="是" value="true" />
            <el-option label="否" value="false" />
          </el-select>
        </div>
        <div class="flex-1 flex items-center justify-end gap-3">
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="bg-white rounded p-4">
      <el-button type="primary" class="mb-4" @click="handleCreate">新建</el-button>

      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#ebeef5', color: '#303133' }"
      >
        <el-table-column prop="id" label="#" width="60" align="center" />
        <el-table-column prop="subject" label="主题" width="240" />
        <el-table-column prop="recipient" label="收件人" width="180" />
        <el-table-column prop="messageType" label="消息类型" width="140" />
        <el-table-column label="是否需要回复" width="200">
          <template #default="{ row }">
            <div class="flex items-center gap-2">
              <span>{{ row.needReply ? '是' : '否' }}</span>
              <span v-if="row.replyStatus" class="text-[#909399] text-[14px]">{{ row.replyStatus }}</span>
              <div v-if="row.remainingTime" class="flex items-center gap-1">
                <el-icon color="#f56c6c"><Timer /></el-icon>
                <span class="text-[#f56c6c] text-[14px]">{{ row.remainingTime }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="操作人" width="100" align="center" />
        <el-table-column prop="senderType" label="发件类型" width="100" align="center" />
        <el-table-column prop="sendTime" label="发出时间（美国时间）" width="180" />
        <el-table-column label="操作" min-width="200">
          <template #default="{ row }">
            <div class="flex items-center gap-3">
              <el-button
                v-if="!row.isRevoked"
                link
                type="primary"
                size="small"
                @click="handleResend(row)"
              >
                再发一次
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click="handleView(row)"
              >
                查看
              </el-button>
              <el-button
                v-if="row.isRevoked"
                link
                size="small"
                disabled
              >
                已撤回
              </el-button>
              <el-button
                v-else
                link
                type="primary"
                size="small"
                @click="handleRevoke(row)"
              >
                撤回
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="flex justify-end mt-4">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[100, 200, 300, 400]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 使用 UnoCSS，无需额外样式 */
</style>
