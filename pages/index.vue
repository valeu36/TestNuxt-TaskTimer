<template>
  <v-layout
    column
    justify-center
    align-center
  >
      <Timer />

      <TaskTable />

  </v-layout>
</template>

<script>
import Timer from '~/components/Timer/Timer.vue';
import TaskTable from '~/components/TaskTable/TaskTable.vue';
import axios from 'axios'

export default {
  components: {
      Timer,
      TaskTable
  },
  async asyncData(context) {
    const timeSpentArray = await axios
      .get('https://tasktimervue.firebaseio.com/timeSpentArray.json');

    const tableContent = await axios
      .get('https://tasktimervue.firebaseio.com/data.json');

    if (!timeSpentArray.data) {
      context.store.commit('setTimeSpentArray', []);
    } else {
      context.store.commit('setTimeSpentArray', timeSpentArray.data);
    }

    if (!tableContent.data) {
      context.store.commit('setTableContent', []);
    } else {
      context.store.commit('setTableContent', tableContent.data);
    }


    console.log(context.store.getters.tableContent);
    console.log(context.store.getters.timeSpentArray);

    return {timeSpentArray: timeSpentArray.data ? timeSpentArray.data
        : [] , tableContent: tableContent.data ? tableContent.data : []};
  },
}
</script>
