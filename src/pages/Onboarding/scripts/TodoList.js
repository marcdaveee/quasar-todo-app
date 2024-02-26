import Filters from "../components/Filters.vue";
import TaskBoard from "../components/TaskBoard.vue";
import { computed, ref } from "vue";
import { Todos } from "../composables/Todos.js";

export default {
  components: {
    Filters,
    TaskBoard,
  },

  setup() {
    // let Todos = ref([
    //   {
    //     id: 1,
    //     text: "Read Book",
    //     isCompleted: false,
    //   },
    //   {
    //     id: 2,
    //     text: "Learn Quasar",
    //     isCompleted: false,
    //   },
    //   {
    //     id: 3,
    //     text: "Take out trash",
    //     isCompleted: true,
    //   },
    // ]);

    // Computed Refs
    // todos that are currently in process
    const inProcessTodos = computed(() => {
      return Todos.value.filter((todo) => !todo.isCompleted);
    });

    // todos that are done
    const finishedTodos = computed(() => {
      return Todos.value.filter((todo) => todo.isCompleted);
    });

    return {
      Filters,
      Todos,
      inProcessTodos,
      finishedTodos,
    };
  },
};
