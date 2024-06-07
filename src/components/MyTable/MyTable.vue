<template>
  <el-table v-bind="mergeAttrs">
    <SelfColumns v-for="column in mergeSlotsColumns" :column="mergeDefaultColumnsFn(column)">
    </SelfColumns>
  </el-table>
</template>

<script setup lang="ts">
import { ref, provide, watch, computed, defineSlots, useAttrs } from "vue";
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
  // 分页的相关信息
  pageInfo: {
    type: Object,
    default: () => { }
  },
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
</script>

<style></style>