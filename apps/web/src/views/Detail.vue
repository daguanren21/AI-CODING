<script setup lang='ts'>
import { ref } from 'vue'
import { QuestionFilled, Calendar } from '@element-plus/icons-vue'

// 基础信息表单数据
const basicForm = ref({
  warehouse: '仓库-W960',
  receiptNumber: '123456789',
  receiptIdentifier: 'Abcd',
  containerNumber: '',
  shipmentDate: '2025-08-12',
  expectedArrivalDate: '2025-08-12',
  remarks: ''
})

// 发货人民币费用数据
const cnyExpenses = ref([
  {
    name: '',
    invoiceAmount: '',
    taxRefundRate: '',
    attachment: null
  }
])

const totalInvoiceFee = ref('--')
const exchangeRate = ref('0.14')

// 头程费用数据 (空数据)
const firstLegExpenses = ref([])
const totalUSDInvoiceFee = ref('--')

// 入库单产品明细数据
const productDetails = ref([
  {
    productId: 'W960AAB',
    productName: 'Simmons mattress soft bed',
    sku: 'W42915855',
    volume: '0.0418 m³',
    weight: '5.90 kg',
    supplier: 'S202502270002',
    purchaseOrder: 'C202502270002',
    taxRefundRate: '10',
    quantity: 40,
    unitPrice: '$100.00',
    totalAmount: '$100.00',
    fobCost: '$100.00',
    fobPrice: '$100.00',
    warehouseCost: '￥100.00',
    expectedQty: 50,
    actualQty: 40,
    goodQty: 40,
    qtyDiff: '到货数量差（-1）\n良品数量差（0）',
    rowspan: 3,
    showProduct: true
  },
  {
    productId: 'W960AAB',
    productName: 'Simmons mattress soft bed',
    sku: 'W42915855',
    volume: '0.0418 m³',
    weight: '5.90 kg',
    supplier: 'S202502270002',
    purchaseOrder: 'C202502270002',
    taxRefundRate: '10',
    quantity: 40,
    unitPrice: '$100.00',
    totalAmount: '$100.00',
    fobCost: '$100.00',
    fobPrice: '$100.00',
    warehouseCost: '￥100.00',
    expectedQty: 50,
    actualQty: 40,
    goodQty: 40,
    qtyDiff: '到货数量差（-1）\n良品数量差（0）',
    rowspan: 0,
    showProduct: false
  },
  {
    productId: 'W960AAB',
    productName: 'Simmons mattress soft bed',
    sku: 'W42915855',
    volume: '0.0418 m³',
    weight: '5.90 kg',
    supplier: 'S202502270002',
    purchaseOrder: 'C202502270002',
    taxRefundRate: '10',
    quantity: 40,
    unitPrice: '$100.00',
    totalAmount: '$100.00',
    fobCost: '$100.00',
    fobPrice: '$100.00',
    warehouseCost: '￥100.00',
    expectedQty: 50,
    actualQty: 40,
    goodQty: 40,
    qtyDiff: '到货数量差（-1）\n良品数量差（0）',
    rowspan: 0,
    showProduct: false
  }
])

// 数量差分摊费用数据
const qtyDiffExpenses = ref([
  {
    productId: 'W960AAB',
    productName: 'Simmons mattress soft bed',
    qtyDiff: '到货数量差（-1）',
    expenseName: '入库清点盘亏费用',
    totalAmount: '1.00'
  },
  {
    productId: 'W960AAB',
    productName: 'Simmons mattress soft bed',
    qtyDiff: '良品数量差（-1）',
    expenseName: '海运货损盘亏费用',
    totalAmount: '1.00'
  }
])

// 产品明细表格行合并方法
const productSpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
  // 需要合并的列：
  // 0: 产品ID/产品名
  // 1: SKU
  // 2: 产品体积&重量
  // 12: 预计入库数量
  // 15: 数量差
  // 16: 操作
  const mergeColumns = [0, 1, 2, 12, 15, 16]

  if (mergeColumns.includes(columnIndex)) {
    if (row.rowspan > 0) {
      return {
        rowspan: row.rowspan,
        colspan: 1
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0
      }
    }
  }

  // 其他列不合并
  return {
    rowspan: 1,
    colspan: 1
  }
}


