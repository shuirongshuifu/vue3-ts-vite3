<template>
    <el-select v-model="form[attr.prop]" v-bind="mergeAttr">
        <el-option v-for="item in optionsData" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script lang="ts" setup>
import { cloneDeep } from "lodash";
import { ref, computed, watch } from "vue";
defineOptions({
    name: 'MySelect',
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
        size: 'default',
        clearable: true
    }
    return { ...defaultAttr, ...props.attr }
})

let optionsData: any = ref([])

watch(props.attr.attr, (newVal) => {
    const { options, api, cb } = newVal
    if (options) {
        optionsData.value = cloneDeep(options)
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
</script>