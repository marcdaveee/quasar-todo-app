import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar, date } from "quasar";
import {
  Tasks,
  AddTask,
  UpdateTask,
  TaskToEdit,
  RemoveTodos,
} from "../composables/TodoList.js";

export default {
  components: {},

  setup() {
    const route = useRoute();
    const router = useRouter();

    // Get current Date
    const timeStamp = Date.now();
    const dateCreated = date.formatDate(timeStamp, "MMMM DD, YYYY");

    // handles form input state
    const taskForm = ref({
      taskTitle: null,
      dateCreated: dateCreated,
      isExpanded: false,
      taskList: [
        { taskDesc: null, time: "00:00", isCompleted: false, taskId: null },
      ],
    });

    // the id to be assigned to the next todo item
    let currentId = computed(() => {
      return Tasks.value.length;
    });

    // If editing a task, the values of the task is displayed in the form
    if (route.params.id) {
      const taskToEditId = Tasks.value.findIndex(
        (task) => task.id == route.params.id
      );

      taskForm.value.taskTitle = Tasks.value[taskToEditId].taskTitle;
      taskForm.value.dateCreated = Tasks.value[taskToEditId].dateCreated;
      taskForm.value.isExpanded = Tasks.value[taskToEditId].isExpanded;
      taskForm.value.taskList = Tasks.value[taskToEditId].todos;
    }

    // get the current number of todo items added in the tasks list
    let currentLength = computed(() => {
      return taskForm.value.taskList.length;
    });

    // called when plus button is clicked in the task form
    // A new form card will only appear if the current form card has input
    const addKeyResult = (index) => {
      if (index < 0) {
        taskForm.value.taskList.push({
          taskDesc: null,
          time: "00:00",
          isCompleted: false,
          taskId: null,
        });
      } else {
        // if task description input is not empty
        if (taskForm.value.taskList[index].taskDesc) {
          // Render a new form card for adding a new task/todo item
          taskForm.value.taskList.push({
            taskDesc: null,
            time: "00:00",
            isCompleted: false,
            taskId: null,
          });
        }
      }
    };

    // Tracks the removed todos during edit
    let todosToRemove = ref([]);

    // called when delete button in the form card is clicked
    const removeKeyResult = (id) => {
      if (route.params.id) {
        taskForm.value.taskList = taskForm.value.taskList.filter((todoItem) => {
          if (todoItem.id !== id && id !== null) {
            return true;
          } else {
            todosToRemove.value.push(id);
            return false;
          }
        });
      } else {
        let index = id;

        if (index > -1) {
          taskForm.value.taskList.splice(index, 1);
        }
      }
    };

    // Saving the Task
    const onSubmit = async () => {
      if (!route.params.id) {
        const taskToAdd = taskForm.value;

        // Post Task to JSON Server
        await AddTask(taskToAdd).then((data) => {
          console.log("Task Added!: ", data);
          ShowNotify(
            "Successfully Added!",
            "New To-do List has been Added successfully"
          );
        });
      } else {
        // the task object to be updated
        const taskToEditID = route.params.id;
        const taskToUpdate = {
          id: taskToEditID,
          taskTitle: taskForm.value.taskTitle,
          dateCreated: taskForm.value.dateCreated,
          isExpanded: taskForm.value.isExpanded,
          todos: taskForm.value.taskList,
        };

        // Update a Task in JSON Server
        await UpdateTask(taskToEditID, taskToUpdate, todosToRemove.value);
        ShowNotify(
          "Successfully Updated!",
          "To-do List has been Updated successfully"
        );

        // Check if there was a removed todo item during edit
        if (todosToRemove.value) {
          // Remove todos from JSON Server/database
          await RemoveTodos(todosToRemove.value);
        }
      }
      // Redirect back to Todo-List Page
      router.push("/onboarding/menu/todo-list");
    };

    // Called when cancel button is triggered
    const cancelEdit = () => {
      router.push("/onboarding/menu/todo-list");
    };

    const $q = useQuasar();

    const ShowNotify = (message, caption) => {
      let status = true;
      $q.notify({
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `${
          status ? "onboarding-success-notif" : "onboarding-error-notif"
        } q-px-lg q-pt-none q-pb-none`,
        html: true,
        message: `<div class="text-bold">${message}</div>`,
        caption: `${caption}`,
        closeBtn: true,
      });
    };

    return {
      taskForm,
      currentId,
      onSubmit,
      router,
      currentLength,
      dateCreated,
      Tasks,
      cancelEdit,
      addKeyResult,
      removeKeyResult,
      RemoveTodos,
      ShowNotify,
      todosToRemove,
    };
  },
};
