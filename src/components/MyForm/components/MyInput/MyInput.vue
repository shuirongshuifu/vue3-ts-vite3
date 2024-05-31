<template>
    <el-input @input="(params: string | number) => { evFn(params, 'input') }"
        @clear="(params: string | number) => { evFn(params, 'clear') }" v-model.trim="form[attr.prop]"
        v-bind="mergeAttr" />
</template>

<script lang="ts" setup>
import { computed, inject, watch } from "vue";
defineOptions({
    name: 'MyInput',
})

const cb = inject('eventCallBack') as (params: { [key: string]: any }) => void;

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
        clearable: true,
        size: 'default'
    }
    return { ...defaultAttr, ...props.attr }
})

const evFn = (val: string | number, eventName: string) => {
    const ev = {
        componentName: 'MyInput',
        eventName: eventName,
        propName: props.attr.prop,
        propValue: val,
    }
    cb(ev)
}
</script>