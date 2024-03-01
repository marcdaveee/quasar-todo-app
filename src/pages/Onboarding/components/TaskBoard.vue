<template>
  <!-- Wraps the task container board including the heading -->
  <div class="column justify-start items-start">
    <!-- Heading -->
    <div
      class="status-header onboarding-bg-accent-0 text-bold onboarding-text-light"
    >
      {{ status }}
    </div>

    <div class="task-board" :class="expanded ? 'expanded' : ''">
      <!-- Contents inside the board -->
      <div class="row justify-between items-center">
        <div class="text-bold onboarding-text-secondary text-20">
          {{ taskTitle }}
        </div>

        <div class="row items-center">
          <div v-if="expanded">
            <q-btn dense flat icon="more_horiz" v-show="status !== 'Done'">
              <q-menu fit anchor="bottom right" self="top right">
                <q-list style="min-width: 180px">
                  <q-item
                    clickable
                    class="action-menu"
                    :to="{ path: `create-task/${taskId}` }"
                  >
                    <q-item-section>Edit</q-item-section>
                  </q-item>

                  <q-item
                    clickable
                    class="action-menu"
                    @click="$emit('delete-task', taskId)"
                  >
                    <q-item-section>Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>

          <div v-else class="text-bold onboarding-text-secondary text-20">
            {{ dateCreated }}
          </div>

          <div class="q-ml-sm">
            <q-btn
              dense
              flat
              :icon="expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"
              @click="expanded = !expanded"
            />
          </div>
        </div>
      </div>

      <q-slide-transition>
        <div v-show="expanded">
          <q-card-section>
            <div
              v-for="todo in todoList"
              :key="todo.id"
              class="row justify-between"
            >
              <!-- <TaskItem/> -->
              <div class="row onboarding-text-secondary items-center fit">
                <div class="col-6 onboarding-text-primary">
                  <div class="row items-center q-mb-sm">
                    <input
                      :id="`todo-status-${todo.id}`"
                      class="onboarding-bg-accent-0"
                      type="checkbox"
                      name="todo-status"
                      v-model="todo.isCompleted"
                      @change="UpdateTodo(todo)"
                    />
                    <label :for="`todo-status-${todo.id}`">{{
                      todo.taskDesc
                    }}</label>
                  </div>
                  <!-- <label for="todo-status">
                    
                    {{ todo.taskDesc }}
                  </label> -->
                  <!-- <div v-show="false">
                    <input
                      id="todo-status"
                      class="onboarding-bg-accent-0"
                      type="checkbox"
                      name="todo-status"
                      v-model="todo.isCompleted"
                      @change="UpdateTodo(todo)"
                    />
                  </div>

                  <q-checkbox
                    v-model="todo.isCompleted"
                    :label="todo.taskDesc"
                    color="teal"
                  /> -->
                </div>

                <div class="onboarding-text-primary col-5 q-pl-lg">
                  {{ todo.time }}
                </div>
              </div>
            </div>
          </q-card-section>

          <div
            v-show="expanded"
            class="row justify-end bottom-content text-bold onboarding-text-secondary text-20"
          >
            {{ dateCreated }}
          </div>
        </div>
      </q-slide-transition>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";
import { ref } from "vue";
import {
  Tasks,
  FetchTasks,
  FetchTodo,
  UpdateTodo,
  FetchTasksWithTodos,
  SetTasks,
  GetTasks,
  TaskDelete,
} from "../composables/TodoList.js";

export default {
  name: "TaskBoard",
  components: {
    TaskItem,
  },
  props: ["status", "taskId", "taskTitle", "todoList", "dateCreated"],
  emits: ["delete-task"],

  setup() {
    let expanded = ref(false);

    const setTodoAsDone = async (todoId, index) => {
      await UpdateTodo(todoId, true, index);
      console.log("set todo as done triggered!");
      // await FetchTasksWithTodos();
      // Tasks.value = Tasks.value.map((task) => {
      //   if(tass)
      // } )
    };

    const setTodoAsInProgress = async (todoId, index) => {
      await UpdateTodo(todoId, false, index);
      console.log("set todo as in progress triggered!");
    };

    return {
      expanded,
      setTodoAsDone,
      UpdateTodo,
      setTodoAsInProgress,
    };
  },
};
</script>

<style>
.task-board {
  width: 100%;
  /* height: 100%; */
  min-height: 72px;
  padding: 32px;
  border: 1px solid #ccc;
  border-radius: 0px 8px 8px 8px;
  background: #f5f5f5;
  box-sizing: border-box;
  margin-bottom: 16px;
}

/* .task-board.expanded {
  min-height: 447px;
} */

.status-header {
  padding: 10px 24px;
  border-radius: 16px 16px 0 0;
}

.action-menu:hover {
  background: #249990;
  color: #fff;
}

input[type="checkbox"] {
  accent-color: #249990;
  margin-right: 5px;
  height: 16px;
  width: 16px;
}
</style>
