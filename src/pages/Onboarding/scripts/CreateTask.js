import { computed, ref } from "vue";
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

    const timeStamp = Date.now();
    const dateCreated = date.formatDate(timeStamp, "MMMM DD, YYYY");

    // const dateCreated = ref(formattedString);

    const taskItems = ref(null);

    // holds the list of task items
    let taskList = ref([
      { id: null, taskDesc: null, time: "00:00", isCompleted: false },
    ]);

    if (route.params.id) {
      console.log(route.params.id);
      taskTitle.value = Todos.value[route.params.id].taskTitle;
      taskList.value = Todos.value[route.params.id].taskItems;
    }

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
        Todos.value.push({
          id: currentId.value,
          taskTitle: taskTitle.value,
          dateCreated: dateCreated,
          taskItems: taskList,
        });
      }

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
      Todos,
      addKeyResult,
      removeKeyResult,
    };
  },
};
