<template>
  <div
    v-for="item in items"
    :key="item.key"
    class="item-wrapper"
  >
    <div class="key">{{ item.label }}：</div>
    <div class="value">{{ data[item.key] }}</div>
  </div>
  <div  class="item-wrapper">
    <div class="key">计算明细：</div>
    <div class="value">
      <Table :data="data.tableData">
        <TableColumn
          v-for="col in data.tableCols"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
        ></TableColumn>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { Button, Table, TableColumn } from '@ks/kwai-ui';
import { useRoute } from 'vue-router';

// defineProps<{ msg: string }>()
const items = [
  {
    label: '标签id',
    key: 'id'
  },
  {
    label: '标签名称',
    key: 'label'
  },
  {
    label: '人群名称',
    key: 'crowdLabel'
  },
  {
    label: '计算目标',
    key: 'rulesLabel'
  },
];

const route = useRoute();
const data = ref(JSON.parse(window.history.state.summary));

onBeforeMount(() => {
  console.log(data.value);
});
</script>

<style scoped lang="less">
.item-wrapper{
  display: flex;
  margin: 6px 0;
  width: 100%;
  .key, .value{
    color: #131416;
    font-size: 14px;
  }
  .key{
    width: 80px;
  }
  .value{
    width: calc(100% - 100px);
  }
}
</style>
  