<template>
    <span @click="toggle">
            <el-icon-expand v-if="collapse"></el-icon-expand>
            <el-icon-fold v-else></el-icon-fold>
          </span>
</template>

<script setup lang="ts">
let props = defineProps<{
    collapse: boolean;
}>();

let emits = defineEmits(['update:collapse'])

const toggle = () => {
    emits('update:collapse', !props.collapse);
  };
</script>