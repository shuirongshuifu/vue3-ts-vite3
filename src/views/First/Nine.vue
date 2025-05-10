<template>
    <div>
        <div class="bnts">
            <el-button type="primary" @click="toggleAllSelectionFn">切换全选和全不选</el-button>
            <el-button type="primary"
                @click="toggleOddSelectionFn([tableData[0], tableData[2], tableData[4]])">奇数行勾选</el-button>
            <el-button type="primary"
                @click="toggleEvenSelectionFn([tableData[1], tableData[3], tableData[5]])">偶数行勾选</el-button>
            <el-button type="primary" @click="clearAllSelectionFn">清除所有勾选</el-button>
            <el-tag class="myTag" size="large" type="warning">已勾选行：{{
                multipleSelection.length
            }} 个</el-tag>
            <el-button type="primary" @click="handleAddRowFn">新增行</el-button>
        </div>
        <ExcelTable ref="excelTableRef" border height="540" :columns="columns" :tableData="tableData"
            @saveRow="handleSaveRow" @deleteRow="handleDeleteRow" :isShowSelect="true" :isShowIndex="false"
            :header-cell-style="{ backgroundColor: '#E6E8EB', color: '#333' }" row-key="id"
            @selection-change="handleSelectionChange">
            <!-- 自定义列头 -->
            <template #header:name="scope">
                <span style="border: 2px solid pink;">{{ scope.column.label }}</span>
            </template>
            <!-- 自定义列内容 -->
            <template #default:gender="scope">
                <el-tag v-if="scope.row.gender === '1'" type="success" size="large">男</el-tag>
                <el-tag v-else type="danger" size="large">女</el-tag>
            </template>
        </ExcelTable>
    </div>
</template>

<script setup>
import { ref, markRaw } from 'vue';
import { ElMessage } from 'element-plus';

import { User, UserFilled } from '@element-plus/icons-vue'
import ExcelTable from '../../components/ExcelTable/ExcelTable.vue';

// 表格列配置
const columns = ref([
    {
        tableColumnAttr: {
            prop: 'id',
            label: 'ID',
            width: '55px',
            align: 'left',
            sortable: true,
            fixed: true,
            showOverflowTooltip: true,
        },
        componentsAttr: {
            style: {
                color: 'red',
                fontSize: '16px',
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }
        }
    },
    {
        type: 'input',
        tableColumnAttr: {
            prop: 'name',
            label: '姓名',
            width: '180px',
            align: 'left',
        },
        componentsAttr: {
            prefixIcon: markRaw(UserFilled),
            suffixIcon: markRaw(User),
            placeholder: '请输入姓名',
            clearable: true,
        },
        validatorFn: (value) => {
            if (!value) {
                return '姓名不能为空';
            }
            if (value.length > 10) {
                return '姓名不能超过10个字';
            }
        },
    },
    {
        type: 'inputNumber',
        tableColumnAttr: {
            prop: 'age',
            label: '年龄',
            width: '200px',
            align: 'left',
        },
        componentsAttr: {
            clearable: true,
            min: 1,
            max: 10000,
            step: 1,
            controlsPosition: 'right',
            placeholder: '请输入年龄',
            // 这种方式用的少
            onChange(value) {
                if (value === 66 || value === 666) {
                    ElMessage.warning('年龄不能为66或666');
                }
            },
        },
        validatorFn: (value) => {
            if (value === 66 || value === 666) {
                return '年龄不能为66或666';
            }
        },
    },
    {
        type: 'select',
        tableColumnAttr: {
            prop: 'gender',
            label: '性别',
            width: '120px',
            align: 'left',
            align: 'center',
        },
        componentsAttr: {
            placeholder: '请选择性别',
            filterable: true,
            size: 'large',
        },
        // 针对于下拉框要提供选项options数据
        options: []
    },
    {
        type: 'select',
        tableColumnAttr: {
            prop: 'hobby',
            label: '爱好',
            width: '290px',
            align: 'left',
        },
        componentsAttr: {
            placeholder: '请选择爱好',
            filterable: true,
            size: 'large',
            multiple: true,
        },
        options: [
            { label: '吃饭', value: '吃饭' },
            { label: '睡觉', value: '睡觉' },
            { label: '打游戏', value: '打游戏' },
        ]
    },
    {
        type: 'date',
        tableColumnAttr: {
            prop: 'birthday',
            label: '生日',
            width: '160px',
            align: 'left',
        },
        componentsAttr: {
            type: 'date',
            placeholder: '请选择生日',
            size: 'default',
            format: 'YYYY-MM-DD',
            valueFormat: 'YYYY-MM-DD',
            clearable: true,
            style: {
                width: '100%',
            }
        },
    },
    {
        type: 'input',
        tableColumnAttr: {
            prop: 'remark',
            label: '备注',
            width: '320px',
            align: 'left',
        },
        componentsAttr: {
            type: 'textarea',
            rows: 2,
            maxlength: 100,
            showWordLimit: true,
            placeholder: '请输入备注',
        },
    },
])

