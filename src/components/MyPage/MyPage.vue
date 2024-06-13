<template>
    <el-pagination class="myPage" v-model:current-page="pageInfo.offset" v-model:page-size="pageInfo.limit"
        :total="pageInfo.total" :page-sizes="[20, 50, 100, 200]" layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
defineOptions({ name: 'MyPage' })

const emit = defineEmits(['pageChange']);

const pageInfo = reactive({
    offset: 1,
    limit: 50,
    total: 200,
})

const handleCurrentChange = (val: number) => {
    pageInfo.offset = val
    emit('pageChange', pageInfo)
}
const handleSizeChange = (val: number) => {
    pageInfo.offset = 1
    pageInfo.limit = val
    emit('pageChange', pageInfo)
}

</script>

<style scoped>
.myPage {
    margin-top: 12px;
}
</style>
