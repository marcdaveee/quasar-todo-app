import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Todos } from "../composables/Todos.js";

export default {
  components: {},

  setup() {
    const router = useRouter();

    // the id to be assigned to the next todo item
    let currentId = computed(() => {
      return Todos.value.length;
    });

    // Track task title input state
    const taskTitle = ref(null);

    const taskItem = {};

    // list for adding new tasks
    let taskList = ref([
      { id: null, taskDesc: null, time: "00:00", isCompleted: false },
    ]);

    // get the current number of tasks to be added
    let currentLength = computed(() => {
      return taskList.value.length;
    });

    // called when plus button is clicked
    const addKeyResult = (index) => {
      if (index < 0) {
        taskList.value.push({
          id: null,
          taskDesc: null,
          time: "00:00",
          isCompleted: false,
        });
      } else {
        if (taskList.value[index].taskDesc) {
          taskList.value.push({
            id: null,
            taskDesc: null,
            time: "00:00",
            isCompleted: false,
          });
        }
      }
    };

    // called when delete button in the form card is clicked
    const removeKeyResult = (index) => {
      if (index > -1) {
        taskList.value.splice(index, 1);
      }
    };

    // Saving New Asdded task
    const onSubmit = () => {
      taskList.value.forEach((task, index) => {
        Todos.value.push({
          id: (currentId.value += 1),
          text: taskList.value[index].taskDesc,
          isCompleted: false,
        });
        console.log(currentId.value);
      });

      router.push("/onboarding/menu/todo-list");
    };

    return {
      currentId,
      onSubmit,
      router,
      currentLength,
      taskTitle,
      taskList,
      Todos,
      addKeyResult,
      removeKeyResult,
    };
  },
};
