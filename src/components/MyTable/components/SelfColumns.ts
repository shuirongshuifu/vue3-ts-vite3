import { ElTableColumn } from 'element-plus'
import { h } from 'vue'

const SelfColumns = (params: any, ctx: any): any => {
    const { defaultSlot } = params.column
    if(params.column.prop == 'address'){
        // console.log('ctx', ctx)
    }
    const Vnode = defaultSlot ? defaultSlot : {}
    return h(ElTableColumn, params.column, Vnode);
};

export default SelfColumns;