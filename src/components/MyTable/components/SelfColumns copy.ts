import { ElTableColumn } from 'element-plus'
import { h } from 'vue'
const SelfColumns = (props: any, ctx: any): any => {
  const setColumns = (cols: any) => {
    if (!cols.children) return null;
    return cols.children.map((col: any) => {
      return h(SelfColumns, { col });
    });
  };
  // 定义渲染虚拟列
  const childVnode: any = props.col.children ? setColumns(props.col) : null
  // 处理插槽(兼容render函数)
  const defaultSlot = props.col.defaultSlot ?? null
  const scopedSlots: any = props.col.render ? {
    default: ({ row }: any) => props.col.render(row, props.col),
    ...defaultSlot
  } : defaultSlot
  const VNode = childVnode ? {
    ...scopedSlots,
    default: () => childVnode,
  } : {
    ...scopedSlots,
  }

  return h(
    ElTableColumn, props.col.attrs, VNode);

};

export default SelfColumns;
