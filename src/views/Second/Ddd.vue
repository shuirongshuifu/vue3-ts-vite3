<template>
    <div class="kkk">
        <ul>
            <li v-for="item in 50">{{ item }}</li>
            <div class="aaa"></div>
        </ul>
        <el-button @click="goTop">回到顶部</el-button>
    </div>
</template>

<script setup>
const goTop = () => {
    // 当滚动条是某个dom上的时候，用这个dom的scrollTo方法
    let kkkDom = document.querySelector('.kkk')
    kkkDom?.scrollTo({ top: 0, behavior: 'smooth' });
    /**
     * 当滚动条是window上的时候，使用window的scrollTo方法
     * window.scrollTo({ top: 0, behavior: 'smooth' });
     * */ 
}
</script>

<style>
.kkk {
    height: 600px;
    border: 2px solid #baf;
    /* 这里kkk滚动 */
    overflow-y: auto;
}
</style>