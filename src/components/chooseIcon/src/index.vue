<template>
    <el-button type="primary" @click="handleClick">
        <slot></slot>
    </el-button>
    <el-dialog :title="title" v-model="dialogVisible">
        <div class="container">
            <div class="item"
            :key="index"
            v-for="item,index in Object.keys(ElementPlusIconsVue)"
            @click="clickItem(item)"
            >
            <div class="text">
                <component :is="`el-icon-${toLine(item)}`"></component>
            </div>
            <div class="icon">{{ item }}</div>
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts" setup>
// 引入element-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {toLine} from '../../../utils/index'

import {watch, ref } from 'vue';
import { useCopy } from '../../../hooks/useCopy';

const props = defineProps<{
    title:string,
    visible:boolean
}>()

const emits = defineEmits(['update:visible'])

const handleClick=()=>{
    // console.log(111);
    
    emits('update:visible',!props.visible)
}
// 文本复制
const clickItem=(item:string)=>{
    const text = `el-icon-${toLine(item)}`
    useCopy(text)
    // 关闭弹窗
    emits('update:visible',false)
}

const dialogVisible = ref<boolean>(props.visible)

watch(()=>props.visible,(val)=>{
    dialogVisible.value = val
})
watch(()=>dialogVisible.value,(val)=>{
    emits('update:visible',val)
})
</script>
<style lang="scss" scoped>
.container{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow-y: scroll;
    height: 600px;
    
    .item{
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        height: 70px;
    }
    .text{
        font-size: 14px;
    }
    .icon{
        flex: 1;
    }
    svg{
        width: 2em;
        height: 2em;
    }
}
</style>