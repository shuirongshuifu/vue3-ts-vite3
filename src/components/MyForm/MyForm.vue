<template>
  <el-form ref="myFormRef" :model="modelValue" v-bind="mergeAttr" @keyup.enter="submit(myFormRef)">
    <el-row>
      <template v-for="(item, index) in conf">
        <el-col v-if="!item.hidden" :span="item.span" class="setElCol">
          <el-form-item style="width: 100%;" :label="item.label" :prop="item.attr.prop">
            <component :is="item.type" :form="modelValue" :attr="item.attr">
              <template v-slot:[slot] v-for="(_, slot) in slots">
                <slot :name="slot"></slot>
              </template>
            </component>
          </el-form-item>
        </el-col>
      </template>
      <el-col style="flex: 1">
        <el-form-item>
          <template v-for="(btn, key) in mergeBtns">
            <el-button v-bind="btn" @click="clickBtn(key as string, btn)">{{ btn.name }}</el-button>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref, provide, watch, computed, defineExpose, defineSlots } from "vue";
import { cloneDeep } from "lodash";

import MyInput from "./components/MyInput/MyInput.vue";
import MyInputNumber from "./components/MyInputNumber/MyInputNumber.vue";
import MyRadio from "./components/MyRadio/MyRadio.vue";
import MyRate from "./components/MyRate/MyRate.vue";
import MySelect from "./components/MySelect/MySelect.vue";
import MyDate from "./components/MyDate/MyDate.vue";

import type { FormInstance, FormRules } from 'element-plus'

defineOptions({
  name: 'MyForm',
  components: { MyInput, MyInputNumber, MyRadio, MyRate, MySelect, MyDate }
})

const slots = defineSlots();

interface ConfItem {
  [key: string]: any;
}

const props = defineProps({
  conf: {
    type: Array as () => ConfItem[],
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
    default: () => { }
  },
  formAttr: {
    type: Object,
    default: () => { }
  },
  // 默认的3个按钮
  btns: {
    type: Object,
    default: () => { }
  },
});

// 组件实例
const myFormRef = ref<FormInstance>()

// 自定义事件
const emit = defineEmits(['update:modelValue', 'ev']);

// 存一份初始值，用于重置form
const initForm = cloneDeep(props.modelValue)
const reset = (myFormRef: FormInstance | undefined) => {
  // 更新外层v-model数据，并清除表单校验
  emit('update:modelValue', initForm);
  myFormRef?.resetFields()
  props.formAttr?.cb({
    btnName: 'reset',
    formVal: props.modelValue
  })
}

// 重置或提交都通过cb来抛出去通知外面
const submit = async (myFormRef: FormInstance | undefined) => {
  if (!myFormRef) return
  await myFormRef.validate((valid, fields) => {
    if (valid) {
      props.formAttr?.cb({
        btnName: 'submit',
        formVal: props.modelValue
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 取消操作通知外面
const cancel = () => {
  props.formAttr?.cb({
    btnName: 'cancel',
    formVal: props.modelValue
  })
}

// 收集并暴露给父组件用
const clickBtn = (which: string, btn?: ConfItem) => {
  if (which == 'reset') reset(myFormRef.value)
  if (which == 'submit') submit(myFormRef.value)
  if (which == 'cancel') cancel()
  if (btn?.cb) btn.cb(btn)
}

defineExpose({
  clickBtn
});


watch(() => props.modelValue, (newVal) => {
  // 更新外层v-model数据
  emit('update:modelValue', newVal);
}, { deep: true })

// 为第三层提供事件中转钩子函数
provide('eventCallBack', (info: object) => {
  emit('ev', info)
})

// 合并外界传递进来的el-form属性
const mergeAttr = computed(() => {
  const defaultAttr = {
    labelWidth: "auto",
    labelPosition: 'right',
    size: 'default'
  }
  return { ...defaultAttr, ...props.formAttr }
})

// 合并按钮
const mergeBtns = computed(() => {
  const defaultBtns: ConfItem = {
    cancel: {
      name: '取消',
      icon: 'CircleClose',
      type: "info",
      plain: true,
      hidden: false
    },
    reset: {
      name: '重置',
      icon: 'RefreshRight',
      plain: true,
    },
    submit: {
      name: '提交',
      icon: 'CircleCheck',
      type: "primary"
    }
  }
  const propsBtns = cloneDeep(props.btns)
  for (const pkey in propsBtns) {
    if (pkey in defaultBtns) {
      defaultBtns[pkey] = {
        ...defaultBtns[pkey],
        ...propsBtns[pkey]
      }
    } else {
      defaultBtns[pkey] = propsBtns[pkey]
    }
    // 有hidden的删除不要
    if (defaultBtns[pkey].hidden) delete defaultBtns[pkey]
  }
  return defaultBtns
})
</script>

<style>
.setElCol {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.btnsElCol {
  flex: 1;
  box-sizing: border-box;
  padding: 0 24px;
}

.el-form-item__label-wrap {
  align-items: center;
}
</style>