<template>
    <el-input v-model.trim="form[attr.prop]" v-bind="mergeAttr" />
</template>

<script lang="ts" setup>
import { computed } from "vue";
defineOptions({
    name: 'MyInput',
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
        clearable: true,
        size: 'default'
    }
    return { ...defaultAttr, ...props.attr }
})
</script>