<template>
    <div class="rules-wrapper">
        <div 
            v-for="rule in data"
            :key="rule.key"
            class="rule-wrapper"
        >
            <div class="rule">
                <Select
                    v-model="rule.metric"
                    placeholder="请选择指标"
                    class="metric"
                >
                    <Option
                        v-for="opt in metricOptions"
                        :key="opt.value"
                        :label="opt.label"
                        :value="opt.value"
                    ></Option>
                </Select>
                <Select
                    v-model="rule.operator"
                    placeholder="请选择运算符"
                    class="operator"
                >
                    <Option
                        v-for="opt in operatorOptions"
                        :key="opt.value"
                        :label="opt.label"
                        :value="opt.value"
                    ></Option>
                </Select>
                <Input 
                    v-model="rule.value"
                    placeholder="请输入目标值"
                    class="value"
                />
            </div>
            <Button
                type="text"
                @click="onDelete(rule.key)"
            >✕</Button>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue';
import { Button, Form, FormItem, Input, Select, Option } from '@ks/kwai-ui';
import { metricOptions, operatorOptions } from '../mock';

const props = defineProps<{
    value: any[]
}>();
const emits = defineEmits(['change']);

const data = ref(props.value || []);

const onDelete = (key: number) => {
    let targetIdx;
    data.value.forEach((item: any, idx: number) => {
        (item.key === key) && (targetIdx = idx);
    });
    if (targetIdx !== undefined){
        data.value.splice(targetIdx, 1);
        emits('change', data.value);
    } else {
        console.log('删除规则出错 >>> 未找到规则索引');
    }
};

watch(() => props.value, val => {
    data.value = val;
}, { deep: true });
</script>

<style scoped lang="less">
.rules-wrapper{
    width: 600px;
    .rule-wrapper{
        // border: red solid 1px;
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        .rule{
            width: 540px;
            display: flex;
            align-items: center;
            .metric{
                ::v-deep(.ks-input__inner){
                    width: 200px !important;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }
            }
            .value{
                ::v-deep(.ks-input__inner){
                    width: 160px !important;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
            .operator{
                ::v-deep(.ks-input__inner){
                    width: 140px !important;
                    border-radius: 0;
                    border-left: none;
                    border-right: none;
                }
            }
        }
    }
}

</style>
  