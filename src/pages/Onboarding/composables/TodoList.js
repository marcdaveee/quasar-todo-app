import { httpGet, httpPost, httpPut, httpDel } from "../../../boot/axios";
import { ref, readonly } from "vue";
import axios from "axios";

let SetTasks = ref();
let GetTasks = readonly(SetTasks);

const FetchTasks = () => {
  axios.get("http://localhost:3000/tasks").then((response) => {
    Tasks.value = response.data;
  });
};

let Tasks = ref([]);

let TaskDelete = ref(null);

export { Tasks, FetchTasks, SetTasks, GetTasks, TaskDelete };
