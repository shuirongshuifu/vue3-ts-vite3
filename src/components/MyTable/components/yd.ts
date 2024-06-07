import { ElTableColumn } from 'element-plus'
import { h } from 'vue'
const CvpColumn = (props: any, ctx: any): any => {
  const setColumns = (cols: any) => {
    if (!cols.children) return null;
    return cols.children.map((col: any) => {
      return h(CvpColumn, { col });
    });
  };
  const childVnode: any = props.col.children ? setColumns(props.col) : null

  const defaultSlot = props.col.defaultSlot ?? null

  const scopedSlots: any =
   
      defaultSlot

  const VNode = { ...scopedSlots }

  return h(
    ElTableColumn, props.col.attrs, VNode);

};
export default CvpColumn;
