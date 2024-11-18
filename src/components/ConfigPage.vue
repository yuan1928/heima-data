<template>
  <Form
    ref="formRef"
    :model="data"
    label-width="80px"
    label-position="left"
    class="config-form"
  >
    <FormItem
      v-for="item in formItems" 
      :label="item.label"
      :prop="item.prop" 
      :rules="item.rules"
    >
      <Input
        v-if="item.type === 'input'" 
        v-model="data[item.prop]"
        :placeholder="item.placeholder"
        class="form-item-input"
      />
      <Select
        v-else-if="item.type === 'select'"  
        v-model="data[item.prop]"
        :placeholder="item.placeholder"
        class="form-item-select"
      >
        <Option
          v-for="opt in (item.options || [])"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        ></Option>
      </Select>
      <div
        v-else-if="item.type === 'rules'"  
      >
        <Rule
          :value="data.rules"
          @change="onRuleChange"
        ></Rule>
        <Button
          type="text"
          @click="onAddRule"
        >
          +添加目标
        </Button>
      </div>
    </FormItem>
  </Form>
  <div class="btns">
    <Button @click="onCancel">取消</Button>
    <Button
      type="primary"
      @click="onConfirm"
    >保存</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button, Form, FormItem, Input, Select, Option } from '@ks/kwai-ui';
import Rule from './Rule.vue';
import { crowdOptions, metricOptions, operatorOptions, tableData } from '../mock';
import { useRouter } from 'vue-router';

// defineProps<{ msg: string }>()
const formItems = [
  {
    label: '标签名称',
    prop: 'name',
    placeholder: '请输入标签名称',
    type: 'input',
    rules: [
      { required: true, message: '请输入标签名称', trigger: 'blur' },
    ]
  },
  {
    label: '人群ID',
    prop: 'id',
    placeholder: '请选择人群ID',
    type: 'select',
    options: crowdOptions,
    rules: [
      { required: true, message: '请选择人群ID', trigger: 'blur' },
    ]
  },
  {
    label: '计算规则',
    prop: 'rules',
    type: 'rules',
    rules: [
      { required: true, message: '请添加至少一条规则', trigger: 'blur' },
    ]
  },
]

const router = useRouter();
const formRef=ref();
const data: {[k: string]: any} = ref({
  name: '', // 标签名称
  id: '', // 人群ID
  rules: [] as any[]
});
let ruleKey = 0;

const onAddRule = () => {
  data.value.rules.push({
    key: ruleKey++
  });
};

const onRuleChange = (newRules: any[]) => {
  data.value.rules = newRules;
};

const onConfirm = async () => {
  const res = await formRef.value.validate();
  // console.log('validate', res);
  console.log('form', data.value);
  const { name, id, rules } = data.value;
  const newTableData = [
    ...tableData,
    {
        id: 2,
        label: name,
        status: 1,
        opt: ['VIEW'], // 操作: VIEW-查看结果
        summary: {
            id: 2,
            label: name,
            crowdLabel: id,
            rulesLabel: rules.map(({ metric, operator, value }) => {
              const metricLabel = metricOptions.find(opt => opt.value === metric)?.label;
              const operatorLabel = operatorOptions.find(opt => opt.value === operator)?.label;
              return `${metricLabel}${operatorLabel}${value}`;
            }).join(' 且 '),
            tableCols: [
                {
                    prop: 'combinationLabel',
                    label: '标签组合'
                },
                {
                    prop: 'scale',
                    label: '规模'
                },
                ...rules.map(({ metric }) => {
                  const metricLabel = metricOptions.find(opt => opt.value === metric)?.label;
                  return {
                    prop: metric,
                    label: metricLabel
                  };
                })
            ],
            tableData: [
                {
                    combinationLabel: '性别：男 且 年龄：18～24',
                    scale: '200000',
                },
                {
                    combinationLabel: '兴趣：二次元',
                    scale: '500000',
                }
            ]
        }
    },
  ];
  rules.forEach(({ metric, value }) => {
    newTableData[2].summary.tableData.forEach(row => row[metric] = value);
  });
  router.push({ name: 'ListPage', state: { list: newTableData } });
};

const onCancel = () => {
  router.push({ name: 'ListPage' });
};
</script>

<style scoped lang="less">
.config-form{
  .form-item-input, .form-item-select{
    width: 500px !important;
  }
}
.btns{
  display: flex;
  margin-left: calc(580px - 144px);
}
</style>
