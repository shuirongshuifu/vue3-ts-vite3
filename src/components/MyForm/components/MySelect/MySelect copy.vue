<template>
    <el-select v-model="form[attr.prop]" v-bind="mergeAttr">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>

<script lang="ts" setup>
import { reactive, computed, watch, watchEffect } from "vue";
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

const options: any = reactive([])

watchEffect(() => {
    let { options, optionsApi, cb } = props.attr.attr

    if (options) {
        console.log('???', options.value);

        options.value = options
    }
    // if (optionsApi) {
    //     let result = await optionsApi()
    //     options.value = cb ? cb(result) : result
    // }
});

// watch(props.attr.attr, (newVal) => {
//     let { options, optionsApi, cb } = newVal
//     console.log(666, options, optionsApi, cb);

//     // if (options) {
//     //     options.value = options
//     // }
//     // if (optionsApi) {
//     //     optionsApi().then((val: any) => {
//     //         console.log(147, val);
//     //     })
//     //     // options.value = cb(result)
//     // }
// }, { deep: true, immediate: true })



const computedOptions: any = computed(async () => {
    return [
        {
            label: '周六',
            value: 6
        },
        {
            label: '周日',
            value: 7
        },
    ]

})
</script>