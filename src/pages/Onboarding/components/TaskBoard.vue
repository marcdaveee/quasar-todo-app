<template>
  <!-- Wraps the task container board including the heading -->
  <div class="column justify-start items-start">
    <!-- Heading -->
    <div
      class="status-header onboarding-bg-accent-0 text-bold onboarding-text-light"
    >
      {{ title }}
    </div>

    <div class="task-board">
      <!-- Contents inside the board -->
      <div class="top-content row justify-between items-center">
        <div class="text-bold onboarding-text-secondary text-20">
          To-Do List
        </div>
        <div>
          <q-btn dense flat icon="more_horiz" />
          <q-btn dense flat icon="keyboard_arrow_down" />
        </div>
      </div>

      <div v-for="todo in todoList" :key="todo.id" class="row justify-between">
        <!-- <TaskItem/> -->
        <div>
          <q-checkbox
            v-model="todo.isCompleted"
            :label="todo.text"
            color="grey"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";
export default {
  name: "TaskBoard",
  components: {
    TaskItem,
  },
  props: ["title", "todoList", "date"],
};
</script>

<style>
.task-board {
  min-width: 600px;
  min-height: 447px;
  padding: 32px;
  border: 1px solid #ccc;
  border-radius: 0px 8px 8px 8px;
  background: #f5f5f5;
}

.status-header {
  padding: 10px 24px;
  border-radius: 16px 16px 0 0;
}
</style>
