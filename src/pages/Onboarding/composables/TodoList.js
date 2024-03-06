import axios, {
  httpGet,
  httpPost,
  httpPut,
  httpDel,
} from "../../../boot/axios";

import { ref, readonly } from "vue";
import { useQuasar } from "quasar";

// Local store for Tasks
let Tasks = ref([]);

// Fetch Tasks from the JSON Server/Database
const FetchTasksWithTodos = async () => {
  return new Promise((resolve, reject) => {
    httpGet("tasks?_embed=todos", {
      success(response) {
        Tasks.value = response.data;
        Tasks.value.isExpanded = false;
        console.log(Tasks.value);
        resolve(response.data);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

// Post Task to the JSON server
const AddTask = async (task) => {
  let taskToAdd = { taskTitle: task.taskTitle, dateCreated: task.dateCreated };
  let todosToAdd = task.taskList;
  return new Promise((resolve, reject) => {
    httpPost("tasks", taskToAdd, {
      async success(response) {
        taskToAdd.id = response.data.id;

        await AddTodos(todosToAdd, taskToAdd.id);

        resolve(response.data);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

// Post Todos to the JSON server
const AddTodos = async (todos, taskId) => {
  todos.forEach(async (todo) => {
    todo.taskId = taskId;
    return new Promise((resolve, reject) => {
      httpPost("todos", todo, {
        async success(response) {
          todo.id = response.data.id;
          resolve(response.data);
        },
        catch(response) {
          reject(response);
        },
      });
    });
  });
};

// Update todo item's status (in-progress or done) in the JSON Server
const UpdateTodoStatus = async (todo) => {
  return new Promise((resolve, reject) => {
    httpPut(
      `todos/${todo.id}`,
      { ...todo, isCompleted: todo.isCompleted },
      {
        success(response) {
          todo.id = response.data.id;
          resolve(response.data);
        },
        catch(response) {
          reject(response);
        },
      }
    );
  });
};

// Update whether a task item is expanded or not
const UpdateTaskState = (task) => {
  return new Promise((resolve, reject) => {
    httpPut(
      `tasks/${task.id}`,
      {
        id: task.id,
        taskTitle: task.taskTitle,
        dateCreated: task.dateCreated,
        isExpanded: task.isExpanded,
      },
      {
        async success(response) {
          console.log("Updated Task Info: ", response.data);
          resolve(response.data);
        },
        catch(response) {
          reject(response);
        },
      }
    );
  });
};

// Update a Task object in the JSON Server
const UpdateTask = async (taskId, newTaskValue, todosToRemove) => {
  return new Promise((resolve, reject) => {
    httpPut(
      `tasks/${taskId}`,
      {
        id: newTaskValue.id,
        taskTitle: newTaskValue.taskTitle,
        dateCreated: newTaskValue.dateCreated,
        isExpanded: newTaskValue.isExpanded,
      },
      {
        async success(response) {
          console.log("Updated Task Info: ", response.data);
          await UpdateTodos(
            response.data.id,
            newTaskValue.todos,
            todosToRemove
          );
          resolve(response.data);
        },
        catch(response) {
          reject(response);
        },
      }
    );
  });
};

// Update Todos in the JSON Server
const UpdateTodos = async (taskId, updatedTodos, todosToRemove) => {
  return new Promise((resolve, reject) => {
    updatedTodos.forEach(async (newTodo) => {
      if (newTodo.id) {
        await httpPut(`todos/${newTodo.id}`, newTodo, {
          async success(response) {
            resolve(response.data);
          },
          async catch(response) {
            reject(response);
          },
        });
      } else {
        newTodo.taskId = taskId;
        await httpPost("todos", newTodo, {
          async success(response) {
            resolve(response.data);
          },
          async catch(error) {
            reject(error);
          },
        });
      }
    });
  });
};

// Remove todos from the JSON Server
const RemoveTodos = async (todosToRemove) => {
  console.log("Todos to Remove: ", todosToRemove);

  for (const todo of todosToRemove) {
    try {
      console.log("Todo ID to Remove: ", todo);
      await RemoveTodo(todo);
      console.log("Todo was Removed: ", todo);
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  }
};

// Remove a todo object from the JSON Server
const RemoveTodo = async (todoToRemove) => {
  return new Promise(async (resolve, reject) => {
    console.log("Todo ID to Remove inside Remove Todo: ", todoToRemove);
    await httpDel(
      `todos/${todoToRemove}`,
      { id: todoToRemove },
      {
        success(response) {
          console.log("Todo Removed: ", response.data);
          resolve(response.data);
        },
        catch(response) {
          console.log("error removing Todo: ", response);
          reject(response);
        },
      }
    );
  });
};

// Remove or Delete a task from the server

const RemoveTask = (taskId) => {
  return new Promise(async (resolve, reject) => {
    console.log("Task to Remove: ", taskId);
    await httpDel(
      `tasks/${taskId}`,
      { id: taskId },
      {
        success(response) {
          console.log("Task Removed: ", response.data);
          resolve(response.data);
        },
        catch(response) {
          console.log("error removing Task: ", response);
          reject(response);
        },
      }
    );
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

let TaskToEdit = ref(null);

let TaskToDelete = ref(null);

export {
  Tasks,
  FetchTasksWithTodos,
  AddTask,
  UpdateTodoStatus,
  UpdateTodos,
  UpdateTask,
  UpdateTaskState,
  TaskToEdit,
  RemoveTask,
  RemoveTodos,
  TaskToDelete,
  ShowNotify,
};

// ----------------------------- Alternative Working API Request ---------------------------------

// let SetTasks = ref();
// let GetTasks = readonly(SetTasks);

// let Tasks = ref();

// const FetchTasks = async () => {
//   await axios.get("http://localhost:3000/tasks").then((response) => {
//     Tasks.value = response.data;
//     console.log(Tasks.value[0].taskTitle);
//     console.log(Tasks.value[0].todos);
//   });
// };

// const FetchTasksWithTodos = async () => {
//   await axios
//     .get("http://localhost:3000/tasks?_embed=todos")
//     .then((response) => {
//       Tasks.value = response.data;
//       console.log("Current Tasks Array Value: ", Tasks.value);
//     });
// };

// const FetchTask = async (taskId) => {
//   await axios
//     .get(`http://localhost:3000/tasks/${taskId}?_embed=todos`)
//     .then((response) => {
//       return response.data;
//     });
// };

// const FetchTodo = async (id) => {
//   await axios.get(`http://localhost:3000/todos/${id}`).then((response) => {
//     console.log(response.data);

//     return response.data;
//   });
// };

// const AddTask = async (task) => {
//   let taskToAdd = { taskTitle: task.taskTitle, dateCreated: task.dateCreated };
//   let todosToAdd = task.taskList;

//   await axios
//     .post("http://localhost:3000/tasks", taskToAdd)
//     .then(async (response) => {
//       taskToAdd.id = response.data.id;

//       await AddTodos(todosToAdd, taskToAdd.id);
//     });
// };

// const AddTodos = async (todos, taskId) => {
//   todos.forEach(async (todo) => {
//     todo.taskId = taskId;

//     await axios
//       .post("http://localhost:3000/todos", todo)
//       .then(async (response) => {
//         console.log("Todo Posted: ", response.data);
//       });
//   });
// };

// const UpdateTodo = async (todo) => {
//   console.log("triggered");
//   await axios
//     .patch(`http://localhost:3000/todos/${todo.id}`, {
//       isCompleted: todo.isCompleted,
//     })
//     .then((response) => {
//       console.log("Todo status updated: ", response.data);
//       if (todo.isCompleted) {
//         // ShowNotify(
//         //   "Successfully Completed Task!",
//         //   "To-do List has been Added to Done section successfully!"
//         // );
//       } else {
//         // ShowNotify(
//         //   "Successfully Added Task!",
//         //   "To-do List has been Added to In progress section successfully!"
//         // );
//       }
//     });
// };

// const ShowNotify = (message, caption) => {
//   let status = true;
//   const $q = useQuasar();
//   $q.notify({
//     position: $q.screen.width < 767 ? "top" : "bottom-right",
//     classes: `${
//       status ? "onboarding-success-notif" : "onboarding-error-notif"
//     } q-px-lg q-pt-none q-pb-none`,
//     html: true,
//     message: `<div class="text-bold">${message}</div>`,
//     caption: `${caption}`,
//   });
// };

// let TaskDelete = ref(null);

// export {
//   Tasks,
//   FetchTasks,
//   FetchTasksWithTodos,
//   FetchTodo,
//   UpdateTodo,
//   FetchTask,
//   AddTask,
//   AddTodos,
//   SetTasks,
//   GetTasks,
//   TaskDelete,
// };
