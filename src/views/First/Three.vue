<template>
  <div class="demo-date-picker">
    <MyTable :columns="columns" :data="data" @selection-change="fn">
      <template #link:default="scope">
        <a :href="scope.row.link" target="_blank"> 点击跳： {{ scope.row.name }}</a>
      </template>
      <template #address:header>
        表头
      </template>
    </MyTable>
  </div>
</template>

<script lang="ts" setup>
import MyTable from "@/components/MyTable/MyTable.vue";

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
]

const fn = (va: any) => {
  console.log(va);
}
const fnfn = (va: any) => {
  console.log('fnfn', va);
}

const columns: any = [
  {
    type: "selection",
    width: "40",
  },
  {
    type: 'index',
    label: "序号",
    width: "60",
    index: (i: number) => i * 2
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
    width: "180"
  },
  {
    prop: 'address',
    label: "地址",
    width: "180"
  },
]

</script>

<style scoped>
.cell {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}

.cell .text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}

.cell.current .text {
  background: #626aef;
  color: #fff;
}

.cell .holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--el-color-danger);
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
