<template>
    <el-table :data="tableData" @row-click="handleRowClick" :row-key="row => row.id" :highlight-current-row="true"
        :row-class-name="rowClassName" ref="multipleTable">
        <!-- 表格列配置 -->
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            tableData: [], // 表格数据
            startRowIndex: -1, // 起始位置行索引
            endRowIndex: -1, // 结束位置行索引
            shiftPressed: false // 是否按住Shift键
        };
    },
    methods: {
        handleRowClick(row, event) {
            if (event.shiftKey) {
                this.shiftPressed = true;
                if (this.startRowIndex === -1) {
                    this.startRowIndex = this.tableData.indexOf(row);
                } else {
                    this.endRowIndex = this.tableData.indexOf(row);
                    this.selectRowsInRange();
                }
            } else {
                this.startRowIndex = this.tableData.indexOf(row);
                this.endRowIndex = -1;
            }
        },
        selectRowsInRange() {
            const startIndex = Math.min(this.startRowIndex, this.endRowIndex);
            const endIndex = Math.max(this.startRowIndex, this.endRowIndex);
            for (let i = 0; i < this.tableData.length; i++) {
                this.$refs.multipleTable.toggleRowSelection(this.tableData[i], i >= startIndex && i <= endIndex);
            }
            this.startRowIndex = -1;
            this.endRowIndex = -1;
            this.shiftPressed = false;
        },
        rowClassName({ row, rowIndex }) {
            if (rowIndex >= this.startRowIndex && rowIndex <= this.endRowIndex) {
                return 'multiple-table-row-highlight';
            }
            return '';
        }
    }
};
</script>

<style>
.multiple-table-row-highlight {
    background-color: #f5f5f5;
}
</style>