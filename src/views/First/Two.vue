<template>
  <h3>el-form组件二次封装——第二部分(插槽用法)</h3>
  <ul>
    <li>命名插槽冒号分隔</li>
    <li>给那个字段用</li>
    <li>用的插槽的名字是那个</li>
  </ul>
  <MyForm ref="MyFormRef" :conf="conf" v-model="form" :btns="btns">
    <template #ming:prefix>
      <el-icon>
        <Sunrise />
      </el-icon>
    </template>
    <template #ming:suffix>
      <el-icon>
        <Sunny />
      </el-icon>
    </template>
    <template #age:prefix>
      <el-icon>
        <Ship />
      </el-icon>
    </template>
    <template #age:suffix>
      <el-icon>
        <Moon />
      </el-icon>
    </template>
    <template #web:prepend>Http://</template>
    <template #web:append>.com</template>
    <template #skill:header>^_^</template>
  </MyForm>
</template>

<script setup lang="ts">
import MyForm from '@/components/MyForm/MyForm.vue'
import { ref, reactive, watch, markRaw } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'

const conf = reactive([
  {
    type: 'MyInput',
    label: '姓名',
    span: 24,
    attr: {
      prop: 'ming',
      placeholder: '请输入姓名',
    },
  },
  {
    type: 'MyInput',
    label: '年龄',
    span: 24,
    attr: {
      prop: 'age',
      placeholder: '请输入年龄',
    },
  },
  {
    type: 'MyInput',
    label: '网址',
    span: 18,
    attr: {
      prop: 'web',
      placeholder: '请输入网址',
    },
  },
  {
    type: 'MySelect',
    label: '技能',
    span: 18,
    attr: {
      prop: 'skill',
      placeholder: '请选择技能',
      attr: {
        options: [
          {
            label: '筋斗云',
            value: '筋斗云'
          },
          {
            label: '火眼金睛',
            value: '火眼金睛'
          },
          {
            label: '七十二变',
            value: '七十二变'
          },
        ],
      }
    },
  },
])

const btns = {
  cancel: { hidden: true },
  reset: { hidden: true },
  submit: { hidden: true },
}

/**
 * TS类型断言：
 *    定义对象，其中的键为字符串，值为任意类型
 *    便于快速配置（form对象有很多key value）
 * */
let form = ref<Record<string, any>>({
  name: '',
  nickName: '',
  age: null,
  gender: '',
  likeBook: '',
  whichDay: null,
  workContent: '',
  carOrEat: ''
})

interface MyFormType {
  clickBtn: (btnName: string, btnObj?: object) => void;
}
const MyFormRef = ref<MyFormType>();

</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
}

li {
  margin: 6px 24px;
  font-weight: 600;
}

button {
  margin: 0 6px;
}
</style>
