import Filters from "../components/Filters.vue";
import TaskBoard from "../components/TaskBoard.vue";
import MainDialog from "../../../components/MainDialog.vue";
import DeleteConfirmation from "../components/DeleteConfirmation.vue";
import { ToggleMainDialogState } from "../../../composables/Triggers.js";
import { computed, ref, watch } from "vue";
import { useQuasar } from "quasar";
import {
  Tasks,
  SetTasks,
  GetTasks,
  FetchTasks,
  TaskDelete,
} from "../composables/TodoList.js";

export default {
  components: {
    Filters,
    TaskBoard,
    MainDialog,
    DeleteConfirmation,
  },

  setup() {
    let taskList = ref([]);

    // Fetch Tasks
    // FetchTasks().then((response) => {
    //   taskList.value = GetTasks.value;
    // });

    const inProcessTodos = (todos) => {
      const filteredTodos = todos.filter((todo) => {
        return todo.isCompleted == false;
      });

      return filteredTodos;
    };

    const finishedTodos = (todos) => {
      const filteredTodos = todos.filter((todo) => {
        return todo.isCompleted == true;
      });

      return filteredTodos;
    };

    // watch for any new added todos
    const $q = useQuasar();

    watch(Tasks, (newCountTasks, oldCountTasks) => {
      if (newCountTasks.length > oldCountTasks.length) {
        $q.notify({
          position: "bottom-right",
          classes: "onboarding-success-notif q-px-lg q-pt-none q-pb-none",
          color: "accent-0",
          message: "Successfully Completed Task!",
          caption: "New To-do List  has been  Added successfully!",
        });
        console.log("new todos added!");
      }

      console.log("new todos added!");
    });

    const deleteTask = (id) => {
      // ORNumberDetails.value = id;
      console.log("id to delete: ", id);
      TaskDelete.value = id;
      ToggleMainDialogState();
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
      inProcessTodos,
      finishedTodos,
    };
  },
};
