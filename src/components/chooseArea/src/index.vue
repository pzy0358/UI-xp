<template>
  <div style="display: flex">
    <el-select clearable placeholder="请选择省份" v-model="province">
      <el-option
        v-for="item in areas"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      ></el-option>
    </el-select>
    <el-select
      clearable
      :disabled="!province"
      placeholder="请选择城市"
      v-model="city"
    >
      <el-option
        v-for="item in selectCity"
        :label="item.name"
        :value="item.code"
        :key="item.code"
      ></el-option>
    </el-select>
    <el-select
      clearable
      :disabled="!province || !city"
      placeholder="请选择区域"
      v-model="area"
    >
      <el-option
        v-for="item in selectArea"
        :label="item.name"
        :value="item.code"
        :key="item.code"
      ></el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import allAreas from "../lib/pca-code.json";
console.log(allAreas);

import type { AreaItem, Data } from "../lib/type";

const areas = ref<AreaItem[]>(allAreas);

const province = ref<string>("");

const city = ref<string>("");

const area = ref<string>("");

const selectCity = ref<AreaItem[]>([]);
const selectArea = ref<AreaItem[]>([]);

// 监听选择省份
watch(
  () => province.value,
  (val: string) => {
    if (val) {
      // 匹配出所选择省份下的市区数据列表
      selectCity.value = areas.value.find(
        (item) => item.code === province.value
      )!.children!;
    }

    // 市 和 区的数据清空
    city.value = "";
    area.value = "";
  }
);

// 监听选择城市
watch(
  () => city.value,
  (val: string) => {
    if (val) {
      selectArea.value = selectCity.value.find(
        (item) => item.code === city.value
      )!.children!;
    }
    // 区的数据清空
    area.value = "";
  }
);

const emits = defineEmits(["change"]);

// 监听区域
watch(
  () => area.value,
  (val: string) => {
    if (val) {
      // 获取省的数据
      const provinceData: Data = {
        code: province.value,
        name:
          province.value &&
          areas.value.find((item) => item.code === province.value)!.name!,
      };
      // 获取市的数据
      const cityData: Data = {
        code: city.value,
        name:
          city.value &&
          selectCity.value.find((item) => item.code === city.value)!.name!,
      };
      // 获取区的数据
      const areaData: Data = {
        code: area.value,
        name:
          area.value &&
          selectArea.value.find((item) => item.code === area.value)!.name!,
      };
      // 传递给父组件
      emits('change',{
        province:provinceData,
        city:cityData,
        area:areaData
      })
    }
  }
);
</script>

<style></style>
