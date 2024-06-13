<template>
  <div class="tablePageWrap">
    <el-table v-bind="mergeAttrs">
      <SelfColumns v-for="(column) in mergeSlotsColumns" :column="mergeDefaultColumnsFn(column as object)">
      </SelfColumns>
    </el-table>
    <el-pagination class="myPage" v-model:current-page="pageInfo.offset" v-model:page-size="pageInfo.limit"
      :total="pageInfo.total" :page-sizes="[20, 50, 100, 200]" layout="total, sizes, prev, pager, next, jumper"
      :background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, provide, watch, computed, defineSlots, useAttrs } from "vue";
import { cloneDeep } from "lodash";
import SelfColumns from "./components/SelfColumns";

defineOptions({
  name: 'MyTable',
})

const props = defineProps({
  // 表格列相关信息
  columns: {
    type: Array,
    default: () => []
  },
  // 分页相关配置
  pageInfo: {
    type: Object,
    default: () => {
      return {
        offset: 1,
        limit: 50,
        total: 200,
        pageChange: () => { }
      }
    }
  }
});

// 合并插槽
const slots = defineSlots()
const mergeSlotsColumns = computed(() => {
  const cColumns = cloneDeep(props.columns)
  cColumns.forEach((column) => {
    for (const key in slots) {
      // @ts-ignore
      if (key.includes(column.prop)) {
        // @ts-ignore
        column['defaultSlot'] = slots[key]
        // @ts-ignore
        column = { ...defaultColumn, ...column }
      }
    }
  })
  return cColumns
})

// 合并默认列配置
const defaultColumn = {
  align: 'center',
  showOverflowTooltip: true,
  sortable: true,
}
const mergeDefaultColumnsFn = (column: object) => {
  return { ...defaultColumn, ...(column as object) }
}

// 合并el-table的默认配置
const attrs = useAttrs();
const mergeAttrs = computed(() => {
  const defaultAttrs = {
    border: true,
  }
  return { ...defaultAttrs, ...attrs }
})

// 分页抛出去
const handleCurrentChange = (val: number) => {
  const pageInfo = {
    offset: val,
    limit: props.pageInfo.limit
  }
  props.pageInfo.pageChange(pageInfo)
}
const handleSizeChange = (val: number) => {
  const pageInfo = {
    offset: 1,
    limit: val
  }
  props.pageInfo.pageChange(pageInfo)
}

</script>

<style scoped>
.tablePageWrap {
  position: relative;
}
.myPage {
  margin-top: 8px;
}
</style>