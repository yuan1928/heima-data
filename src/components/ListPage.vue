<template>
  <Button
    type="primary"
    :style="{ marginBottom: '10px' }" 
    @click="() => {
      router.push({ name: 'ConfigPage' });
    }"
  >新建标签发现</Button>
  <Table
    :data="data"
  >
    <TableColumn
      v-for="col in columns"
      :key="col.prop"
      :prop="col.prop"
      :label="col.label"
    ></TableColumn>
    <TableColumn
      prop="opt"
      label="操作"
    >
      <template #default="scope">
        <div>
          <Button 
            :disabled="!!!scope?.row?.opt?.includes('VIEW')"
            type="text"
            @click="onView(scope.row.summary, scope.row.id)"
          >查看结果</Button>
        </div>
      </template>
    </TableColumn>
  </Table>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { Button, TableColumn, Table } from '@ks/kwai-ui';
import { tableData } from '../mock';
import { useRouter, useRoute } from 'vue-router';

// defineProps<{ msg: string }>()
const columns = [
  {
    prop: 'id',
    label: 'id'
  },
  {
    prop: 'label',
    label: '名称'
  },
  {
    prop: 'statusLabel',
    label: '状态'
  },
];

const statusDict: { [k: string]: any } = {
  '0': '计算中',
  '1': '计算完成'
};

const data = ref([] as any[]);
const router = useRouter();
const route = useRoute();

const onView = (summary: any, id: number) => {
  router.push({
    name: 'SummaryPage',
    state: { summary: JSON.stringify(summary) }
  });
};

onBeforeMount(() => {
  let curData = window.history.state.list || tableData;
  curData.forEach((row: any) => {row.statusLabel = statusDict[row.status]});
  data.value = curData;
});

</script>

<style scoped lang="less">
</style>
