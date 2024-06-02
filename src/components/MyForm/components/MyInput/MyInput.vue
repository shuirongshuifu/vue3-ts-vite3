<template>
    <el-input @input="(params: string | number) => { evFn(params, 'input') }"
        @clear="(params: string | number) => { evFn(params, 'clear') }" v-model.trim="form[attr.prop]"
        v-bind="mergeAttr">
        <template v-slot:[slotName.split(':')[1]] v-for="(_, slotName) in filterSlots">
            <slot :name="slotName"></slot>
        </template>
    </el-input>
</template>

<script lang="ts" setup>
import { computed, inject, watch, defineSlots } from "vue";

defineOptions({
    name: 'MyInput',
})

const slots = defineSlots();

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

// 考虑提取出来做hook
const filterSlots = Object.entries(slots).reduce((acc, [slotName, slotContent]) => {
    if (slotName.includes(props.attr.prop)) {
        acc[slotName] = slotContent;
    }
    return acc;
}, {} as Record<string, any>)
console.log('filterSlots', filterSlots);
</script>