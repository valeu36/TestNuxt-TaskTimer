import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      isStartClicked: false,
      taskName: '',
      timeStart: '',
      timeEnd: '',
      timeSpent: '',
      startPoint: 0,
      endPoint: 0,
      tableContent: [],
      showModal: false,
      difference: 0,
      milliseconds: 0,
      timeSpentArray: []
    },
    mutations: {
      setStartButton(state, isClicked) {
        state.isStartClicked = isClicked;
      },
      setTaskName(state, taskName) {
        state.taskName = taskName;
      },
      setTimeStart(state, timeStart) {
        state.timeStart = timeStart;
      },
      setTimeEnd(state, timeEnd) {
        state.timeEnd = timeEnd;
      },
      setTimeSpent(state, timeSpent) {
        state.timeSpent = timeSpent;
      },
      setStartPoint(state, startPoint) {
        state.startPoint = startPoint;
      },
      setEndPoint(state, ednPoint) {
        state.endPoint = ednPoint;
      },
      setTableContent(state, tableContent) {
          state.tableContent = tableContent;
      },
      setShowModal(state, showModal) {
        state.showModal = showModal;
      },
      setDifference(state, difference) {
        state.difference = difference;
      },
      setMilliseconds(state, milliseconds) {
        state.milliseconds = milliseconds;
      },
      setTimeSpentArray(state, timeSpentArray) {
        state.timeSpentArray = timeSpentArray;
      },
      pushIntoTableContent(state, tableContent) {
        state.tableContent.push(tableContent);
      },
      pushIntoTimeSpentArray(state, timeSpentArray) {
        state.timeSpentArray.push(timeSpentArray);
      }
    },
    actions: {
      setTableContent(vuexContext, tableContent) {
        vuexContext.commit('setTableContent', tableContent);
      },
      setTimeStart(vuexContext, timeStart) {
        vuexContext.commit('setTimeStart', timeStart);
      },
    },
    getters: {
      isStart(state) {
        return state.isStartClicked;
      },
      taskName(state) {
        return state.taskName;
      },
      taskStart(state) {
        return state.taskStart;
      },
      taskEnd(state) {
        return state.taskEnd;
      },
      timeSpent(state) {
        return state.timeSpent;
      },
      tableContent(state) {
        return state.tableContent;
      },
      milliseconds(state) {
        return state.milliseconds;
      },
      timeSpentArray(state) {
        return state.timeSpentArray;
      }
    },
  });
};

export default createStore;
