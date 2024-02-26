import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Todos } from "../composables/Todos.js";
import { date } from "quasar";

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

    const timeStamp = Date.now();
    const dateCreated = date.formatDate(timeStamp, "MMMM DD, YYYY");

    // const dateCreated = ref(formattedString);

    const taskItems = ref(null);

    // holds the list of task items
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
      // taskList.value.forEach((task, index) => {
      //   taskList.value.push({
      //     taskItemId: `${currentId.value}-${index}`,
      //     text: taskList.value[index].taskDesc,
      //     time: taskList.value[index].time,
      //     isCompleted: false,
      //   });
      // });

      Todos.value.push({
        id: currentId.value,
        taskTitle: taskTitle.value,
        dateCreated: dateCreated,
        taskItems: taskList,
      });

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
