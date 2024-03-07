<template>
  <el-form
    ref="form"
    v-if="model"
    :validate-on-rule-change="false"
    :model="model"
    :rules="rules"
    v-bind="$attrs"
  >
    <template v-for="(item, index) in options" :key="index">
      <!-- 没有children -->
      <el-form-item
        v-if="!item.children || !item.children!.length"
        :prop="item.prop"
        :label="item.label"
      >
        <component
          v-if="item.type !== 'upload'"
          v-bind="item.attrs"
          :placeholder="item.placeholder"
          v-model="model[item.prop!]"
          :is="`el-${item.type}`"
        ></component>

        <el-upload
          class="upload"
          v-bind="item.uploadAttrs"
          v-else
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :on-exceed="onExceed"
          :http-request="httpRequest"
        >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
        <!-- 渲染wangeditor插件 -->
        <div
          id="editor"
          v-if="item.type === 'editor'"
          style="border: 1px solid #ccc"
        >
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="default"
          />
          <Editor
            style="height: 500px; overflow-y: hidden"
            v-model="model[item.prop!]"
            :defaultConfig="{
              placeholder: item.placeholder,
              ...item.attrs,
            }"
            :mode="default"
            @onCreated="handleCreated"
          />
        </div>
      </el-form-item>
      <!-- 有children -->
      <el-form-item
        v-if="item.children && item.children.length"
        :prop="item.prop"
        :label="item.label"
      >
        <component
          v-bind="item.attrs"
          v-model="model[item.prop!]"
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
          ></component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {
  type PropType,
  onMounted,
  ref,
  watch,
  onBeforeUnmount,
  shallowRef,
} from "vue";
import type { FormInstance, FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

let form = ref<FormInstance | null>();

let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function,
  },
});

// 表单数据
let model = ref<any>(null);
let rules = ref<any>(null);

// 初始化表单方法
let initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};

    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;
    });

    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
  }
};

// dom加载时
onMounted(() => {
  initForm();
  setTimeout(() => {
    valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
  }, 1500);
});
// 监听父组件传递过来的options变化
watch(
  () => props.options,
  () => {
    initForm();
  },
  {
    deep: true,
  }
);
let emits = defineEmits([
  "on-preview",
  "on-remove",
  "on-success",
  "on-error",
  "on-progress",
  "on-change",
  "before-upload",
  "before-remove",
  "on-exceed",
]);

// 上传组件的所有方法
let onPreview = (file: File) => {
  emits("on-preview", file);
};
let onRemove = (file: File, fileList: FileList) => {
  emits("on-remove", { file, fileList });
};
let onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  let uploadItem = props.options.find((item) => item.type === "upload")!;
  model.value[uploadItem.prop!] = { response, file, fileList };
  emits("on-success", { response, file, fileList });
};
let onError = (err: any, file: File, fileList: FileList) => {
  emits("on-error", { err, file, fileList });
};
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits("on-progress", { event, file, fileList });
};
let onChange = (file: File, fileList: FileList) => {
  emits("on-change", { file, fileList });
};
let beforeUpload = (file: File) => {
  emits("before-upload", file);
};
let beforeRemove = (file: File, fileList: FileList) => {
  emits("before-remove", { file, fileList });
};
let onExceed = (files: File, fileList: FileList) => {
  emits("on-exceed", { files, fileList });
};

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<style lang="scss" scoped></style>
