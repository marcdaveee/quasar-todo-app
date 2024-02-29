import { httpGet, httpPost, httpPut, httpDel } from "../../../boot/axios";
import { ref, readonly } from "vue";
import axios from "axios";

let SetTasks = ref([]);
let GetTasks = readonly(SetTasks);

// const FetchTasks = () => {
//   return new Promise((resolve, reject) => {
//     httpGet("/tasks", {
//       success(response) {
//         response.data.status === "success" &&
//           (SetTasks.value = response.data.data);
//         resolve(response.data);
//       },
//       catch(response) {
//         reject(response);
//       },
//     });
//   });
// };

let Tasks = ref([]);

let TaskDelete = ref(null);

export { Tasks, SetTasks, GetTasks, TaskDelete };
