<template>
    <el-input-number v-model="form[attr.prop]" v-bind="mergeAttr">
        <template v-slot:[slotName.split(':')[1]] v-for="(_, slotName) in filterSlots">
            <slot :name="slotName"></slot>
        </template>
    </el-input-number>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useHookSlots } from "../hook/index";

defineOptions({
    name: 'MyInputNumber',
})
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
        size: 'default'
    }
    return { ...defaultAttr, ...props.attr }
})
const slots = defineSlots();
const { filterSlots } = useHookSlots(slots, props.attr.prop)
</script>