<template>
  <div class="demo">
    <MyTable height="360" :columns="columns" :data="data" :pageInfo="{ hidden: true }">
      <template #city:default="scope">
        <span> 666 </span>
      </template>
    </MyTable>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyTable from "@/components/MyTable/MyTable.vue";

const data: any = ref([
  {
    province: "安徽省",
    city: "合肥市",
    area: "瑶海区",
  },
  {
    province: "安徽省",
    city: "合肥市",
    area: "蜀山区",
  },
  {
    province: "安徽省",
    city: "合肥市",
    area: "庐阳区",
  },
]);

let columns: any = [
  {
    type: "index",
    label: "序号",
    width: "60",
  },
  {
    prop: "province",
    label: "省份",
    width: "120",
    children: [
      {
        prop: "city",
        label: "城市",
        width: "120",
      },
      {
        prop: "area",
        label: "区",
        width: "120",
      },
    ],
  },
];
</script>
