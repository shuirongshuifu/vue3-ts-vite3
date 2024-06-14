<template>
    <button @click="send">发请求</button>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import { getTableData, getTotalCount } from "@/api/modules/example";


const send = async () => {
    const params = {
        pageIndex: 1,
        pageSize: 6,
        sortWord: 'id',
        sortOrder: 'DESC',
        searchWord: ''
    }
    await getTableData(params)
    // const res = await getTotalCount({searchWord: ''})
    // console.log('res', res);
    
    
}

</script>