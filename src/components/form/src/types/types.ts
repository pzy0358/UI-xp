import type { RuleItem } from "./rule";
import type { CSSProperties } from "vue";
export interface FormOptions {
  // 表单项显示的元素
  type:
    | "cascader"
    | "checkbox"
    | "checkbox-group"
    | "checkbox-button"
    | "color-picker"
    | "date-picker"
    | "input"
    | "input-number"
    | "radio"
    | "radio-group"
    | "radio-button"
    | "rate"
    | "select"
    | "option"
    | "slider"
    | "switch"
    | "time-picker"
    | "time-select"
    | "transfer"
    | "upload"
    | "editor";

  // 表单项值
  value?: any;

  // 表单项标题
  label?: string;

  // 表单项标识
  prop?: string;

  // 表单项的验证规则
  rules?: RuleItem[];

  // 表单项的占位符
  placeholder?: string;

  // 表单元素特有的属性
  attrs?: {
    // 是否清空
    clearable?: boolean;
    // 是否显示密码
    showPassword?: boolean;
    // 是否禁用
    disabled?: boolean;
  };
  children?: FormOptions[];
  // 上传组件的特有属性
  uploadAttrs?: {
    action: string;
    headers?: object;
    method?: "post" | "put" | "patch";
    multiple?: boolean;
    data?: any;
    name?: string;
    withCredentials?: boolean;
    showFileList?: boolean;
    drag?: boolean;
    accept?: string;
    thumbnailMode?: boolean;
    fileList?: any[];
    listType?: "text" | "picture" | "picture-card";
    autoUpload?: boolean;
    disabled?: boolean;
    limit?: number;
  };

  // 富文本编辑器类型
  editorConfig?: any;
  toolbarConfig?: any;
}

import { ValidateFieldsError } from "async-validator";
interface Callback {
  (isValid?: boolean, invalidFields?: ValidateFieldsError): void;
}

export interface ValidateFieldCallback {
  (message?: string, invalidFields?: ValidateFieldsError): void;
}

export interface FormInstance {
  registerLabelWidth(width: number, oldWidth: number): void;
  deregisterLabelWidth(width: number): void;
  autoLabelWidth: string | undefined;
  emit: (evt: string, ...args: any[]) => void;
  labelSuffix: string;
  inline?: boolean;
  model?: Record<string, unknown>;
  size?: string;
  showMessage?: boolean;
  labelPosition?: string;
  labelWidth?: string;
  rules?: Record<string, unknown>;
  statusIcon?: boolean;
  hideRequiredAsterisk?: boolean;
  disabled?: boolean;
  validate: (callback?: Callback) => Promise<boolean>;
  resetFields: () => void;
  clearValidate: (props?: string | string[]) => void;
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void;
}
