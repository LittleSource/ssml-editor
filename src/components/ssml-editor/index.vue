<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { nextTick, onBeforeUnmount, onMounted, shallowRef } from 'vue'
import type { IDomEditor } from '@wangeditor/editor'
import { Boot } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { InputData } from './utils/index'
import { parseSSML } from './utils/index'
import ssmlModule from './index'

const props = withDefaults(
  defineProps<{
    valueHtml: string
    maxLength: number
  }>(),
  {
    valueHtml: '',
    maxLength: 5000,
  },
)

const emit = defineEmits<{
  (e: 'input', res: InputData): void
}>()

onMounted(() => {
  Boot.registerModule(ssmlModule)
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef<IDomEditor>()

const toolbarConfig = {
  toolbarKeys: ['undo', 'redo', 'pause', 'polyphone', 'digit'],
}

const editorConfig = {
  placeholder: '请输入内容',
  maxLength: props.maxLength,
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null)
    return
  editor.destroy()
})

function handleCreated(editor: IDomEditor) {
  editorRef.value = editor
  nextTick(() => {
    handleToolBarToolTip()
  })
}
// 显示菜单栏tooltip
function handleToolBarToolTip() {
  const toolbar = document.getElementById('toolbar') as HTMLDivElement
  Array.from(toolbar.children[0].children as HTMLCollection).forEach((item) => {
    const menuButton = item.children[0] as HTMLButtonElement
    const { menuKey } = menuButton.dataset
    switch (menuKey) {
      case 'undo':
        menuButton.className = 'w-e-menu-tooltip-v5-up'
        menuButton.dataset.tooltip = '撤销'
        break
      case 'redo':
        menuButton.className = 'w-e-menu-tooltip-v5-up'
        menuButton.dataset.tooltip = '重做'
        break
      case 'pause':
        menuButton.className = 'w-e-menu-tooltip-v5-up'
        menuButton.dataset.tooltip = '请在文本之间插入停顿'
        break
      case 'polyphoneMenu':
        menuButton.className = 'w-e-menu-tooltip-v5-up'
        menuButton.dataset.tooltip = '请先选中单个汉字再设置其发音'
        break
      case 'digit':
        menuButton.className = 'w-e-menu-tooltip-v5-up'
        menuButton.dataset.tooltip = '请先选中数字再更改其读法'
        break
      default:
        break
    }
  })
}

function handleChange() {
  const res = getInputData()
  if (res.text.length > props.maxLength) {
    // eslint-disable-next-line no-alert
    alert(`最多输入${props.maxLength}个字符`)
    editorRef.value?.deleteBackward('character')
    return
  }
  emit('input', res)
}

// 将粘贴的内容转换为纯文本
function customPaste(
  editor: IDomEditor,
  e: ClipboardEvent,
  callback: (prohibit: boolean) => void,
) {
  const text = e.clipboardData?.getData('text/plain') || ''
  editor.insertText(text)
  e.preventDefault()
  callback(false)
  return false
}

function getInputData(length: number = Number.MAX_SAFE_INTEGER): InputData {
  const editor = editorRef.value
  if (editor == null) {
    return {
      text: '',
      ssml: '',
      length: 0,
    }
  }
  return parseSSML(editor.children, length)
}

function getHtml() {
  const editor = editorRef.value
  if (editor == null || editor.isEmpty())
    return ''
  return editor.getHtml()
}

defineExpose({
  getInputData,
  getHtml,
})
</script>

<template>
  <div>
    <div style="border: 1px solid #eaf1ff">
      <Toolbar
        id="toolbar"
        :editor="editorRef"
        :default-config="toolbarConfig"
      />
      <Editor
        class="editor"
        mode="simple"
        :model-value="props.valueHtml"
        :default-config="editorConfig"
        @on-created="handleCreated"
        @on-change="handleChange"
        @custom-paste="customPaste"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import "./index.scss";
#toolbar{
  border-bottom: 1px solid #eaf1ff;
}
.editor{
  height: 38vh !important;
  overflow-y: hidden;
}
</style>
