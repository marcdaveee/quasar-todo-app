import Filters from "../components/Filters.vue";
import TaskBoard from "../components/TaskBoard.vue";
import MainDialog from "../../../components/MainDialog.vue";
import DeleteConfirmation from "../components/DeleteConfirmation.vue";
import { ToggleMainDialogState } from "../../../composables/Triggers.js";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
// import {
//   Tasks,
//   FetchTasks,
//   FetchTodo,
//   FetchTasksWithTodos,
//   SetTasks,
//   GetTasks,
//   TaskDelete,
// } from "../composables/TodoList.js";

import {
  Tasks,
  FetchTasksWithTodos,
  AddTask,
  TaskToDelete,
  UpdateTodo,
  UpdateTaskState,
} from "../composables/TodoList.js";

export default {
  components: {
    Filters,
    TaskBoard,
    MainDialog,
    DeleteConfirmation,
  },

  setup() {
    // let taskList = ref([]);

    // Fetch Tasks
    onBeforeMount(async () => {
      await FetchTasksWithTodos();
    });

    // Filter Todos that are in-process
    const inProcessTodos = (todos) => {
      const filteredTodos = todos.filter((todo) => {
        return todo.isCompleted == false;
      });

      return filteredTodos;
    };

    // Filter Todos that are finished
    const finishedTodos = (todos) => {
      const filteredTodos = todos.filter((todo) => {
        return todo.isCompleted == true;
      });

      return filteredTodos;
    };

    // watch for any new added todos
    // const $q = useQuasar();

    // watch(Tasks, (newCountTasks, oldCountTasks) => {
    //   if (newCountTasks.length > oldCountTasks.length) {
    //     $q.notify({
    //       position: "bottom-right",
    //       classes: "onboarding-success-notif q-px-lg q-pt-none q-pb-none",
    //       color: "accent-0",
    //       message: "Successfully Completed Task!",
    //       caption: "New To-do List  has been  Added successfully!",
    //     });
    //     console.log("new todos added!");
    //     console.log(Tasks.value.taskTitle);
    //   }
    // });

    const deleteTask = (id) => {
      // ORNumberDetails.value = id;
      console.log("id to delete: ", id);
      TaskToDelete.value = id;
      ToggleMainDialogState();
    };

    const expandItem = async (id) => {
      const taskIndex = Tasks.value.findIndex((task) => task.id == id);
      Tasks.value[taskIndex].isExpanded = !Tasks.value[taskIndex].isExpanded;

      await UpdateTaskState(Tasks.value[taskIndex]);
    };

    // watch(Todos.value.taskItems, (todos) => {
    //   $q.notify({
    //     position: $q.screen.width < 767 ? "top" : "bottom-right",
    //     classes: "onboarding-success-notif q-px-lg q-pt-none q-pb-none",
    //     html: true,
    //     message: `${
    //       todos == true
    //     }<div class="text-bold onboarding-text-secondary">Successfully Completed Task!</div> <div class=""> To-do List  has been  Added to Done section  successfully!</div>`,
    //   });
    // });

    // watch(Todos.value.taskItems, (todos) => {
    //   $q.notify({
    //     position: $q.screen.width < 767 ? "top" : "bottom-right",
    //     classes: "onboarding-success-notif q-px-lg q-pt-none q-pb-none",
    //     html: true,
    //     message: `${
    //       todos == false
    //     }<div class="text-bold">Successfully Completed Task!</div> <div class=""> To-do List  has been  Added to Done section  successfully!</div>`,
    //   });
    // });

    // Computed Refs
    // todos that are currently in process
    // const inProcessTodos = computed(() => {
    //   return Todos.value.taskItems.filter((todo) => !todo.isCompleted);
    // });

    // todos that are done
    // const finishedTodos = computed(() => {
    //   return Todos.value.taskItems.filter((todo) => todo.isCompleted);
    // });

    return {
      Filters,
      Tasks,
      deleteTask,
      expandItem,
      inProcessTodos,
      finishedTodos,
    };
  },
};
