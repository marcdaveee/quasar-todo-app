import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Todos } from "../composables/Todos.js";
import { date } from "quasar";

export default {
  components: {},

  setup() {
    const route = useRoute();
    const router = useRouter();

    // the id to be assigned to the next todo item
    let currentId = computed(() => {
      return Todos.value.length;
    });

    // Track task title input state
    const taskTitle = ref(null);

    let taskForm = ref({
      taskTitle: null,
      dateCreated: null,
      taskItems: [null],
    });

    const timeStamp = Date.now();
    const dateCreated = date.formatDate(timeStamp, "MMMM DD, YYYY");

    // holds the list of task items to be created
    let taskList = ref([
      { id: null, taskDesc: null, time: "00:00", isCompleted: false },
    ]);

    // When editing task, this will temporarily hold the original value
    let currentTitle = null;
    let currentTaskItems = [];

    if (route.params.id) {
      console.log(route.params.id);
      // toEditTask.value = {
      //   toEditTaskTitle: Todos.value[route.params.id].taskTitle,
      //   toEditTaskList: Todos.value[route.params.id].taskItems,
      // };

      watch(Todos, (newTodo, oldTodo) => {});

      currentTitle = Todos.value[route.params.id].taskTitle;
      currentTaskItems = Todos.value[route.params.id].taskItems;

      taskTitle.value = Todos.value[route.params.id].taskTitle;
      taskList.value = Todos.value[route.params.id].taskItems;
    }

    // Return task details when user is editting task
    // let taskDetails = computed(() => {
    //   if (route.params.id) {
    //     return toEditTask.value;
    //   } else {
    //     return taskForm.value;
    //   }
    // });

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
          // assign id to the inserted item
          taskList.value[index].id = `${currentId.value}-${index}`;

          // Render new form card for adding new task input
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

    // Saving New Added task
    const onSubmit = () => {
      if (!route.params.id) {
        console.log("No route params present");
        Todos.value.push({
          id: currentId.value,
          taskTitle: taskTitle.value,
          dateCreated: dateCreated,
          taskItems: taskList,
        });
      } else {
        console.log("Route params present");
      }

      router.push("/onboarding/menu/todo-list");
    };

    // Get the original values when updates are made in the form but not saved
    const cancelEdit = () => {
      Todos.value[route.params.id].taskTitle = currentTitle;
      Todos.value[route.params.id].taskItems = currentTaskItems;
      router.push("/onboarding/menu/todo-list");
    };

    return {
      currentId,
      onSubmit,
      taskForm,
      router,
      currentLength,
      taskTitle,
      dateCreated,
      taskList,
      Todos,
      cancelEdit,
      addKeyResult,
      removeKeyResult,
    };
  },
};
