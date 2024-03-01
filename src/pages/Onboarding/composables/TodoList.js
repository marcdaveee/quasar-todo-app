import { httpGet, httpPost, httpPut, httpDel } from "../../../boot/axios";
import { useQuasar } from "quasar";
import { ref, readonly } from "vue";

import axios from "axios";

let SetTasks = ref();
let GetTasks = readonly(SetTasks);

let Tasks = ref();

const FetchTasks = async () => {
  await axios.get("http://localhost:3000/tasks").then((response) => {
    Tasks.value = response.data;
    console.log(Tasks.value[0].taskTitle);
    console.log(Tasks.value[0].todos);
  });
};

const FetchTasksWithTodos = async () => {
  await axios
    .get("http://localhost:3000/tasks?_embed=todos")
    .then((response) => {
      Tasks.value = response.data;
      console.log(Tasks.value);
    });
};

const FetchTask = async (taskId) => {
  await axios
    .get(`http://localhost:3000/tasks/${taskId}?_embed=todos`)
    .then((response) => {
      return response.data;
    });
};

const FetchTodo = async (id) => {
  await axios.get(`http://localhost:3000/todos/${id}`).then((response) => {
    console.log(response.data);

    return response.data;
  });
};

const AddTask = async (task) => {
  let taskToAdd = { taskTitle: task.taskTitle, dateCreated: task.dateCreated };
  let todosToAdd = [];
  await axios
    .post("http://localhost:3000/tasks", taskToAdd)
    .then((response) => {
      console.log(response.data);
      Tasks.value.push(response.data);
      task.taskList.forEach((todo) => {
        todo.taskId = response.data.id;
        console.log("taskId = ", todo.taskId);
        console.log("todo = ", todo);
        todosToAdd.push(AddTodos(todo));
        // FetchTask(response.data);
      });
      let todoIndex = Tasks.value.findIndex(
        (todo) => todo.id === response.data.taskId
      );
      Tasks.value[todoIndex].todos = todosToAdd;
    });
};

const AddTodos = async (todo) => {
  await axios.post("http://localhost:3000/todos", todo).then((response) => {
    console.log(response.data);
    return response.data;
    // let todoIndex = Tasks.value.findIndex(
    //   (todo) => todo.id === response.data.taskId
    // );
    // console.log("Task Index: ", todoIndex);
    // Tasks.value[todoIndex].todos.push(response.data);
    // console.log(Tasks.value[todoIndex].todos);
  });
};

const UpdateTodo = async (todo) => {
  console.log("triggered");
  await axios
    .patch(`http://localhost:3000/todos/${todo.id}`, {
      isCompleted: todo.isCompleted,
    })
    .then((response) => {
      console.log("Todo status updated: ", response.data);
      if (todo.isCompleted) {
        // ShowNotify(
        //   "Successfully Completed Task!",
        //   "To-do List has been Added to Done section successfully!"
        // );
      } else {
        // ShowNotify(
        //   "Successfully Added Task!",
        //   "To-do List has been Added to In progress section successfully!"
        // );
      }
    });
};

const ShowNotify = (message, caption) => {
  let status = true;
  const $q = useQuasar();
  $q.notify({
    position: $q.screen.width < 767 ? "top" : "bottom-right",
    classes: `${
      status ? "onboarding-success-notif" : "onboarding-error-notif"
    } q-px-lg q-pt-none q-pb-none`,
    html: true,
    message: `<div class="text-bold">${message}</div>`,
    caption: `${caption}`,
  });
};
// const UpdateTodo = async (todoId, todoStatus, todoIndex) => {
//   await axios
//     .patch(`http://localhost:3000/todos/${todoId}`, {
//       isCompleted: todoStatus,
//     })
//     .then((response) => {
//       // Tasks.value.map((task) => {
//       console.log("Current Task ID: ", task.id);
//       console.log("Response ID: ", response.data.id);
//   if (task.id == response.data.taskId) {
//     console.log(task.todos[todoIndex].isCompleted);
//     task.todos[todoIndex].isCompleted = response.data.isCompleted;
//     console.log(task.todos[todoIndex].isCompleted);
//   }
// });
// console.log("Index", todoIndex);
// console.log(Tasks.value.todos[todoIndex].isCompleted);
// Tasks.value.todos[todoIndex].isCompleted = response.data.isCompleted;
// console.log(Tasks.value.todos[todoIndex].isCompleted);
// Tasks.value = Tasks.value.map((task) => {
//   console.log("Current Task ID: ", task.id);
//   console.log("Response ID: ", response.data.id);
//   if (task.id == response.data.taskId) {
//     console.log("Id Matched!");
//     console.log(task.id);
//     task.todos.map((todo) => {
//       if (todo.id == response.data.id) {
//         console.log(todo.isCompleted);
//         todo.isCompleted = todoStatus;
//         console.log(todo.isCompleted);
//         console.log("Updated");
//       }
//     });
//   }
// });
//       console.log(response.data);
//     })
//     .catch((err) => console.log(err));
// };

let TaskDelete = ref(null);

export {
  Tasks,
  FetchTasks,
  FetchTasksWithTodos,
  FetchTodo,
  UpdateTodo,
  FetchTask,
  AddTask,
  SetTasks,
  GetTasks,
  TaskDelete,
};
