<template>
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @select="selectFn" @select-all="selectAllFn">
        <el-table-column type="selection" width="55" />
        <el-table-column label="Date" width="120">
            <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="name" label="Name" width="120" />
        <el-table-column property="address" label="Address" show-overflow-tooltip />
    </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'

interface User {
    id: number
    date: string
    name: string
    address: string
}

const tableData: User[] = ref([
    {
        id: 1,
        date: '2016-05-01',
        name: '111',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 2,
        date: '2016-05-02',
        name: '222',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 3,
        date: '2016-05-03',
        name: '333',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 4,
        date: '2016-05-04',
        name: '444',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 5,
        date: '2016-05-05',
        name: '555',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 6,
        date: '2016-05-06',
        name: '666',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 7,
        date: '2016-05-07',
        name: '777',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 8,
        date: '2016-05-08',
        name: '888',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 9,
        date: '2016-05-09',
        name: '999',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 10,
        date: '2016-05-10',
        name: '100',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 11,
        date: '2016-05-11',
        name: '111',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 12,
        date: '2016-05-12',
        name: '122',
        address: 'No. 189, Grove St, Los Angeles',
    },
])

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])

/**
 * 需求：按住shift能够快速多勾选
 *      还要保留原来勾选的
 * */
const clickInfo = reactive({
    startRowIndex: -1,
    endRowIndex: -1,
    isShiftPressed: false
})


const selectAllFn = (selection) => {
    multipleSelection.value = selection
}

const selectFn = (selection, row) => {
    multipleSelection.value = selection
    // 获取当前点击的是第几行
    let i = tableData.value.findIndex((item) => item.id == row.id)
    // Shift按下逻辑
    if (clickInfo.isShiftPressed) {
        if (clickInfo.startRowIndex === -1) {
            clickInfo.startRowIndex = i
        } else {
            clickInfo.endRowIndex = i
            selectTable(clickInfo.startRowIndex, clickInfo.endRowIndex)
        }
    }
}

const selectTable = (startRowIndex, endRowIndex) => {
    const startIndex = Math.min(startRowIndex, endRowIndex);
    const endIndex = Math.max(startRowIndex, endRowIndex);
    tableData.value.forEach((rowData, rowIndex) => {
        // 若是这一项包含在已勾选的数组中去，就忽略之
        if (multipleSelection.value.some((msItem) => msItem.id == rowData.id)) {

        } else {
            if (rowIndex > startIndex && rowIndex < endIndex) {
                multipleSelection.value.push(rowData)
                multipleTableRef.value!.toggleRowSelection(rowData, rowIndex > startIndex && rowIndex < endIndex)
            }
        }
    })
}



const onKeyDown = (e: any) => {
    if (e.key === 'Shift') {
        clickInfo.isShiftPressed = true;
    }
};

const onKeyUp = (e: any) => {
    if (e.key === 'Shift') {
        clickInfo.isShiftPressed = false;
        clickInfo.startRowIndex = -1
        clickInfo.endRowIndex = -1
    }
};

onMounted(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
});
</script>