setTimeout(() => {
    // 异步获取性别下拉框数据
    let item = columns.value.find(item => item.type === 'select' && item.tableColumnAttr.prop === 'gender')
    item.options = [
        { label: '男', value: '1' },
        { label: '女', value: '2' },
    ]
}, 3000)

const tableData = ref([
    {
        id: 123456789,
        name: '孙悟空',
        age: 500,
        gender: '1',
        birthday: '2021-01-01',
        remark: '孙悟空是唐僧的大徒弟，法力高强，善于变化，是唐僧取经路上的得力助手。',
        hobby: ['吃饭'],
    },
    {
        id: 2,
        name: '猪八戒',
        age: 300,
        gender: '2',
        birthday: '2022-02-02',
        remark: '猪八戒是唐僧的二徒弟，贪吃懒惰，喜欢睡觉，是唐僧取经路上的得力助手。',
        hobby: ['吃饭', '睡觉'],
    },
    {
        id: 3,
        name: '沙僧',
        age: 200,
        gender: '1',
        birthday: '2023-03-03',
        remark: '沙僧是唐僧的三徒弟，忠诚老实，任劳任怨，是唐僧取经路上的得力助手。',
        hobby: ['吃饭', '睡觉', '打游戏'],
    },
    {
        id: 4,
        name: '唐僧',
        age: 100,
        gender: '2',
        birthday: '2024-04-04',
        remark: '唐僧是唐僧的师傅，法力高强，善于变化，是唐僧取经路上的得力助手。',
        hobby: ['睡觉'],
    },
    {
        id: 5,
        name: '白龙马',
        age: 99,
        gender: '1',
        birthday: '2025-05-05',
        remark: '白龙马是唐僧的坐骑，法力高强，善于变化，是唐僧取经路上的得力助手。',
        hobby: ['睡觉', '打游戏'],
    },
    {
        id: 6,
        name: '观音菩萨',
        age: 88,
        gender: '2',
        birthday: '2026-06-06',
        remark: '观音菩萨是唐僧的师傅，法力高强，善于变化，是唐僧取经路上的得力助手。',
        hobby: ['打游戏'],
    },
]);

// 获取表格实例
const excelTableRef = ref(null);

// 保存行
const handleSaveRow = (row) => {
    console.log('保存行', row);
};

// 删除行 
const handleDeleteRow = (row) => {
    console.log('删除行', row);
};

const multipleSelection = ref([]);
// 选择行
const handleSelectionChange = (selection) => {
    multipleSelection.value = selection;
};

// 全选和全不选
const toggleAllSelectionFn = () => {
    excelTableRef.value.myExcelTableRef.toggleAllSelection();
};

// 奇数行勾选
const toggleOddSelectionFn = (rows) => {
    rows.forEach(row => {
        excelTableRef.value.myExcelTableRef.toggleRowSelection(row, true);
    });
};

// 偶数行勾选
const toggleEvenSelectionFn = (rows) => {
    rows.forEach(row => {
        excelTableRef.value.myExcelTableRef.toggleRowSelection(row, true);
    });
};

// 清除所有勾选
const clearAllSelectionFn = () => {
    excelTableRef.value.myExcelTableRef.clearSelection();
};

// 新增行
const handleAddRowFn = () => {
    // 检查是否存在姓名为空的行
    const hasEmptyName = tableData.value.some(row => !row.name);
    if (hasEmptyName) {
        ElMessage.warning('存在姓名为空的行,请先完善数据再新增');
        return;
    }
    tableData.value.unshift({
        id: tableData.value.length + 1,
        name: null,
        age: null,
        gender: null,
        remark: null,
    });
};
</script>

<style scoped>
.bnts {
    margin-bottom: 12px;
}

.myTag {
    margin-left: 12px;
    margin-right: 12px;
    font-size: 16px;
    font-weight: bold;
}
</style>