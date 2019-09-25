<template>
	<v-container v-if="!isLoading">

		<DeleteModal v-if="showModal" @close="showModal = false" @delete="deleteTask" />

  <v-simple-table>
    <template v-slot:default>

			<thead>
				<tr>
					<th
						class="text-left"
						v-for="(header, index) in tableHeaders"
						:key="index"
					>{{header}}</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="tableContent.length">
					<tr class v-for="(content, index) in tableContent" :key="index">
						<td>{{index + 1}}</td>
						<td v-for="(cell, idx) in content" :key="idx">{{cell}}</td>
						<td>
							<v-btn type="button" class="btn btn-light" @click="navigateToTaskCard(index + 1)">INFO</v-btn>
						</td>
						<td>
							<v-btn type="button" class="btn btn-light" @click="setDialog(index)">DELETE</v-btn>
						</td>
					</tr>
					<tr>
						<th colspan="4">Total time spent:</th>
						<td colspan="4" class="font-weight-bold">{{timeSpent}}</td>
					</tr>
				</template>

				<template v-else>
					<tr class="font-weight-bold">
						<td>Tasks Not Found</td>
					</tr>
				</template>
			</tbody>

      </template>
		</v-simple-table>
	</v-container>
</template>

<script>
import { EventBus } from '~/eventbus/eventbus';
import moment from 'moment';
import axios from 'axios';
// import ModalDelete from '../Modals/DeleteModal/DeleteModal';
// import Spinner from '../Spinner/Spinner';
import DeleteModal from '~/components/Modals/DeleteModal/DeleteModal.vue';

const TABLE_HEADERS = [
	'№',
	'Tasks',
	'Time Start',
	'Time End',
	'Time Spend',
	'Info',
	'Delete',
];

export default {
	components: {
		// ModalDelete,
    // Spinner,
    DeleteModal
	},
	data() {
		return {
			tableHeaders: TABLE_HEADERS,
			// tableContent: {
			// 	rowContent: [],
			// },
			timeSpent: '',
			milliseconds: 0,
			showModal: false,
			indexOfDeletedItem: null,
      isLoading: false,
		};
  },
	methods: {
		deleteTask() {
      const tableContent = this.$store.getters.tableContent.filter(
				(element, index) => index !== this.indexOfDeletedItem
			);
			this.$store.commit('setTableContent', tableContent);
			const timeSpentArray = this.$store.getters.timeSpentArray.filter(
				(element, index) => index !== this.indexOfDeletedItem
      );
      this.$store.commit('setTimeSpentArray', timeSpentArray);
			this.updateTime(timeSpentArray, this.millisecond);
			// mby sendData shold be in computed
			this.sendData(tableContent, 'data');
			this.sendData(timeSpentArray, 'timeSpentArray');
			this.indexOfDeletedItem = null;
			this.showModal = false;
		},
		calculateMs(array) {
			return array.reduce((acc, curr) => {
				return acc + curr;
			}, 0);
		},
		convertTime(milliseconds) {
			this.timeSpent = moment('000000', 'HH:mm:ss')
				.milliseconds(milliseconds)
				.format('HH:mm:ss');
		},
		updateTime(array, milliseconds) {
			milliseconds = this.calculateMs(array);
			return this.convertTime(milliseconds);
		},
		setDialog(idx) {
			this.showModal = true;
			this.indexOfDeletedItem = idx;
		},
		sendData(data, name) {
			axios
				.put(`https://tasktimervue.firebaseio.com/${name}.json`, data)
				.then((response) => {
					console.log('data was sent');
				})
				.catch((error) => console.log(error));
		},
		navigateToTaskCard(index) {
			this.$router.push('/taskInfo/' + index);
		},
	},
	mounted() {
    this.updateTime(this.$store.getters.timeSpentArray, this.milliseconds);
    console.log(this.$store.getters.timeSpentArray);
    EventBus.$on('stopWasClicked', (millisecond) => {
			this.$store.commit('pushIntoTimeSpentArray', millisecond);
			this.sendData(this.$store.getters.tableContent, 'data');
			this.sendData(this.$store.getters.timeSpentArray, 'timeSpentArray');
			this.updateTime(this.$store.getters.timeSpentArray, this.milliseconds);
		});
  },
  computed: {
    tableContent() {
      return this.$store.getters.tableContent;
    }
  }
};
</script>


<style scoped>
</style>
