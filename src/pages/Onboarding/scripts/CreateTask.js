import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Tasks } from "../composables/TodoList.js";
import { useQuasar, date } from "quasar";

export default {
  components: {},

  setup() {
    const route = useRoute();
    const router = useRouter();

    // the id to be assigned to the next todo item
    let currentId = computed(() => {
      return Tasks.value.length;
    });

    // Track task title input state
    const taskTitle = ref(null);

    // Get current Date
    const timeStamp = Date.now();
    const dateCreated = date.formatDate(timeStamp, "MMMM DD, YYYY");

    // holds the list of task/todo items to be created for a Task
    let taskList = ref([
      { id: null, taskDesc: null, time: "00:00", isCompleted: false },
    ]);

    // When editing task, this will temporarily hold the original value
    let currentTitle = null;
    let currentTaskItems = [];

    // If editing a task, the values of the task is displayed in the form
    if (route.params.id) {
      currentTitle = Tasks.value[route.params.id].taskTitle.value;
      currentTaskItems = Tasks.value[route.params.id].taskItems.value;

      taskTitle.value = Tasks.value[route.params.id].taskTitle;
      taskList.value = Tasks.value[route.params.id].taskItems;
    }

    // get the current number of task/todo items added in the tasks list
    let currentLength = computed(() => {
      return taskList.value.length;
    });

    // called when plus button is clicked in the task form
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
          // assign id to the inserted item
          taskList.value[index].id = `${currentId.value}-${index}`;

          // Render a new form card for adding a new task/todo item
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
    // removes the task/todo item added in the form card
    const removeKeyResult = (index) => {
      if (index > -1) {
        taskList.value.splice(index, 1);
      }
    };

    // Saving the Task
    const onSubmit = () => {
      if (!route.params.id) {
        Tasks.value.push({
          id: currentId.value,
          taskTitle: taskTitle.value,
          dateCreated: dateCreated,
          taskItems: taskList,
        });
      } else {
        Tasks.value[route.params.id].taskTitle = taskTitle.value;
        Tasks.value[route.params.id].taskItems = taskList.value;
      }

      router.push("/onboarding/menu/todo-list");
    };

    // Get the original values when updates are made in the form but were cancelled
    const cancelEdit = () => {
      Tasks.value[route.params.id].taskTitle.value = currentTitle;
      Tasks.value[route.params.id].taskItems.value = currentTaskItems;
      router.push("/onboarding/menu/todo-list");
    };

    return {
      currentId,
      onSubmit,
      router,
      currentLength,
      taskTitle,
      dateCreated,
      taskList,
      Tasks,
      cancelEdit,
      addKeyResult,
      removeKeyResult,
    };
  },
};
