<template>
  <div>
    <m-form label-width="100px" :options="options"></m-form>
  </div>
</template>
<script setup lang="ts">
import type { FormOptions } from "../../components/form/src/types/types";

let options: FormOptions[] = [
  {
    type: "input",
    value: "",
    label: "用户名",
    prop: "username",
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
    type:'select',
    placeholder:'请选择职业',
    label:'职业',
    value:'',
    prop:'role',
    rules:[
        {
          required:true,
          message:'职业不能为空',
          trigger:'change'
        }
    ],
    children:[
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
    ]
  },
  {
    type:'checkbox-group',
    value:[],
    label:'爱好',
    prop:'like',
    rules:[
        {
          required:true,
          message:'爱好不能为空',
          trigger:'change'
        }
    ],
    children:[
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
        }
    ]
  },
  {
    type:'radio-group',
    value:'',
    label:'性别',
    prop:'sex',
    rules:[{
      required:true,
      message:'性别不能为空',
      trigger:'change'
    }],
    children:[
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
        }
    ]
  }
];
</script>
<style lang="scss" scoped></style>
