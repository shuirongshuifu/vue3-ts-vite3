<template>
  <el-form :model="form" label-width="auto">
    <el-row>
      <el-col class="setElCol" :span="item.span" v-for="(item, index) in conf">
        <el-form-item v-if="!item.hidden" style="width: 100%;" :label="item.label">
          <component :is="item.type" :form="form" :attr="item.attr">
          </component>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import MyInput from "./components/MyInput/MyInput.vue";
import MyInputNumber from "./components/MyInputNumber/MyInputNumber.vue";
import MyRadio from "./components/MyRadio/MyRadio.vue";
import MyRate from "./components/MyRate/MyRate.vue";
import MySelect from "./components/MySelect/MySelect.vue";

defineOptions({
  name: 'MyForm',
  components: { MyInput, MyInputNumber, MyRadio, MyRate, MySelect }
})

interface ConfItem {
  [key: string]: any;
}

defineProps({
  conf: {
    type: Array as () => ConfItem[],
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
});
</script>

<style>
.setElCol {
  display: flex;
  align-items: center;
}

.el-form-item__label-wrap {
  align-items: center;
}
</style>