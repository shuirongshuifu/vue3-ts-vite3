import { ElTableColumn } from 'element-plus'
import { h } from 'vue'

const noChildren = (column: any) => {
    let newColumn = {}
    for (const key in column) {
        if (key != 'children') {
            // @ts-ignore
            newColumn[key] = column[key]
        }
    }
    return newColumn
}


const SelfColumns = (params: any, ctx: any): any => {
    const { defaultSlot, headerSlot } = params.column
    const Vnode = { default: defaultSlot || null, header: headerSlot || null }
    return h(ElTableColumn, noChildren(params.column), Vnode);
};

export default SelfColumns;