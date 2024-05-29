<template>
  <button @click="clearFn">清空</button>
  <button @click="setFn">赋值</button>
  <h2 style="margin: 24px;">表单组件封装</h2>
  <MyForm :conf="conf" :form="form"></MyForm>
</template>

<script setup lang="ts">
import MyForm from '@/components/MyForm/MyForm.vue'
import { ref, reactive, watch, markRaw } from 'vue'
import { User, UserFilled } from '@element-plus/icons-vue'

function getSelectData() {
  return new Promise((resolve, reject) => {
    // resolve([
    //   { label: '采购', value: 'buy' },
    //   { label: '敲代码', value: 'code' },
    //   { label: '做PTT', value: 'ppt' },
    // ])
    resolve([
      { la: '采购', va: 'buy' },
      { la: '敲代码', va: 'code' },
      { la: '做PTT', va: 'ppt' },
    ])
  })
}

const conf = reactive([
  {
    type: 'MyInput', // 文本框类型
    label: '姓名', // 表单名
    span: 24, // 表单占据一行的空间
    hidden: false, // 默认不隐藏，不写也行，默认显示
    attr: { // 饿了么自由属性
      prop: 'name',
      placeholder: '请输入姓名',
      prefixIcon: markRaw(UserFilled), // 图标组件，不需要响应式监听
      suffixIcon: markRaw(User),
      maxlength: 10,
      showWordLimit: true,
      autofocus: true // 自动聚焦
    },
  },
  {
    type: 'MyInputNumber', // 数字框类型
    label: '年龄',
    span: 12,
    attr: {
      prop: 'age',
      placeholder: '请输入年龄',
      style: 'width: 210px;',
      min: 0,
      max: 200,
      step: 5,
      stepStrictly: true,
    },
  },
  {
    type: 'MyRadio', // radio类型
    label: '性别',
    span: 12,
    attr: {
      prop: 'gender',
      size: 'large',
      // radio有两层，那就再加一个attr记录
      attr: {
        type: 'radio', // radio的圆点类型
        options: [
          {
            label: '男',
            value: '1'
          },
          {
            label: '女',
            value: '2'
          },
        ]
      }
    },
  },
  {
    type: 'MyRadio',
    label: '喜欢的名著',
    span: 12,
    attr: {
      prop: 'likeBook',
      size: 'small',
      fill: 'pink',
      textColor: '#EF2D7F',
      attr: {
        type: 'button', // radio的按钮类型
        options: [
          {
            label: '三国演义',
            value: 'sanguo'
          },
          {
            label: '水浒传',
            value: 'shuihu'
          },
          {
            label: '红楼梦',
            value: 'honglou'
          },
          {
            label: '西游记',
            value: 'xiyou'
          },
        ]
      }
    },
  },
  {
    type: 'MyRate', // 数字框类型
    label: '今天心情如何',
    span: 12,
    attr: {
      prop: 'heart',
      texts: ['不好', '一般', '好', '很好', '特别好'],
      showText: true,
      textColor: '#777',
      clearable: true,
      colors: ['#F56C6C', '#409EFF', '#67C23A']
    },
  },
  {
    type: 'MySelect', // 数字框类型
    label: '周几加班',
    span: 12,
    attr: {
      prop: 'whichDay',
      placeholder: '请选择周几',
      attr: {
        options: [
          {
            label: '周六',
            value: 6
          },
          {
            label: '周日',
            value: 7
          },
        ],
      }
    },
  },
  {
    type: 'MySelect', // 数字框类型
    label: '工作内容',
    span: 12,
    attr: {
      prop: 'workContent',
      placeholder: '请选择工作内容',
      attr: {
        api: getSelectData,
        cb: (val: any[]) => {
          // 自定义加工逻辑
          return val.map((item) => {
            item['label'] = item.la
            item['value'] = item.va
            return item
          })
        },
      }
    },
  },
])

/**
 * TS类型断言：
 *    定义对象，其中的键为字符串，值为任意类型
 *    便于快速配置（form对象有很多key value）
 * */
let form = ref<Record<string, any>>({})

watch(form.value, (newVal) => {
  // console.log('newVal', newVal);
}, { deep: true })

const clearFn = () => {
  form.value = {}
}
const setFn = () => {
  form.value['age'] = 999
}
</script>
