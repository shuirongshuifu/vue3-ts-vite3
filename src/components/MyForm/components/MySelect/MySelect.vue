<template>
    <el-select @change="(params: string | number) => {
        evFn(params, 'change')
    }" v-model="form[attr.prop]" v-bind="mergeAttr">
        <el-option v-for="item in optionsData" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script lang="ts" setup>
import { ref, computed, watch, inject } from "vue";
defineOptions({
    name: 'MySelect',
})

const cb = inject('eventCallBack') as (data: EventData) => void;

const props = defineProps({
    form: {
        type: Object,
        required: true,
    },
    attr: {
        type: Object,
        required: true,
    },
});
const mergeAttr = computed(() => {
    const defaultAttr = {
        size: 'default',
        clearable: true,
        filterable: true
    }
    return { ...defaultAttr, ...props.attr }
})

let optionsData: any = ref([])

watch(props.attr.attr, (newVal) => {
    const { options, api, cb } = newVal
    if (options) {
        optionsData.value = options
    }
    if (api) {
        api().then((val: any) => {
            optionsData.value = cb ? cb(val) : val
        })
    }
}, {
    deep: true,
    immediate: true
})

interface EventData {
  componentName: string;
  eventName: string;
  propName: string;
  propValue: string | number;
}

const evFn = (val: string | number, eventName: string) => {
    const ev: EventData = {
        componentName: 'MySelect',
        eventName: eventName,
        propName: props.attr.prop,
        propValue: val,
    }
    cb(ev)
}
</script>