<template>
  <div class="demo">
    <el-table :data="[]" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
      <template #empty> 暂无数据的插槽 </template>
      <template #append>
        <h3>append的插槽</h3>
      </template>
    </el-table>
    <br />
    <br />
    <hr>
    <br />
    <br />
    <MyTable height="360" :columns="columns" :data="data" :pageInfo="{ hidden: true }">
      <template #empty>暂无数据的插槽</template>
      <template #append>
        <h3>append的插槽</h3>
      </template>
    </MyTable>
  </div>
</template>

<script lang="ts" setup>
import MyTable from "@/components/MyTable/MyTable.vue";

const data: any = [];

const columns: any = [
  {
    type: "index",
    label: "序号",
    width: "60",
    fixed: true,
  },
  {
    prop: "name",
    label: "姓名",
    width: "120",
  },
  {
    prop: "age",
    label: "年龄",
    width: "80",
  },
  {
    prop: "homne",
    label: "家乡",
    width: "80",
  },
];
</script>
