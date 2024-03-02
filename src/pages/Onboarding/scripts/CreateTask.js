import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar, date } from "quasar";
import {
  Tasks,
  FetchTasks,
  FetchTodo,
  FetchTasksWithTodos,
  AddTask,
  AddTodos,
  SetTasks,
  GetTasks,
  TaskDelete,
} from "../composables/TodoList.js";

export default {
  components: {},

  setup() {
    const route = useRoute();
    const router = useRouter();

    // Get current Date
    const timeStamp = Date.now();
    const dateCreated = date.formatDate(timeStamp, "MMMM DD, YYYY");

    const taskForm = ref({
      taskTitle: null,
      dateCreated: dateCreated,
      taskList: [
        { taskDesc: null, time: "00:00", isCompleted: false, taskId: null },
      ],
    });

    // the id to be assigned to the next todo item
    let currentId = computed(() => {
      return Tasks.value.length;
    });

    // Track task title input state
    const taskTitle = ref(null);

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
      return taskForm.value.taskList.length;
    });

    // called when plus button is clicked in the task form
    // A new form card will only appear if the current card has input
    const addKeyResult = (index) => {
      if (index < 0) {
        taskForm.value.taskList.push({
          // id: null,
          taskDesc: null,
          time: "00:00",
          isCompleted: false,
          taskId: null,
        });
      } else {
        console.log(taskForm.value.taskList[0].taskDesc);
        if (taskForm.value.taskList[index].taskDesc) {
          // assign id to the inserted item
          // taskList.value[index].id = `${currentId.value}-${index}`;

          // Render a new form card for adding a new task/todo item
          taskForm.value.taskList.push({
            // id: null,
            taskDesc: null,
            time: "00:00",
            isCompleted: false,
            taskId: null,
          });
        }
      }
    };

    // called when delete button in the form card is clicked
    // removes the task/todo item added in the form card
    const removeKeyResult = (index) => {
      if (index > -1) {
        taskForm.value.taskList.splice(index, 1);
      }
    };

    // Saving the Task
    const onSubmit = async () => {
      if (!route.params.id) {
        // Task.value.push(taskForm.value);

        // Tasks.value.push(newTask);

        // const taskToAdd = taskForm.value;
        // Post Task
        await AddTask(taskForm.value);
        // Post Todos
        //

        // Todo: AddTodo(), Fetch Task

        // Tasks.value.push({
        //   id: currentId.value,
        //   taskTitle: taskTitle.value,
        //   dateCreated: dateCreated,
        //   taskItems: taskList,
        // });
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
      taskForm,
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
