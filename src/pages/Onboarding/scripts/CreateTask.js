import { computed, ref } from "vue";

export default {
  components: {},

  setup() {
    let id = ref(4);
    const taskName = ref(null);
    let time = ref("00:00");
    const isCompleted = ref(false);

    const taskTitle = ref(null);

    let taskList = ref([
      {
        id: null,
        taskDesc: null,
        time: null,
        isCompleted: false,
      },
    ]);

    const addKeyResult = () => {
      taskList.value.push({
        tasks: [],
      });
    };
    const removeKeyResult = (index) => {
      if (index > -1) {
        taskList.value.splice(index, 1);
      }
    };

    return {
      id,
      taskName,
      time,
      isCompleted,
      taskList,
      addKeyResult,
      removeKeyResult,
    };
  },
};
