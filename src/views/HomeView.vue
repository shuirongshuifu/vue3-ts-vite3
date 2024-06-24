<template>
  <div class="topLevelWrap">
    <el-menu v-bind="attrs">
      <el-sub-menu :index="item.path" v-for="(item, index) in meunArr" :key="index">
        <template #title>
          <el-icon>
            <setting />
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <template v-for="ite in item.children">
          <el-menu-item :index="ite.path">{{ ite.name }}</el-menu-item>
        </template>
      </el-sub-menu>
    </el-menu>
    <div class="mainContent">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { meunAr } from '@/router/index'

console.log('meunAr', meunAr);

const route = useRoute();


const attrs = {
  activeTextColor: "#ffd04b",
  backgroundColor: "#545c64",
  class: "el-menu-vertical-demo",
  defaultActive: route.path,
  textColor: "#fff",
  router: true,
  uniqueOpened: true
}

const meunArr = meunAr

// keyPath类型注解，keyPath是数组，数组中的每一项都是字符串
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

const selectMenu = (index: String, indexPath: String, routeResult: any) => {
  // console.log(index, indexPath, routeResult);
}

</script>

<style scoped>
.topLevelWrap {
  display: flex;
  min-width: 1000px;
}

.mainContent {
  /* flex: 1; */
  width: calc(100% - 200px);
  box-sizing: border-box;
  padding: 12px;
}

.el-menu {
  width: 200px;
  height: 100vh;
}
</style>
