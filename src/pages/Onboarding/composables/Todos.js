import { ref } from "vue";
let Todos = ref([]);

let TaskDelete = ref(null);

let Todoss =
  ref[
    {
      taskId: "someRandomId",
      taskTitle: "sample title",
      dateCreated: "02/27/2024",
      taskItems: [
        {
          taskItemId: "someId",
          taskDescription: "Read book",
          isCompleted: false,
        },
        {
          taskItemId: "someId",
          taskDescription: "Read book",
          isCompleted: false,
        },
      ],
    }
  ];

export { Todos, TaskDelete };
