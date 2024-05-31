<template>
  <h3>el-form组件二次封装——第一部分</h3>
  <ul>
    <li>文本输入框类型</li>
    <li>数字输入框类型</li>
    <li>radio圆点类型</li>
    <li>radio按钮类型</li>
    <li>星星评分类型</li>
    <li>固定数据下拉框类型</li>
  </ul>
  <MyForm :conf="conf" v-model="form" @ev="ev" :formAttr="formAttr" :btns="btns"></MyForm>
  <!-- <button @click="clearFn">清空</button>
  <button @click="setFn">赋值</button> -->
</template>

<script setup lang="ts">
import MyForm from '@/components/MyForm/MyForm.vue'
import { ref, reactive, watch, markRaw } from 'vue'
import { User, UserFilled, ArrowRight, ArrowLeft } from '@element-plus/icons-vue'
import { randomColor, getSelectData, getSelectData2, getSelectDataNeedParams } from "@/utils/myForm";

const conf = reactive([
  {
    type: 'MyInput', // 文本框类型
    label: '姓名', // 表单名
    span: 24, // 控制表单项占据单行空间份数宽度
    hidden: false, // 默认不隐藏，不写也行，默认显示
    attr: { // 饿了么自有属性，对象形式传参，直接写
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
    type: 'MyInput',
    label: '昵称',
    span: 24,
    attr: {
      prop: 'nickName',
      placeholder: '请输入昵称',
      prefixIcon: markRaw(ArrowRight), // 图标组件，不需要响应式监听
      suffixIcon: markRaw(ArrowLeft),
      maxlength: 20,
      showWordLimit: true,
    },
  },
  {
    type: 'MyInputNumber', // 数字输入框类型
    label: '年龄',
    span: 12,
    attr: {
      prop: 'age',
      placeholder: '请输入年龄',
      // style: 'width: 210px;',
      /**
       * 可以直接写行内样式style，如上方，比较灵活。进一步而言
       * 可通过函数的方式进行更灵活的控制样式，比如下方匿名函数
       * */
      style: ((padding) => {
        const color = randomColor()
        return `width: 210px; box-sizing: border-box; padding: ${padding}; background: ${color};`
      })('6px'),
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
      /**
       * radio有两层，那就再加一个attr记录
       * 比如select也有两层，也再加一个attr
       * */
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
    type: 'MyRate', // 评分组件类型
    label: '今天心情如何',
    span: 12,
    hidden: true,
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
    type: 'MySelect', // 固定下拉框数据
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
    type: 'MySelect', // 接口下拉框数据
    label: '工作内容',
    span: 12,
    attr: {
      prop: 'workContent',
      placeholder: '请选择工作内容',
      attr: {
        // 接口函数，直接用不传参
        api: getSelectData,
        // 自定义加工逻辑，比如label value不对应逻辑
        cb: (val: any[]) => {
          return val.map((item) => {
            item['label'] = item.la
            item['value'] = item.va
            return item
          })
        },
      }
    },
  },
  {
    type: 'MySelect', // 接口下拉框数据
    label: '汽车or小吃',
    span: 12,
    attr: {
      prop: 'carOrEat',
      placeholder: '请选择汽车or小吃',
      attr: {
        /**
         * 接口函数，需要传递相应的参数，使用立即执行函数额外传参
         * 注意的下方语法写法，选择周六周日对应汽车小吃
         * */
        api: null
        // api: 
        // (
        //   function (params) {
        //     return function () {
        //       return getSelectDataNeedParams(params)
        //     }
        //   }
        // )('car')
      }
    },
  },
])

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

let btns = {
  cancel: {
    name: '取消(外界传递)',
    style: 'margin-left: 12px;',
    hidden: false,
  },
  selfBtn1: {
    name: '自定义按钮1',
    icon: 'More',
    type: "success",
    hidden: true,
    plain: true,
    cb: (btn: object) => {
      console.log('点击的是自定义按钮', btn);
    }
  },
  selfBtn2: {
    name: '自定义按钮2',
    icon: 'GobletFull',
    type: "success",
    cb: (btn: object) => {
      console.log('点击的是自定义按钮', btn);
    }
  },
}

watch(form.value, (newVal) => {
  console.log('第一层', newVal);
}, { deep: true })

interface EventInfo {
  componentName: string,
  eventName: string,
  propName: string,
  propValue: string | number,
}

const ev = (info: EventInfo) => {
  // 联动控制~姓名清空，昵称也清空
  if (info.propName == 'name' && info.eventName == 'clear') {
    form.value.nickName = ''
  }
  // 联动控制~周六汽车、周日小吃
  if (info.propName == 'whichDay') {
    let carOrEatItem = conf.find((item) => { return item.attr.prop == 'carOrEat' })
    // 非空断言操作
    // carOrEatItem!.attr!.attr!.api = getSelectData2; 
    if (info.propValue == 6) {
      carOrEatItem!.attr!.attr!.api =
        (function (params) {
          return function () {
            return getSelectDataNeedParams(params)
          }
        })('car')
    }
    if (info.propValue == 7) {
      carOrEatItem!.attr!.attr!.api =
        (function (params) {
          return function () {
            return getSelectDataNeedParams(params)
          }
        })('food')
    }
    if (!info.propValue) {
      form.value.carOrEat = ''
    }
  }
}

const formAttr = reactive({
  labelSuffix: ' :',
  rules: {
    nickName: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' },
    ],
  },
  cb: (val: any) => {
    console.log('外层接收', val);
  }
})


const clearFn = () => {
  // form.value = {}
}
const setFn = () => {
  // form.value['age'] = 999
}
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
</style>
