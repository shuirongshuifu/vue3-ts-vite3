<template>
  <div class="demo-date-picker">
    <h2>展开行</h2>
    <MyTable height="240" :columns="columns" :data="data" :pageInfo="{ hidden: true }">
      <!-- 展开行的内容 -->
      <template #expand:default="scope">
        <h3 style="margin-left: 12px;">{{ scope.row.name }}</h3>
      </template>
    </MyTable>
    <h2>树形数据与懒加载</h2>
    <!-- default-expand-all  -->
    <MyTable height="240" row-key="id" :columns="columns2" :data="data2" :pageInfo="{ hidden: true }" />
  </div>
</template>

<script lang="ts" setup>
import MyTable from "@/components/MyTable/MyTable.vue";

const columns: any = [
  {
    type: 'index',
    label: "序号",
    width: "60",
    fixed: true
  },
  {
    label: "展开",
    type: 'expand',
    width: "60",
    prop: 'expand',
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
    width: "210",
    renderHeader: (data: any) => {
      return 'renderHeader函数的方式'
    }
  },
]

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

const columns2: any = [
  {
    prop: 'book',
    label: "书名",
    width: "120",
  },
  {
    prop: 'info',
    label: "信息",
    width: "160",
  },
  {
    prop: 'comment',
    label: "评价",
    width: "210"
  },
]

const data2: any = [
  {
    id: 1,
    book: '水浒传',
    info: '四大名著之一',
    comment: '少不读水浒',
    children: [
      {
        id: 11,
        book: '宋江',
        info: '001号梁山好汉',
        comment: '心在朝廷',
      },
      {
        id: 12,
        book: '吴用',
        info: '002号梁山好汉',
        comment: '宋江的左膀',
      },
      {
        id: 13,
        book: '李逵',
        info: '00x号梁山好汉',
        comment: '宋江的右臂',
      },
    ]
  },
  {
    id: 2,
    book: '三国演义',
    info: '四大名著之一',
    comment: '老不读三国',
    children: [
      {
        id: 21,
        book: '刘备',
        info: '刘皇叔',
        comment: 'liubei',
      },
      {
        id: 22,
        book: '关羽',
        info: '关公',
        comment: 'guanyu',
      },
      {
        id: 23,
        book: '张飞',
        info: '大汉张飞',
        comment: 'zhangfei',
      },
    ]
  },
]

</script>
