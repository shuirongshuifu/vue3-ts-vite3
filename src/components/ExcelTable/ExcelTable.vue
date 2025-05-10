<template>
    <el-table ref="myExcelTableRef" :data="tableData" v-bind="attrs">
        <!-- 选择框列 -->
        <el-table-column v-if="isShowSelect" type="selection" width="50" />
        <!-- 序号列 -->
        <el-table-column v-if="isShowIndex" type="index" label="序" width="50" />
        <!-- 表格列 -->
        <el-table-column v-for="column in columns" :key="column.tableColumnAttr.prop" v-bind="column.tableColumnAttr">
            <!-- 1. 处理 header 插槽 -->
            <template #header="scope">
                <!-- 优先检查是否有针对该列的 header 插槽（如 header:id） -->
                <slot v-if="slots[`header:${column.tableColumnAttr.prop}`]"
                    :name="`header:${column.tableColumnAttr.prop}`" v-bind="scope" />
                <!-- 默认显示列标题 -->
                <span v-else>{{ column.tableColumnAttr.label }}</span>
            </template>
            <!-- 2. 处理 default 插槽 -->
            <template #default="scope">
                <!-- 优先检查是否有针对该列的 default 插槽（如 default:id） -->
                <slot v-if="slots[`default:${column.tableColumnAttr.prop}`]"
                    :name="`default:${column.tableColumnAttr.prop}`" v-bind="scope" />
                <!-- 默认显示对应类型的组件 -->
                <template v-else>
                    <template v-if="column.type">
                        <el-input v-if="column.type === 'input'" v-bind="column.componentsAttr"
                            v-model="scope.row[column.tableColumnAttr.prop]" />
                        <el-input-number v-else-if="column.type === 'inputNumber'" v-bind="column.componentsAttr"
                            v-model="scope.row[column.tableColumnAttr.prop]" />
                        <el-select v-else-if="column.type === 'select'" v-bind="column.componentsAttr"
                            v-model="scope.row[column.tableColumnAttr.prop]">
                            <el-option v-for="option in column.options" :key="option.value" :label="option.label"
                                :value="option.value" />
                        </el-select>
                        <el-date-picker v-else-if="column.type === 'date'" v-bind="column.componentsAttr"
                            v-model="scope.row[column.tableColumnAttr.prop]" />
                    </template>
                    <!-- 没有 type 的列，显示默认的 div -->
                    <div v-else :style="column.componentsAttr?.style">
                        {{ scope.row[column.tableColumnAttr.prop] }}
                    </div>
                </template>
            </template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作" width="180">
            <template #default="{ row }">
                <el-button type="success" @click="handleSave(row)">保存</el-button>
                <el-button type="danger" @click="handleDelete(row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref, useAttrs, defineSlots } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const props = defineProps({
    // 表格列配置
    columns: {
        type: Array,
        required: true,
        // 校验表格列配置
        validator: (cols) => cols.every(col =>
            col.tableColumnAttr && col.tableColumnAttr.prop
        )
    },
    // 表格数据
    tableData: {
        type: Array,
        required: true,
    },
    // 是否显示选择框列
    isShowSelect: {
        type: Boolean,
        default: true,
    },
    // 是否显示序号列
    isShowIndex: {
        type: Boolean,
        default: true,
    },
});

// 获取父组件传递的属性（v-bind兜底的）
const attrs = useAttrs();

// 获取插槽
const slots = defineSlots();

// 派发事件给父组件
const emit = defineEmits(['saveRow', 'deleteRow']);

// 获取表格实例，暴露给父组件，以供使用
const myExcelTableRef = ref(null);
defineExpose({
    myExcelTableRef
});

// 保存数据
const handleSave = (row) => {
    // 校验字段
    for (const column of props.columns) {
        if (column.validatorFn) {
            const validateResult = column.validatorFn(row[column.tableColumnAttr.prop]);
            if (typeof validateResult === 'string') {
                ElMessage.error(validateResult);
                console.error(`${column.tableColumnAttr.label} 字段校验不通过`);
                return;
            }
        }
    }
    // 内部组件校验通过保存数据
    emit('saveRow', row);
};

// 删除数据
const handleDelete = (row) => {
    ElMessageBox.confirm('确定删除该行数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        emit('deleteRow', row);
    });
};
</script>