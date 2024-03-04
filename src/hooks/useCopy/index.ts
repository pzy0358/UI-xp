import {ElMessage} from "element-plus";

// 复制文本功能
export const useCopy = (text:string) =>{
    // 创建文本输入框
    const input = document.createElement('input');
    // 将传入的文本赋值给输入框
    input.value = text
    // 渲染到body中
    document.body.appendChild(input);
    // 选中文本框
    input.select()
    // 执行浏览器复制命令
    document.execCommand('Copy')
    // 移除输入框
    document.body.removeChild(input);
    // 弹出提示框
    ElMessage.success('复制成功')
}