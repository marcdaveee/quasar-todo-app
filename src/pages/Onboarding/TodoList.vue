<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="2000"
  >
    <div class="todo-list">
      <!-- Place your elements here -->
      <div class="row justify-between items-center q-mb-lg">
        <div class="text-24 text-bold onboarding-text-secondary">
          To-Do-List
        </div>

        <q-btn
          dense
          flat
          no-caps
          label="Create a new task"
          class="onboarding-button onboarding-border-accent-0 text-white text-20 onboarding-bg-accent-0 q-px-xl"
          :to="{ name: 'create-task' }"
        />
      </div>

      <div class="flex justify-start q-mb-lg">
        <Filters
          dynamicHeight="16"
          :searchVisible="true"
          :filterDateVisible="false"
          :labelVisible="true"
          pathEndPoint="dashboard"
        />
      </div>

      <div v-for="(todo, index) in Todos" :key="todo.id" class="row">
        <!-- Task board for In-Process Task -->
        <TaskBoard
          status="In-Process"
          :taskTitle="todo.taskTitle"
          :todoList="inProcessTodos(todo.taskItems)"
          :dateCreated="todo.dateCreated"
          :taskId="todo.id"
          @delete-task="deleteTask"
          class="col q-mr-md"
        />

        <!-- Task board for Done Task -->
        <TaskBoard
          status="Done"
          :taskTitle="todo.taskTitle"
          :todoList="finishedTodos(todo.taskItems)"
          :dateCreated="todo.dateCreated"
          @delete-task="deleteTask(index)"
          class="col"
        />
      </div>

      <MainDialog :content="$options.components.DeleteConfirmation" />
    </div>
  </transition>
</template>

<script src="./scripts/TodoList.js"></script>

<style lang="scss" scope>
@import "./styles/TodoList.scss";
</style>
