<template>
  <div class="tablePageWrap">
    <el-table v-bind="mergeAttrs">
      <SelfColumns v-for="column in mergeSlotsColumns" :column="column" />
      <template v-slot:[slot] v-for="(_, slot) in tableSlots">
        <slot :name="slot"></slot>
      </template>
    </el-table>
    <el-pagination
      v-if="!pageInfo.hidden"
      class="myPage"
      v-model:current-page="pageInfo.offset"
      v-model:page-size="pageInfo.limit"
      :total="pageInfo.total"
      :page-sizes="[10, 20, 50, 100, 200]"
      layout="total, sizes, prev, pager, next, jumper"
      :background="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, provide, watch, computed, defineSlots, useAttrs } from "vue";
import { cloneDeep } from "lodash";
import SelfColumns from "./components/SelfColumns";

defineOptions({
  name: "MyTable",
});

// 定义列的接口
interface TableColumn {
  prop: string;
  defaultSlot?: any; // 普通插槽
  headerSlot?: any; // 头部插槽
  [key: string]: any; // 允许任意其他属性
}

const props = defineProps({
  // 表格列相关信息
  columns: {
    type: Array as () => TableColumn[], // 显式指定数组类型为 TableColumn[]
    default: () => [],
  },
  // 分页相关配置
  pageInfo: {
    type: Object,
    default: () => {
      return {
        offset: 1,
        limit: 50,
        total: 200,
        pageChange: () => {},
      };
    },
  },
});

// 合并插槽
const slots = defineSlots();

const tableSlots = ref<Record<string, any>>({});

const mergeSlotsColumns = computed(() => {
  const cColumns = cloneDeep(props.columns);
  cColumns.forEach((column) => {
    for (const key in slots) {
      // 表格列的插槽
      if (key.includes(column.prop)) {
        if (key.includes("default")) {
          column["defaultSlot"] = slots[key];
        }
        if (key.includes("header")) {
          column["headerSlot"] = slots[key];
        }
        Object.assign(column, defaultColumn);
      }
      // 表格表体的插槽
      else {
        tableSlots.value[key] = slots[key];
      }
    }
  });
  return cColumns;
});

// 合并默认列配置
const defaultColumn = {
  align: "center",
  showOverflowTooltip: true,
  sortable: false,
};

// 合并el-table的默认配置
const attrs = useAttrs();
const mergeAttrs = computed(() => {
  const defaultAttrs = {
    border: true,
  };
  return { ...defaultAttrs, ...attrs };
});

// 分页抛出去
const handleCurrentChange = (val: number) => {
  const pageInfo = {
    offset: val,
    limit: props.pageInfo.limit,
  };
  props.pageInfo.pageChange(pageInfo);
};
const handleSizeChange = (val: number) => {
  const pageInfo = {
    offset: 1,
    limit: val,
  };
  props.pageInfo.pageChange(pageInfo);
};
</script>

<style scoped>
.tablePageWrap {
  position: relative;
}
.myPage {
  margin-top: 8px;
}
</style>