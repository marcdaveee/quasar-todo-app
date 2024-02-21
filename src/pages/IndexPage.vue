<template>
  <q-page class="q-ma-xl">
    <q-form
      @submit="!selectedRow.id ? addTodo() : updateTodo()"
      class="q-ma-md"
    >
      <q-input v-model="form.title" label="Input Field" />
      <q-btn
        :loading="btnLoadingState"
        type="submit"
        :label="!selectedRow.id ? 'Submit' : 'Update'"
        color="primary"
      />
      <q-btn
        :loading="deleteBtnLoadingState"
        v-if="selectedRow.id"
        @click="deleteTodo()"
        class="q-ml-md"
        label="Delete"
        color="negative"
      />
    </q-form>
    <q-table
      title="Todos"
      :rows="rows"
      :columns="columns"
      row-key="name"
      @row-click="onRowClick"
    />
  </q-page>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    // Get todos from the json server
    let rows = ref([]);
    let columns = ref([
      {
        name: "title",
        label: "Title",
        align: "left",
        field: "title",
      },
      {
        name: "completed",
        label: "Completed",
        align: "left",
        field: "completed",
      },
    ]);

    const getTodos = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          rows.value = response.data;
        });
    };

    getTodos();

    // Post/Add a todo using Axios
    let form = ref({
      userId: 1,
      title: null,
      completed: false,
    });

    let btnLoadingState = ref(false);

    const addTodo = () => {
      btnLoadingState.value = true;
      axios
        .post("https://jsonplaceholder.typicode.com/todos", form.value)
        .then((response) => {
          if (response.status === 201) {
            console.log(response.data);
            rows.value.unshift(response.data);
            form.value.title = null;
          }
          btnLoadingState.value = false;
        });
    };

    // Tracks the state of the selected row
    // By default it is set to none
    let selectedRow = ref({});

    const onRowClick = (evt, row) => {
      selectedRow.value = row;
      form.value.title = row.title;
    };

    // Update a todo from the list using put method in axios
    const updateTodo = () => {
      btnLoadingState.value = true;
      axios
        .put(
          `https://jsonplaceholder.typicode.com/todos/${selectedRow.value.id}`,
          {
            title: form.value.title,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            let index = rows.value.findIndex(
              (row) => row.id === selectedRow.value.id
            );

            rows.value[index].title = response.data.title;
            form.value.title = null;
            selectedRow.value = {};
          }
          btnLoadingState.value = false;
        });
    };

    // Implementation of delete function
    let deleteBtnLoadingState = ref(false);

    const deleteTodo = () => {
      deleteBtnLoadingState.value = true;
      axios
        .delete(
          `https://jsonplaceholder.typicode.com/todos/${selectedRow.value.id}`
        )
        .then((response) => {
          if (response.status === 200) {
            rows.value = rows.value.filter(
              (row) => row.id !== selectedRow.value.id
            );
            form.value.title = null;
          }
          deleteBtnLoadingState.value = false;
        });
    };

    return {
      rows,
      columns,
      getTodos,
      form,
      btnLoadingState,
      addTodo,
      selectedRow,
      onRowClick,
      updateTodo,
      deleteBtnLoadingState,
      deleteTodo,
    };
  },
};
</script>