</script>

<template>
  <div class="min-h-screen bg-page p-16px">
    <!-- 基础信息模块 -->
    <div class="bg-white rounded-4px p-20px flex flex-col gap-20px">
      <!-- 状态标题 -->
      <p class="text-18px font-bold leading-26px text-[#303133]">
        待收货
      </p>

      <!-- 基础信息标题 -->
      <div class="flex gap-8px items-center">
        <div class="w-4px h-16px bg-[#2f8df0]" />
        <p class="text-16px font-bold leading-24px text-[#303133]">
          基础信息
        </p>
      </div>

      <!-- 表单区域 -->
      <div class="flex flex-col gap-24px w-full">
        <!-- 第一行 -->
        <div class="flex gap-24px items-end w-full">
          <!-- 入库仓库 -->
          <div class="flex-1 flex flex-col gap-8px">
            <div class="flex gap-4px items-center text-14px leading-22px">
              <span class="text-[#f56c6c]">*</span>
              <span class="text-[#303133]">入库仓库</span>
            </div>
            <el-select
              v-model="basicForm.warehouse"
              disabled
              class="w-full"
            >
              <el-option label="仓库-W960" value="仓库-W960" />
            </el-select>
          </div>

          <!-- 入库单号 -->
          <div class="flex-1 flex flex-col gap-8px">
            <div class="flex gap-4px items-center text-14px leading-22px">
              <span class="text-[#f56c6c]">*</span>
              <span class="text-[#303133]">入库单号</span>
            </div>
            <el-select
              v-model="basicForm.receiptNumber"
              class="w-full"
            >
              <el-option label="123456789" value="123456789" />
            </el-select>
          </div>

          <!-- 入库标识 -->
          <div class="flex-1 flex flex-col gap-8px">
            <div class="flex gap-4px items-center text-14px leading-22px w-120px">
              <span class="text-[#f56c6c]">*</span>
              <span class="text-[#303133]">入库标识</span>
              <el-icon :size="14" class="text-[#909399]">
                <QuestionFilled />
              </el-icon>
            </div>
            <el-input
              v-model="basicForm.receiptIdentifier"
              class="w-full"
            >
              <template #suffix>
                <span class="text-12px text-[#a8abb2]">1 / 10</span>
              </template>
            </el-input>
          </div>

          <!-- 集装箱号 -->
          <div class="flex-1 flex flex-col gap-8px">
            <div class="flex gap-4px items-center text-14px leading-22px">
              <span class="text-[#303133]">集装箱号</span>
            </div>
            <el-input
              v-model="basicForm.containerNumber"
              placeholder="请输入"
              class="w-full"
            />
          </div>
        </div>

        <!-- 第二行 -->
        <div class="flex gap-24px items-end w-full">
          <!-- 发货日期 -->
          <div class="flex-1 flex flex-col gap-8px">
            <div class="flex gap-4px items-center text-14px leading-22px">
              <span class="text-[#f56c6c]">*</span>
              <span class="text-[#303133]">发货日期</span>
            </div>
            <el-date-picker
              v-model="basicForm.shipmentDate"
              type="date"
              :prefix-icon="Calendar"
              class="w-full"
            />
          </div>

          <!-- 预计到港日期 -->
          <div class="flex-1 flex flex-col gap-8px">
            <div class="flex gap-4px items-center text-14px leading-22px">
              <span class="text-[#303133]">预计到港日期</span>
            </div>
            <el-date-picker
              v-model="basicForm.expectedArrivalDate"
              type="date"
              disabled
              :prefix-icon="Calendar"
              class="w-full"
            />
          </div>

          <!-- 占位列 -->
          <div class="flex-1 opacity-0">
            <div class="h-32px" />
          </div>

          <!-- 占位列 -->
          <div class="flex-1 opacity-0">
            <div class="h-32px" />
          </div>
        </div>

        <!-- 备注 -->
        <div class="flex flex-col gap-8px w-full">
          <div class="flex gap-4px items-center text-14px leading-22px">
            <span class="text-[#303133]">备注</span>
          </div>
          <el-input
            v-model="basicForm.remarks"
            type="textarea"
            placeholder="请输入"
            :rows="3"
            class="w-full"
          />
        </div>
      </div>
    </div>

    <!-- 发货人民币费用模块 -->
    <div class="bg-white rounded-4px p-20px flex flex-col gap-20px mt-16px">
      <!-- 标题 -->
      <div class="flex gap-8px items-center">
        <div class="w-4px h-16px bg-[#2f8df0]" />
        <p class="text-16px font-bold leading-24px text-[#303133]">
          发货人民币费用
        </p>
        <el-icon :size="16" class="text-[#606266]">
          <QuestionFilled />
        </el-icon>
      </div>

      <!-- 表格 -->
      <div class="flex flex-col gap-12px w-full">
        <el-table :data="cnyExpenses" border style="width: 100%">
          <el-table-column prop="name" label="费用名" align="center">
            <template #default="scope">
              <el-input
                v-model="scope.row.name"
                placeholder="请输入"
                size="small"
              />
            </template>
          </el-table-column>

          <el-table-column prop="invoiceAmount" label="发票金额（CNY）">
            <template #default="scope">
              <el-input
                v-model="scope.row.invoiceAmount"
                placeholder="请输入"
                size="small"
              />
            </template>
          </el-table-column>

          <el-table-column prop="taxRefundRate" label="退税率">
            <template #default="scope">
              <el-input
                v-model="scope.row.taxRefundRate"
                placeholder="请输入"
                size="small"
              >
                <template #append>%</template>
              </el-input>
            </template>
          </el-table-column>

          <el-table-column label="发票附件" align="center">
            <template #default>
              <el-button type="primary" link size="small">上传附件</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template #default>
              <el-button type="primary" link size="small">添加费用</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 底部统计 -->
        <div class="bg-[#ecf5ff] rounded-4px p-12px flex gap-24px items-center">
          <div class="flex gap-8px items-center">
            <span class="text-14px leading-22px text-[#606266]">总发票费用（CNY）：</span>
            <span class="text-14px leading-22px text-[#303133]">{{ totalInvoiceFee }}</span>
          </div>
          <div class="w-0 h-18px border-l border-[#909399]" />
          <div class="flex gap-8px items-center">
            <span class="text-14px leading-22px text-[#606266]">汇率（人民币兑美元）：</span>
            <span class="text-14px leading-22px text-[#303133]">{{ exchangeRate }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 头程费用模块 -->
    <div class="bg-white rounded-4px p-20px flex flex-col gap-20px mt-16px">
      <!-- 标题 -->
      <div class="flex gap-8px items-center">
        <div class="w-4px h-16px bg-[#2f8df0]" />
        <p class="text-16px font-bold leading-24px text-[#303133]">
          头程费用
        </p>
      </div>

      <!-- 表格 -->
      <div class="flex flex-col gap-12px w-full">
        <el-table :data="firstLegExpenses" border style="width: 100%">
          <el-table-column prop="name" label="费用名" align="center">
            <template #default="scope">
              <el-input
                v-model="scope.row.name"
                placeholder="请输入"
                size="small"
              />
            </template>
          </el-table-column>

          <el-table-column prop="invoiceAmount" label="发票金额（CNY）">
            <template #default="scope">
              <el-input
                v-model="scope.row.invoiceAmount"
                placeholder="请输入"
                size="small"
              />
            </template>
          </el-table-column>

          <el-table-column prop="taxRefundRate" label="退税率">
            <template #default="scope">
              <el-input
                v-model="scope.row.taxRefundRate"
                placeholder="请输入"
                size="small"
              >
                <template #append>%</template>
              </el-input>
            </template>
          </el-table-column>

          <el-table-column label="发票附件" align="center">
            <template #default>
              <el-button type="primary" link size="small">上传附件</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template #default>
              <el-button type="primary" link size="small">添加费用</el-button>
            </template>
          </el-table-column>

          <template #empty>
            <span class="text-14px text-[#909399]">暂无数据</span>
          </template>
        </el-table>

        <!-- 底部统计 -->
        <div class="bg-[#ecf5ff] rounded-4px p-12px flex gap-24px items-center">
          <div class="flex gap-8px items-center">
            <span class="text-14px leading-22px text-[#606266]">总发票费用（USD）：</span>
            <span class="text-14px leading-22px text-[#303133]">{{ totalUSDInvoiceFee }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 入库单产品明细模块 -->
    <div class="bg-white rounded-4px p-20px flex flex-col gap-20px mt-16px">
      <!-- 标题 -->
      <div class="flex gap-8px items-center">
        <div class="w-4px h-16px bg-[#2f8df0]" />
        <p class="text-16px font-bold leading-24px text-[#303133]">
          入库单产品明细
        </p>
      </div>

      <!-- 警告提示 -->
      <div class="bg-[#fef0f0] rounded-4px p-16px">
        <div class="text-14px leading-22px text-[#c45656]">
          <p class="mb-8px">ERP入库单与B2B入库单存在以下差异：</p>
          <ul class="list-disc pl-20px mb-8px">
            <li>【W960AAB/Simmons mattress soft bed】W42915855在B2B入库单的预计入库数量为<strong>59</strong></li>
            <li>【W960ABC/soft bed】W42915855不存在B2B入库单内，请评估是否移除此产品</li>
            <li>【W960BBC/soft bed】W42915855未在ERP入库单录入成本。系统已自动为您匹配采购单，请核对</li>
          </ul>
          <p>请将ERP入库单信息与B2B修改为一致，<strong>否则收货后将会产生数量差分摊费用。</strong></p>
        </div>
      </div>

      <!-- 表格 -->
      <div class="flex flex-col gap-16px w-full overflow-x-auto">
        <el-table :data="productDetails" border style="width: 100%" size="small" :span-method="productSpanMethod">
          <el-table-column label="产品ID/产品名" width="150" fixed>
            <template #default="scope">
              <div class="text-14px">
                <div>{{ scope.row.productId }}</div>
                <div>{{ scope.row.productName }}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="SKU (Item Code)" prop="sku" width="120" align="center" />

          <el-table-column label="产品体积&重量" width="100">
            <template #default="scope">
              <div class="text-14px">
                <div>{{ scope.row.volume }}</div>
                <div>{{ scope.row.weight }}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="供应商/工厂" width="120">
            <template #default="scope">
              <el-select v-model="scope.row.supplier" size="small" disabled>
                <el-option :label="scope.row.supplier" :value="scope.row.supplier" />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="采购单号" width="120">
            <template #default="scope">
              <el-select v-model="scope.row.purchaseOrder" size="small" disabled>
                <el-option :label="scope.row.purchaseOrder" :value="scope.row.purchaseOrder" />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="产品退税率" width="100">
            <template #default="scope">
              <el-input v-model="scope.row.taxRefundRate" size="small" disabled>
                <template #append>%</template>
              </el-input>
            </template>
          </el-table-column>

          <el-table-column label="本单发货数量" width="120">
            <template #default="scope">
              <el-input v-model="scope.row.quantity" size="small" disabled />
            </template>
          </el-table-column>

          <el-table-column label="含税采购单价" prop="unitPrice" width="120" align="right" />
          <el-table-column label="采购合计金额" prop="totalAmount" width="120" align="right" />
          <el-table-column label="FOB成本（USD）" prop="fobCost" width="130" align="right" />
          <el-table-column label="FOB价格（USD）" prop="fobPrice" width="130" align="right" />
          <el-table-column label="单个到库成本（USD）" prop="warehouseCost" width="150" align="right" />

          <el-table-column label="预计入库数量" prop="expectedQty" width="120" align="center" fixed="right" />

          <el-table-column label="实际到货数量" width="120" align="center" fixed="right">
            <template #default="scope">
              <el-input v-model="scope.row.actualQty" size="small" />
            </template>
          </el-table-column>

          <el-table-column label="到货良品数量" width="120" align="center" fixed="right">
            <template #default="scope">
              <el-input v-model="scope.row.goodQty" size="small" />
            </template>
          </el-table-column>

          <el-table-column label="数量差" width="150" fixed="right">
            <template #default="scope">
              <div class="text-14px whitespace-pre-line">{{ scope.row.qtyDiff }}</div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="80" align="center" fixed="right">
            <template #default>
              <el-button type="danger" link size="small">移除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 底部合计 -->
        <div class="bg-[#fafafa] rounded-4px flex items-center text-14px text-[#303133] h-68px">
          <!-- 合计文字 -->
          <div class="w-150px px-12px py-12px font-bold">合计</div>
          <!-- SKU - 空 -->
          <div class="w-120px" />
          <!-- 产品体积&重量 -->
          <div class="w-100px px-12px py-12px">
            <div>0.0418 m³</div>
            <div>5.90 kg</div>
          </div>
          <!-- 供应商/工厂 到 本单发货数量 - 显示 -- -->
          <div class="w-120px px-12px py-12px">--</div>
          <div class="w-120px" />
          <div class="w-100px" />
          <div class="w-120px" />
          <!-- 含税采购单价 -->
          <div class="w-120px px-12px py-12px text-right">$300.00</div>
          <!-- 采购合计金额 -->
          <div class="w-120px px-12px py-12px text-right">$300.00</div>
          <!-- FOB成本（USD） -->
          <div class="w-130px px-12px py-12px text-right">$300.00</div>
          <!-- FOB价格（USD） -->
          <div class="w-130px px-12px py-12px text-right">$300.00</div>
          <!-- 单个到库成本（USD） - 空 -->
          <div class="w-150px" />
          <!-- 预计入库数量 -->
          <div class="w-120px px-12px py-12px text-center">50</div>
          <!-- 实际到货数量 -->
          <div class="w-120px px-12px py-12px text-center">40</div>
          <!-- 到货良品数量 -->
          <div class="w-120px px-12px py-12px text-center">40</div>
          <!-- 数量差 -->
          <div class="w-150px px-12px py-12px">--</div>
          <!-- 操作 -->
          <div class="w-80px px-12px py-12px text-center">--</div>
        </div>
      </div>
    </div>

    <!-- 数量差分摊费用模块 -->
    <div class="bg-white rounded-4px p-20px flex flex-col gap-20px mt-16px">
      <!-- 标题 -->
      <div class="flex gap-8px items-center">
        <div class="w-4px h-16px bg-[#2f8df0]" />
        <div class="flex items-baseline gap-4px">
          <p class="text-16px font-bold leading-24px text-[#303133]">
            数量差分摊费用
          </p>
          <span class="text-14px leading-22px text-[#606266] font-normal">
            （入库单数量差异部分分摊对应的费用；若实际不存在到货数量差请前往编辑预计入库数量）
          </span>
        </div>
      </div>

      <!-- 警告提示 -->
      <div class="bg-[#fef0f0] rounded-4px p-16px">
        <p class="text-14px leading-22px text-[#c45656]">
          {产品ID}收货盘盈，实际收货数量大于发货数量，请您在收货后尽快补充关联采购单。未补充前，盘盈库存的成本仅为分摊的头程费用。
        </p>
      </div>

      <!-- 表格 -->
      <div class="flex flex-col gap-16px w-full">
        <el-table :data="qtyDiffExpenses" border style="width: 100%">
          <el-table-column label="产品ID/产品名" width="300">
            <template #default="scope">
              <div class="text-14px">
                <div>{{ scope.row.productId }}</div>
                <div>{{ scope.row.productName }}</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="数量差" prop="qtyDiff" align="center" />
          <el-table-column label="费用名称" prop="expenseName" />
          <el-table-column label="费用总金额（USD）" prop="totalAmount" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Element Plus 样式自定义 */
:deep(.el-select) {
  width: 100%;
}

:deep(.el-input__wrapper) {
  border-radius: 4px;
}

:deep(.el-select__wrapper) {
  border-radius: 4px;
}

/* 表头背景色 */
:deep(.el-table__header-wrapper) {
  background-color: #f5f7fa;
}

:deep(.el-table th.el-table__cell) {
  background-color: #f5f7fa !important;
  color: #606266;
  font-weight: 500;
}

:deep(.el-table--border .el-table__cell) {
  border-color: #ebeef5;
}
</style>

