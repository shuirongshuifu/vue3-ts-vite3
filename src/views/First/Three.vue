<template>
  <div class="demo-date-picker">
    <MyTable height="360" :columns="columns" :pageInfo="pageInfo" :data="data" @selection-change="fn">
      <template #link:default="scope">
        <a :href="scope.row.link" target="_blank"> 点击跳跳跳： {{ scope.row.name }}</a>
      </template>
      <template #link:header="scope">
        表头
      </template>
      <template #operation:default="scope">
        <el-button @click="op('查看', scope.row)" bg text type="primary">查看</el-button>
        <el-button @click="op('编辑', scope.row)" bg text type="primary">编辑</el-button>
        <el-button @click="op('禁用', scope.row)" bg text type="primary">禁用</el-button>
      </template>
    </MyTable>
  </div>
</template>

<script lang="ts" setup>
import MyTable from "@/components/MyTable/MyTable.vue";
import { reactive } from "vue";

let pageInfo = reactive({
  offset: 1,
  limit: 50,
  total: 200,
  pageChange: (val: { offset: number, limit: number }) => {
    pageInfo.offset = val.offset
    pageInfo.limit = val.limit
    // getTableData()
  }
})

const fn = (va: any) => {
  console.log(va);
}

const columns: any = [
  {
    type: "selection",
    width: "40",
    fixed: true
  },
  {
    type: 'index',
    label: "序号",
    width: "60",
    index: (i: number) => i * 2,
    fixed: true
  },
  {
    prop: 'name',
    label: "姓名",
    width: "120",
    formatter(row: Record<string, any>) {
      return '😄 ' + row.name + ' 😄'
    }
  },
  {
    prop: 'age',
    label: "年龄",
    width: "80",
  },
  {
    prop: 'link',
    label: "外链",
    width: "210"
  },
  {
    prop: 'date',
    label: "日期",
    width: "210"
  },
  {
    prop: 'address',
    label: "地址",
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

const data = [
  {
    date: '2016-05-01',
    name: '百度',
    age: 66.666,
    link: 'https://www.baidu.com/',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: '知乎',
    age: 77.777,
    link: 'https://www.zhihu.com/',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: '头条',
    age: 88.888,
    link: 'https://www.toutiao.com/',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: '百度',
    age: 66.666,
    link: 'https://www.baidu.com/',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: '知乎',
    age: 77.777,
    link: 'https://www.zhihu.com/',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: '头条',
    age: 88.888,
    link: 'https://www.toutiao.com/',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: '百度',
    age: 66.666,
    link: 'https://www.baidu.com/',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: '知乎',
    age: 77.777,
    link: 'https://www.zhihu.com/',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: '头条',
    age: 88.888,
    link: 'https://www.toutiao.com/',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
