<template>
  <div class="demo-date-picker">
    <MyTable :row-key="getRowKey" height="360" :columns="columns" :pageInfo="pageInfo" :data="data"
      @sort-change="sortChange">
      <template #operation:default="scope">
        <el-button @click="op('查看', scope.row)" bg text type="primary">查看</el-button>
        <el-button @click="op('编辑', scope.row)" bg text type="primary">编辑</el-button>
        <el-button @click="op('禁用', scope.row)" bg text type="primary">禁用</el-button>
      </template>
    </MyTable>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import MyTable from "@/components/MyTable/MyTable.vue";
import { getTableData, getTotalCount } from "@/api/modules/example";

onMounted(() => {
  getData()
})

let pageInfo = reactive({
  offset: 1,
  limit: 10,
  total: 0,
  sortWord: 'id',
  sortOrder: 'DESC',
  pageChange: (val: { offset: number, limit: number }) => {
    pageInfo.offset = val.offset
    pageInfo.limit = val.limit
    getData()
  }
})

const data = ref([])

const getData = async () => {
  const params = {
    pageIndex: pageInfo.offset,
    pageSize: pageInfo.limit,
    sortWord: pageInfo.sortWord,
    sortOrder: pageInfo.sortOrder,
    searchWord: ''
  }
  const res = await getTableData(params)
  data.value = res?.data
  const res2 = await getTotalCount({ searchWord: '' })
  pageInfo.total = res2?.data
}

const sortChange = (column: { order: string, prop: string }) => {
  const { order, prop } = column;
  pageInfo.sortWord = prop
  pageInfo.sortOrder = order === "ascending" ? 'asc' : 'desc'
  getData()
}

const getRowKey = (row: { id: number }) => {
  return row.id;
}

const columns: any = [
  {
    type: "selection",
    width: "40",
    fixed: true,
    reserveSelection: true
  },
  {
    type: 'index',
    label: "序号",
    width: "60",
    index: (index: number) => {
      let nowPage = pageInfo.offset; //当前第几页，根据组件取值即可
      let nowLimit = pageInfo.limit; //当前每页显示几条，根据组件取值即可
      return index + 1 + (nowPage - 1) * nowLimit; // 这里可以理解成一个公式
    },
    fixed: true
  },
  {
    prop: 'name',
    label: "姓名",
    width: "150",
    formatter(row: Record<string, any>) {
      return '😄 ' + row.name + ' 😄'
    },
    sortable: true,
  },
  {
    prop: 'age',
    label: "年龄",
    width: "80",
    sortable: true,
  },
  {
    prop: 'home',
    label: "家乡",
    width: "210",
  },
  {
    prop: 'remark',
    label: "备注",
    width: "210",
  },
  {
    label: "操作列",
    prop: 'operation',
    width: "300",
    fixed: 'right'
  },
]

const op = (val: string, row: object) => {
  console.log(val, row);
}
</script>

<style scoped></style>
