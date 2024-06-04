import { onMounted, onBeforeUnmount, reactive } from 'vue'
export function useShiftQuickSelect() {

    onMounted(() => {
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
    });

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

    const clickInfo = reactive({
        startRowIndex: -1,
        endRowIndex: -1,
        isShiftPressed: false
    })

    const ctr = (tableData: Record<string, any>, multipleSelection: Record<string, any>, multipleTableRef: Record<string, any>, row: Record<string, any>) => {
        // 获取当前点击的是第几行
        let i = tableData.findIndex((item: Record<string, any>) => item.id == row.id)
        // Shift按下逻辑
        if (clickInfo.isShiftPressed) {
            if (clickInfo.startRowIndex === -1) {
                clickInfo.startRowIndex = i
            } else {
                clickInfo.endRowIndex = i
                const { startRowIndex, endRowIndex } = clickInfo
                const startIndex = Math.min(startRowIndex, endRowIndex);
                const endIndex = Math.max(startRowIndex, endRowIndex);
                tableData.forEach((rowData: Record<string, any>, rowIndex: number) => {
                    // 若是这一项包含在已勾选的数组中去(已勾选)，就忽略之；没勾选就控制其勾选
                    if (!multipleSelection.some((msItem: Record<string, any>) => msItem.id == rowData.id)) {
                        if (rowIndex > startIndex && rowIndex < endIndex) {
                            multipleSelection.push(rowData)
                            multipleTableRef.toggleRowSelection(rowData, rowIndex > startIndex && rowIndex < endIndex)
                        }
                    }
                })
            }
        }
    }
    return { ctr }
}