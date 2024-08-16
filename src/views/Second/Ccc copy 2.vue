<template>
    <h2>左右按Tab键，快速跳转数字输入框（循环）</h2>
    <h3>右手按上下箭头键，快速打分</h3>
    <h4>默认第一个聚焦</h4>
    <div v-for="item in scoreArr">
        <el-input-number step-strictly ref="inputNumRefs" v-model="item['getScore']" :min="0" :max="item['score']"
            :step="0.5" />
        <br>
        <br>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const scoreArr = ref([
    {
        "qid": 1124663333216773,
        "qNo": 33,
        "score": 2,
        "getScore": 1
    },
    {
        "qid": 1124663333224966,
        "qNo": 34,
        "score": 2,
        "getScore": 2
    },
    {
        "qid": 1124663333233158,
        "qNo": 35,
        "score": 2,
        "getScore": 2
    },
    {
        "qid": 1124663333241350,
        "qNo": 36,
        "score": 2,
        "getScore": 1.5
    },
    {
        "qid": 1124663333249542,
        "qNo": 37,
        "score": 2,
        "getScore": 2
    }
])

// 数组收集多个示例引用
const inputNumRefs = ref([])

// 第一个获取焦点的索引
let starIndex = 0

// 调用数字输入框实例去获取焦点
const setFirstFocus = (starIndex: number) => {
    inputNumRefs.value[starIndex].focus()
}

// 监听键盘事件
const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
        event.preventDefault(); // 阻止默认的Tab行为
        starIndex = starIndex + 1 // 索引加一，往下走
        // 若是跳转到最后一项，则回到第一项
        if (starIndex == scoreArr.value.length) starIndex = 0
        // 再执行，去获取焦点
        setFirstFocus(starIndex)
    }
};

// 在组件挂载时添加事件监听
onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    // 默认让第一个获取焦点
    setFirstFocus(0)
});

// 组件卸载移除事件监听
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});
</script>