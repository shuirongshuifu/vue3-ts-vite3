<template>
    <div style="width:600px;margin-top:16px;margin-left:16px">
        <baidu-calendar @change="change" :date="date" :range="range" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
//date改变触发事件
const change = (info: any) => {
    console.log('info', info)
}
const date = ref("2021-1-27") //设置日期，若不设置，则默认为今天
const range = [2015, 2035] //设置年份范围 默认[2010,2030]
</script>

<style></style>