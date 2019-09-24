<template>
	<v-container class="d-flex flex-column align-center">

<!--		<input-modal v-if="showModal" @close="showModal = false" />-->

			<v-text-field
        class="timer-input"
				type="text"
				placeholder="Task name"
				v-model="taskName"
				@keyup.enter="toggleTask"
			/>
			<Clock :startIsClicked="isStartClicked" :difference="difference"></Clock>
			<v-btn
        class="timer-button my-5"
				type="button"
				@click="toggleTask"
			>{{isStartClicked ? 'STOP' : 'START'}}</v-btn>

    </v-container>
</template>

<script>
import Clock from '~/components/Timer/Clock/Clock.vue';
import moment from 'moment';
import { EventBus } from '~/eventbus/eventbus';
// import InputModal from '../Modals/InputModal/InputModal';
import axios from 'axios';

export default {
	data() {
		return {
			isStartClicked: false,
			taskName: '',
			timeStart: '',
			timeEnd: '',
			timeSpent: '',
			startPoint: 0,
			endPoint: 0,
			showModal: false,
			difference: 0,
		};
	},
	components: {
		Clock
	},
	methods: {
		toggleTask() {
			this.isStartClicked = !this.isStartClicked;
			if (this.isStartClicked) {
				this.start();
			} else {
				this.stop();
			}
		},
		start() {
			this.startPoint = moment();
			this.timeStart = this.startPoint.format('HH:mm:ss');
			this.formatTime();
			this.sendData([this.isStartClicked, this.timeStart]);
		},
		stop() {
			if (!this.taskName) {
				this.showModal = true;
				this.isStartClicked = true;
			} else {
				this.endPoint = moment();
				this.timeEnd = this.endPoint.format('HH:mm:ss');
				const milliseconds = this.calculateTimeSpent(
					this.timeStart,
					this.timeEnd
        );
        // this.nullCheck();
				this.$store.commit('pushIntoTableContent', [
					this.taskName,
					this.timeStart,
					this.timeEnd,
          this.timeSpent
          ]
        );
        EventBus.$emit('stopWasClicked', milliseconds);
				this.sendData([this.isStartClicked, null]);
				this.difference = 0;
				// this.tableContent = [];
				this.taskName = '';
			}
		},
		calculateTimeSpent(start, end) {
			const difference = moment(end, 'HH:mm:ss').diff(moment(start, 'HH:mm:ss'));
			this.timeSpent = moment('000000', 'HH:mm:ss')
				.milliseconds(difference)
				.format('HH:mm:ss');
			return difference;
		},
		formatTime() {
			const milliseconds = moment(moment(), 'HH:mm:ss').diff(
				moment(this.timeStart, 'HH:mm:ss')
			);
			this.difference = moment.duration(milliseconds);
		},
		sendData(data) {
			axios
				.put(`https://tasktimervue.firebaseio.com/isStartClicked.json`, data)
				.then((response) => {
					console.log(response);
				})
				.catch((onerror) => {
					console.log(onerror);
				});
		},
		getData() {
			axios
				.get(`https://tasktimervue.firebaseio.com/isStartClicked.json`)
				.then((response) => {
					return response;
				})
				.then((data) => {
					this.isStartClicked = data.data[0];
					this.timeStart = data.data[1];
					this.formatTime();
				});
    },
	},
	mounted() {
		this.getData();
	},
};
</script>

<style scoped>

@media only screen and (max-width: 480px) {
  .timer-input {
    width: 100%;
  }

  .timer-button {
    width: 30%;
}
}

@media only screen and (min-width: 960px){
.timer-input {
  width: 20%;
}

.timer-button {
  width: 10%;
}

}
</style>
