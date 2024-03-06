<template>
  <div>
    <m-form
      label-width="100px"
      :options="options"
      @on-change="handleChange"
      @before-upload="handleBeforeUpload"
      @on-preview="handlePreview"
      @on-remove="handleRemove"
      @before-remove="beforeRemove"
      @on-success="handleSuccess"
      @on-exceed="handleExceed"
      :httpRequest="httpRequest"
    >
      <template #uploadArea>
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
      <template #action="scope">
        <el-button type="primary" @click="submitForm(scope)">提交</el-button>
        <el-button @click="resetForm(scope)">重置</el-button>
      </template>
    </m-form>
  </div>
</template>
<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import type {
  FormInstance,
  FormOptions,
} from "../../components/form/src/types/types";

interface Scope {
  form: FormInstance;
  model: any;
}
// 表单统一验证与提交
let submitForm = (scope: Scope) => {
  scope.form.validate((valid) => {
    if (valid) {
      ElMessage.success("验证通过");
    } else {
      ElMessage.error("验证失败");
      return false;
    }
  });
};

// 表单重置
let resetForm = (scope: Scope) => {
  scope.form.resetFields();
};

let options: FormOptions[] = [
  {
    type: "input",
    value: "",
    label: "用户名",
    prop: "username",
    placeholder: "请输入用户名",
    rules: [
      {
        required: true,
        message: "用户名不能为空",
        trigger: "blur",
      },
      {
        min: 2,
        max: 6,
        message: "用户名在2-6位之间",
        trigger: "blur",
      },
    ],
  },
  {
    type: "input",
    value: "",
    label: "密码",
    placeholder: "请输入密码",
    prop: "password",
    rules: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
      {
        min: 6,
        max: 15,
        message: "密码在6-15位之间",
        trigger: "blur",
      },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
  {
    type: "select",
    placeholder: "请选择职业",
    label: "职业",
    value: "",
    prop: "role",
    rules: [
      {
        required: true,
        message: "职业不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "option",
        label: "经理",
        value: "1",
      },
      {
        type: "option",
        label: "主管",
        value: "2",
      },
      {
        type: "option",
        label: "员工",
        value: "3",
      },
    ],
  },
  {
    type: "checkbox-group",
    value: [],
    label: "爱好",
    prop: "like",
    rules: [
      {
        required: true,
        message: "爱好不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "checkbox",
        label: "足球",
        value: "1",
      },
      {
        type: "checkbox",
        label: "篮球",
        value: "2",
      },
      {
        type: "checkbox",
        label: "排球",
        value: "3",
      },
    ],
  },
  {
    type: "radio-group",
    value: "",
    label: "性别",
    prop: "sex",
    rules: [
      {
        required: true,
        message: "性别不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "radio",
        label: "男",
        value: "male",
      },
      {
        type: "radio",
        label: "女",
        value: "female",
      },
      {
        type: "radio",
        label: "保密",
        value: "not",
      },
    ],
  },
  // 上传组件
  {
    type: "upload",
    label: "上传",
    prop: "pic",
    uploadAttrs: {
      action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
      multiple: true,
      limit: 3,
    },
    rules: [
      {
        required: true,
        message: "不能为空",
        trigger: "blur",
      },
    ],
  },
  {
    type: "editor",
    value: "",
    prop: "desc",
    label: "描述",
    placeholder: "请输入描述内容",
    rules: [
      {
        required: true,
        message: "不能为空",
        trigger: "blur",
      },
    ],
  },
];

let handleRemove = (file: any, fileList: any) => {
  console.log("handleRemove");
  console.log(file, fileList);
};
let handlePreview = (file: any) => {
  console.log("handlePreview");
  console.log(file);
};
let beforeRemove = (val: any) => {
  console.log("beforeRemove");
  return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`);
};
let handleExceed = (val: any) => {
  console.log("handleExceed", val);
  ElMessage.warning(
    `The limit is 3, you selected ${
      val.files.length
    } files this time, add up to ${
      val.files.length + val.fileList.length
    } totally`
  );
};
let handleSuccess = (val: any) => {
  console.log("success");
  console.log(val);
};
let handleChange = (val: any) => {
  console.log("change");
  console.log(val);
};
let handleBeforeUpload = (val: any) => {
  console.log("handleBeforeUpload");
  console.log(val);
};

// 自定义上传
let httpRequest = () => {
  console.log("val");
};
</script>
<style lang="scss" scoped></style>
