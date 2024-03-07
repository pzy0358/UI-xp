export interface TableOptions {
  prop?: string;
  label: string;
  width?: string | number;
  align?: "left" | "center" | "right";
  slot?: string;
  action?: boolean; // 是否显示操作
  editable?: boolean; // 是否可编辑
}
