import { ElTableColumn } from 'element-plus'
import { h } from 'vue'

const SelfColumns = (params: any, ctx: any): any => {
    const { defaultSlot, headerSlot } = params.column
    const Vnode = { default: defaultSlot || null, header: headerSlot || null }
    return h(ElTableColumn, params.column, Vnode);
};

export default SelfColumns;